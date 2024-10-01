// /* eslint-disable */
// from 包名 filesize
// https://github.com/mkxml/vscode-filesize/blob/master/view.js
// https://github.com/mkxml/vscode-filesize/blob/master/extension.js
// https://github.com/mkxml/vscode-filesize/blob/master/package.json

import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import fzCalculator from 'filesize-calculator';
import { getConfig, renderTable, createStatusBarItem, createOutputChannel } from "./utils";

let info, isShowingDetailedInfo = false, showGzipInStatusBar = false;
const fzConfig = {
  useDecimal: false,
  use24HourFormat: true,
  showBrotli: true,
};

function updateOc(oc, isShow) {
  if (info && info.prettySize) {
    info = fzCalculator.addGzipSize(info, fzConfig);
    info = fzCalculator.addBrotliSize(info, fzConfig);
    info = fzCalculator.addMimeTypeInfo(info);
    info = fzCalculator.addPrettyDateInfo(info, fzConfig);
    const table: any = [
      { header: 'Size', content: info.prettySize },
      { header: 'Gzipped', content: info.gzipSize },
      { header: 'Brotli', content: info.brotliSize },
      { header: 'Mime type', content: info.mimeType },
      { header: 'Created', content: info.prettyDateCreated },
      { header: 'Changed', content: info.prettyDateChanged },
    ];
    const data = renderTable(info.absolutePath, table);
    oc.append(data);
  } else {
    oc.appendLine('No file information available for this context!');
  }
  if (isShow) {
    oc.show();
  }
}
function updateStatusBar(statusbar) {
  var currentEditor = window.activeTextEditor?.document;
  console.log('uri.scheme: ', currentEditor?.uri.scheme);
  if (currentEditor && currentEditor.uri.scheme === 'file') {
    const newInfo = fzCalculator.loadFileInfoSync(currentEditor.fileName);
    info = fzCalculator.addPrettySize(newInfo, fzConfig);
    if (info && info.prettySize) {
      statusbar.text = info.prettySize;
      if (showGzipInStatusBar) {
        statusbar.text = `Raw: ${info.prettySize}`;
        info = fzCalculator.addGzipSize(info, fzConfig);
        statusbar.text += ` | Gzip: ${info.gzipSize}`;
      }
      statusbar.show();
    }
  } else {
    statusbar.text = '';
    statusbar.hide();
  }
}

export function activate(context: ExtensionContext) {
  console.log('filesize is active');

  const command = 'warmhug.toggleFilesizeInfo';
  const bar = createStatusBarItem({
    command,
    tooltip: 'Current file size - Click to toggle more info',
  });

  const oc = createOutputChannel();

  const updateBar = () => updateStatusBar(bar);
  function updateConfig() {
    showGzipInStatusBar = getConfig('showGzipFilesizeInStatusBar') as boolean;
    updateBar();
  }
  updateConfig();

  context.subscriptions.push(workspace.onDidSaveTextDocument(updateBar));
  context.subscriptions.push(window.onDidChangeActiveTextEditor(updateBar));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateConfig));
  context.subscriptions.push(commands.registerCommand(command, () => {
    isShowingDetailedInfo = !isShowingDetailedInfo;
    updateOc(oc, isShowingDetailedInfo);
  }));

}

export function deactivate() {}
