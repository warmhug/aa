// need to add clipboard/clipboardWrite/clipboardRead to manifest
// https://developer.chrome.com/docs/extensions/reference/clipboard/
console.log('chrome.clipboard', chrome.clipboard);

// 不起作用？
chrome.clipboard.onClipboardDataChanged.addListener(() => {
  const success = document.execCommand('paste');
  console.log('document.execCommand result1: ', success);
});

// 注册和使用快捷键 https://developer.chrome.com/docs/extensions/reference/commands
// chrome://extensions/shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`, window, location.href);
  if (command !== 'addNote') {
    return;
  }
  window.focus();
  // chrome.action.openPopup();
  chrome.action.setBadgeText({ text: 'cmd' });
  setTimeout(() => {
    chrome.action.setBadgeText({ text: '' });
  }, 2000);
  const clipText = await hl_extension_util.readClipboardText();
  const localData = await chrome.storage.local.get();
  const newText = (localData.hl_clipTxt || '') + '\n' + clipText;
  // console.log('clip and new', clipText, newText);
  await chrome.storage.local.set({ hl_clipTxt: newText });
  $('#clipTxt').val(newText);
});

$(() => {
  $('#clipTxt').on('change', async (e) => {
    await chrome.storage.local.set({ hl_clipTxt: e.target.value });
  });

  const manifest = chrome.runtime.getManifest()
  // console.log('getManifest', chrome.runtime.getManifest());
  $("#clipCmd").html('按 ' + manifest.commands.addNote.suggested_key + ' 粘贴剪贴板内容');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('msg bg aa', request, sender, location.href);
    if (request._bg && request.openModal) {
      $("#translateModal").modal('show');
    }
    if (request._bg && request.newTranslateUrl) {
      // 来自 Google translate 消息
      setHtml(request.newTranslateUrl)
    }
    return true;
  });

  const setHtml = url => {
    $('#translateModal').find('iframe').attr('src', url);
    $('#translateModal').find('a').attr('href', url).html(url);
  };
  setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');

  $('body').dblclick(() => {
    $("#translateModal").modal('toggle');
  });

});
