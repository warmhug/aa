console.log('bg page', chrome);
// console.log('bg page init no window', window?.document?.title);

function injectedFunction() {
  // document.body.style.backgroundColor = 'red !important';
  // document.body.style.margin = '20px';
  // document.body.style.setProperty("background-color", "red", "important");
  // window.open('chrome://newtab');  // not work
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  // console.log('tabinfo', tab);
  return tab;
}

// 点击扩展图标 触发以下事件
chrome.action.onClicked.addListener(async (tab) => {
  // console.log('aaat', tab?.title);

  // 在当前 tab 右边打开新 tab
  const { index } = await getCurrentTab();
  chrome.tabs.create({ index: index + 1 });

  const injectionResults = await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true,},
    func: injectedFunction
  });
  console.log('injectionResults', injectionResults);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log('onUpdated', tabId, changeInfo, tab);
});
