// https://developer.chrome.com/docs/extensions/mv3/service_workers/
console.log('bg page, 注意其执行时机', chrome);
// console.log('bg page init no window', window?.document?.title);

// 点击扩展图标 触发以下事件
chrome.action.onClicked.addListener(async (tab) => {
  // 在当前 tab 右边打开新 tab
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  chrome.tabs.create({ index: curTab.index + 1 });
  // console.log('aaat', tab, curTab);
});
