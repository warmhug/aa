
$('#clipTxt').on('change', async (e) => {
  await chrome.storage.local.set({ hl_clipTxt: e.target.value });
});

const manifest = chrome.runtime.getManifest()
// console.log('getManifest', chrome.runtime.getManifest());
$("#clipCmd").html('按 ' + manifest.commands.addNote.suggested_key + ' 粘贴剪贴板内容');

const setHtml = url => {
  const iframeWrap = $('#translateModal').find('.iframe-wrap.google');
  iframeWrap.find('iframe').attr('src', url);
  iframeWrap.find('a').attr('href', url).html(url);
};
setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');

$('body').dblclick(() => {
  $("#translateModal").modal('toggle');
});
$('#translateModal').on('hidden.bs.modal', function (e) {
  setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');
});

const showModal = (request, sender, sendResponse) => {
  // console.log('msg bg aa', request, sender, location.href);
  if (request._bg && request.openModal) {
    $("#translateModal").modal('show');
  }
  if (request._bg && request.newTranslateUrl) {
    // 来自 Google translate 消息
    setHtml(request.newTranslateUrl);
  }
  return true;
}
chrome.runtime.onMessage.addListener(showModal);

// 注册和使用快捷键 https://developer.chrome.com/docs/extensions/reference/commands
// chrome://extensions/shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  // console.log(`Command "${command}" triggered`, window, location.href);
  const clipText = await hl_extension_util.readClipboardText();
  if (command === 'openGoogTl') {
    const newTranslateUrl = `https://translate.google.com/?sl=zh-CN&tl=en&text=${clipText}&op=translate`
    // chrome.tabs.create({ url: '' });
    // 'chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/blank.html' can't be query.
    const queryTab = await chrome.tabs.query({ url: 'chrome://newtab/' });
    // console.log('curTab', queryTab);
    await chrome.tabs.highlight({tabs: queryTab[0].index});
    setTimeout(() => {
      showModal({
        _bg: true,
        openModal: 1,
        newTranslateUrl
      });
    }, 500);
  }
  if (command === 'addNote') {
    window.focus();
    // chrome.action.openPopup();
    chrome.action.setBadgeText({ text: 'cmd' });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' });
    }, 2000);
    const localData = await chrome.storage.local.get();
    const newText = (localData.hl_clipTxt || '') + '\n' + clipText;
    // console.log('clip and new', clipText, newText);
    await chrome.storage.local.set({ hl_clipTxt: newText });
    $('#clipTxt').val(newText);
  }
});
