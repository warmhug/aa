// chrome extension clip only work in dev.
// https://developer.chrome.com/docs/extensions/reference/clipboard/
console.log('chrome.clipboard', chrome.clipboard);

const setNewText = async () => {
  const clipText = await navigator.clipboard.readText();
  // const clipText = 'sseee';
  const localData = await chrome.storage.local.get();
  const newText = (localData.hl_clipTxt || '') + '\n' + clipText;
  // console.log('clip and new', clipText, newText);
  await chrome.storage.local.set({ hl_clipTxt: newText });
  $('#clipTxt').val(newText).on('change', async (e) => {
    await chrome.storage.local.set({ hl_clipTxt: e.target.value });
  });
};

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
  await setNewText();
  $("#clipDialog").dialog('open');
});

$(() => {
  $("#clipDialog").dialog({
    autoOpen: false,
    position: { my: 'right top-25%' },
  });
});
