
// 背景 js，不能与 dom 交互 ？

alert('bg.js document?.title  ', document?.title);
console.log('bg.js 有 browserAction', chrome, chrome.browserAction);

// 点击扩展图标 触发以下事件
chrome.browserAction.onClicked.addListener((tab) => {
  alert(document.title);
});
