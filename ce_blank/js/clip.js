// need to add clipboard/clipboardWrite/clipboardRead to manifest
// https://developer.chrome.com/docs/extensions/reference/clipboard/
console.log('chrome.clipboard', chrome.clipboard);

// 不起作用？
chrome.clipboard.onClipboardDataChanged.addListener(() => {
  const success = document.execCommand('paste');
  console.log('document.execCommand result1: ', success);
});

// https://github.com/extend-chrome/clipboard/blob/master/src/index.ts
const readText = () => new Promise((resolve, reject) => {
  // Create hidden input to receive text
  const el = document.createElement('textarea')
  el.value = 'before paste'
  document.body.append(el)
  el.select()
  const success = document.execCommand('paste');
  console.log('document.execCommand result: ', success);
  const text = el.value
  el.remove()
  if (!success) reject(new Error('Unable to read from clipboard'))
  resolve(text)
});
const writeText = (text) => new Promise((resolve, reject) => {
  // Create hidden input with text
  const el = document.createElement('textarea')
  el.value = text
  document.body.append(el)
  // Select the text and copy to clipboard
  el.select()
  const success = document.execCommand('copy')
  el.remove()
  if (!success) reject(new Error('Unable to write to clipboard'))
  resolve(text)
});
const readTextC = async () => {
  let text = '';
  try {
    // DOMException: Document is not focused.
    text = await navigator.clipboard.readText();
  } catch (error) {
    console.log('err', error);
    text = await readText();
  }
  return text;
};

const setNewText = async () => {
  const clipText = await readTextC();
  // const clipText = await readText();
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
    height: 300,
    width: 500,
    position: { my: 'center center', at: 'right-10% top-2%' },
  });
});
