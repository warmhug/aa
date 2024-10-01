// from https://github.com/usernamehw/vscode-commands/blob/master/src/utils/vscodeUtils.ts

import { commands, env, Range, Selection, TextEditorRevealType, UIKind, Uri, window, workspace, StatusBarAlignment,
	type DocumentSymbol, type TextDocument, type TextEditor } from 'vscode';

export const sleep = async (ms: number): Promise<void> => new Promise(resolve => {
	setTimeout(resolve, ms);
});

export const getConfig = (name = '', scope?) => {
  const workspaceConfiguration = workspace.getConfiguration('warmhug', scope);
  const config = workspaceConfiguration.get(name);
  // console.log(`config ${name}: `, config);
  // window.showInformationMessage(`config ${name}: ${JSON.stringify(config)}`);
	// createOutputChannel({
	// 	content: `config ${name}: ` + JSON.stringify(config, null, 2),
	// 	open: true,
	// });
  return config;
};

interface tableItem {
	header?: string;
	content?: string;
}
// Render a human readable table
export function renderTable(title = '', items: tableItem[] = []) {
  var TABLE_WIDTH = 64;
  var HEADER_WIDTH = 16;
  var CONTENT_WIDTH = 48;
  var CORNER_CHAR = '+';
  var SEPARATOR_CHAR = '|';
  var DIVIDER_CHAR = '-';
  var DIVIDER = '';
  for (var i = 0; i < TABLE_WIDTH - 2; i++) {
    DIVIDER += DIVIDER_CHAR;
  }
  var VERTICAL_BORDER = CORNER_CHAR + DIVIDER + CORNER_CHAR;
  var SEPARATOR = SEPARATOR_CHAR + DIVIDER + SEPARATOR_CHAR;
  // Get column formatted
  const formatColumn = (text, maxChars, first?) => {
    var output = ((first) ? '| ' : ' ') + text;
    for (var i = output.length; i < maxChars - 1; i++) { output += ' '; }
    output += '|';
    return output;
  };

  let res = `${title}\n${VERTICAL_BORDER}`;
  for (var i = 0, length = items.length; i < length; i++) {
    var header = formatColumn(items[i].header, HEADER_WIDTH, true);
    var content = formatColumn(items[i].content, CONTENT_WIDTH);
    res += header + content;
    if (i < length - 1) {
      res += SEPARATOR;
    }
  }
  res += VERTICAL_BORDER;
	return res;
}
const table = renderTable('标题', [
	{ header: 'Size', content: 'info.prettySize' },
	{ header: 'Gzipped', content: 'info.gzipSize' },
]);
console.log('table',  table);

/*
vscode 插件开发、写一个 createOutputChannel 的工具函数，传入一个对象
{name: '标题', content: '内容', open: true, append: false }
显示输入的标题和内容，并设置open状态，如果 append 为 true 则不删除已有的内容。
*/
interface OutputChannelOptions {
	name?: string;
	content?: string;
	open?: boolean;
	append?: boolean;
}
let outputChannel, defaultChannelName = 'ext-hlv';
export function createOutputChannel(options?: OutputChannelOptions) {
	const { name, content, open, append = true } = options || {};
	if (!outputChannel || outputChannel.name !== defaultChannelName) {
		outputChannel = window.createOutputChannel(name || defaultChannelName);
	}
	if (!append) {
		outputChannel.clear();
	}
	outputChannel.append(content + '\n\n');
	if (open) {
		outputChannel.show();
	}
	return outputChannel;
}
// createOutputChannel({
// 	name: 'My Output Channel',
// 	content: 'Hello, VS Code!',
// 	open: true,
// 	append: false
// });

export function createStatusBarItem(options) {
	const { command = '', text = '', ...rest } = options;
	const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 1);
  statusBarItem.command = command;
  statusBarItem.text = text;
	Object.keys(rest).forEach(key => {
		statusBarItem[key] = rest[key];
	});
	return statusBarItem;
}
// createStatusBarItem({
// 	command: 'warmhug.demo',
// 	text: 'warmhug.demo',
// 	color: 'red',
// });

/**
 * Return all registered vscode commands (excluding internal).
 */
export async function getAllVscodeCommands(): Promise<string[]> {
	return commands.getCommands(true);
}
/**
 * Open vscode Settings GUI with input value set to the specified value.
 */
export async function openSettingGuiAt(settingName: string): Promise<void> {
	await commands.executeCommand('workbench.action.openSettings', settingName);
}
/**
 * Open vscode Keybindings GUI with input value set to the specified value.
 */
