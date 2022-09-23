console.log('bg page', chrome);
// console.log('bg page init no window', window?.document?.title);

// 点击扩展图标 触发以下事件
chrome.action.onClicked.addListener(async (tab) => {
  // 在当前 tab 右边打开新 tab
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  chrome.tabs.create({ index: curTab.index + 1 });
  console.log('aaat', tab, curTab);

  const frames = await chrome.webNavigation.getAllFrames({ tabId: tab.id });
  const injectionResults = await chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
      // allFrames: true,
      frameIds: frames.filter(frame => frame.url !== 'about:blank').map(item => item.frameId)
    },
    func: () => {
      // document.body.style.backgroundColor = 'red !important';
      // document.body.style.margin = '20px';
      // document.body.style.setProperty("background-color", "red", "important");
      // window.open('chrome://newtab');  // not work
    }
  });
  console.log('injectionResults', injectionResults);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log('onUpdated', tabId, changeInfo, tab);
});
