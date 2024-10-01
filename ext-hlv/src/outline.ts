import * as vscode from 'vscode';
import { languages } from 'vscode';
import type { ExtensionContext } from 'vscode';

// 参考 https://stackoverflow.com/a/59132169/2190503
// 给 txt 文档以 === 开头的文字，设置 outline
class MyConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  public provideDocumentSymbols(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[]> {
    return new Promise((resolve, reject) => {
      let symbols: vscode.DocumentSymbol[] = [];
      for (var i = 0; i < document.lineCount; i++) {
        var line = document.lineAt(i);
        if (line.text.startsWith("===")) {
          // vscode.window.showInformationMessage(`line.text: ${line.text}`);
          let symbol = new vscode.DocumentSymbol(
            line.text.replaceAll('=', ''),
            '',
            vscode.SymbolKind.Module,
            line.range,
            line.range
          );
          symbols.push(symbol);
        }
      }
      resolve(symbols);
    });
  }
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(languages.registerDocumentSymbolProvider(
    { scheme: "file", language: "plaintext"},
    new MyConfigDocumentSymbolProvider())
  );
}

export function deactivate() {}