export async function openKeybindingsGuiAt(value: string): Promise<void> {
	await commands.executeCommand('workbench.action.openGlobalKeybindings', value);
}
/**
 * Open global or workspace settings.json file in the editor.
 */
export async function openSettingsJson(target: 'global' | 'workspace'): Promise<void> {
	await commands.executeCommand(target === 'global' ? 'workbench.action.openApplicationSettingsJson' : 'workbench.action.openWorkspaceSettingsFile');
}
/**
 * Get all symbols for active document.
 */
async function getSymbols(document: TextDocument): Promise<DocumentSymbol[]> {
	let symbols = await commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', document.uri);
	if (!symbols || symbols.length === 0) {
		await sleep(500);
		symbols = await commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', document.uri);
	}
	if (!symbols || symbols.length === 0) {
		await sleep(1000);
		symbols = await commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', document.uri);
	}
	if (!symbols || symbols.length === 0) {
		await sleep(2000);
		symbols = await commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', document.uri);
	}
	return symbols || [];
}
/**
 * Reveal symbol in editor.
 *
 * - Briefly highlight the entire line
 * - Move cursor to the symbol position
 */
export async function goToSymbol(editor: TextEditor | undefined, symbolName: string): Promise<void> {
	if (!editor) {
		window.showErrorMessage('No TextEditor provided.');
		return;
	}
	const symbols = await getSymbols(editor.document);

	let foundSymbol: DocumentSymbol | undefined;
	forEachSymbol(symbol => {
		if (symbol.name === symbolName) {
			foundSymbol = symbol;
		}
	}, symbols);

	if (foundSymbol) {
		// eslint-disable-next-line no-param-reassign
		editor.selection = new Selection(foundSymbol.range.start, foundSymbol.range.start);
		editor.revealRange(foundSymbol.range, TextEditorRevealType.AtTop);
		// Highlight for a short time revealed range
		const range = new Range(foundSymbol.range.start.line, 0, foundSymbol.range.start.line, 0);
		const lineHighlightDecorationType = window.createTextEditorDecorationType({
			backgroundColor: '#ffb12938',
			isWholeLine: true,
		});
		editor.setDecorations(lineHighlightDecorationType, [range]);
		setTimeout(() => {
			editor.setDecorations(lineHighlightDecorationType, []);
		}, 700);
	}
}
/**
 * Recursively walk through document symbols.
 */
function forEachSymbol(f: (symbol: DocumentSymbol)=> void, symbols: DocumentSymbol[]): void {
	for (const symbol of symbols) {
		f(symbol);
		if (symbol.children.length) {
			forEachSymbol(f, symbol.children);
		}
	}
}
export async function readFileVscode(pathOrUri: Uri | string): Promise<string> {
	try {
		const uri = typeof pathOrUri === 'string' ? Uri.file(pathOrUri) : pathOrUri;
		const file = await workspace.fs.readFile(uri);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		return new TextDecoder().decode(file);
	} catch (e) {
		window.showErrorMessage((e as Error).message);
		return '';
	}
}
export async function writeFileVscode(pathOrUri: Uri | string, content: string): Promise<void> {
	try {
		const uri = typeof pathOrUri === 'string' ? Uri.file(pathOrUri) : pathOrUri;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		const encodedContent: Uint8Array = new TextEncoder().encode(content);
		await workspace.fs.writeFile(uri, encodedContent);
	} catch (e) {
		window.showErrorMessage((e as Error).message);
	}
}
/**
 * Return `true` when on the web.
 */
export function isOnWeb(): boolean {
	return env.uiKind === UIKind.Web;
}

export function showErrorNotification(e: unknown): void {
	window.showErrorMessage((e as Error).message);
}

export function showNotOnWebNotification(text: string): void {
	window.showWarningMessage(`Not on the web, you don't. "${text}"`);
}
/**
 * Create [Command URI](https://code.visualstudio.com/api/extension-guides/command#command-uris)
 */
export function createCommandUri(commandId: string, args?: unknown): Uri {
	const commandArg = args ? `?${encodeURIComponent(JSON.stringify(args))}` : '';
	return Uri.parse(`command:${commandId}${commandArg}`);
}
export function getSelectedLineNumbers(editor: TextEditor): number[] {
	const lineNumbers = new Set<number>();
	for (const selection of editor.selections) {
		for (let i = selection.start.line; i <= selection.end.line; i++) {
			lineNumbers.add(i);
		}
	}
	return Array.from(lineNumbers);
}
