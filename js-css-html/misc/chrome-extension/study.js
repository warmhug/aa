
// 学习 error 提示写法：
// Error: Invocation of form tabs.executeScript(string, function) doesn't match definition
// tabs.executeScript(optional integer tabId, object details, optional function callback)

console.log(chrome.extension.getURL('/data.json'));
console.log(chrome.runtime.getManifest())
chrome.runtime.getBackgroundPage(function (params) {
  console.log(params)
})
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  alert(tab.url)
});

chrome.history.onVisited.addListener(function (params) {
  alert(params)
})

chrome.tabs.getCurrent(function (params) {
  console.log(params)
})
chrome.tabs.getAllInWindow(function (params) {
  console.log(params)
})
截图
chrome.tabs.captureVisibleTab(function (params) {
  // console.log(params)
})

chrome.tabs.onCreated.addListener(function (tab) {
  // alert(tab.url)
})
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tabId, changeInfo, tab)
  // alert(tab.url)
})

chrome.tabs.create({ "url": "http://google.com" });
chrome.tabs.onCreated.addListener(function (tab) { 
  console.log(tab)
})
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tab)
})
chrome.tabs.onActivated.addListener(function (tab) { alert('act'); console.log(tab, 'onActivated') })
chrome.tabs.onHighlighted.addListener(function (tab) {  alert('hig'); console.log(tab, 'onHighlighted') })
// 不能在扩展页面本身执行 script
// ref: https://bugs.chromium.org/p/chromium/issues/detail?id=30756&can=2&start=0&num=100&q=&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified&groupby=&sort=
chrome.tabs.executeScript({ code: 'alert(2)', allFrames: true }, function (params) {
  console.log(params)
})

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)
    // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
  }
);

// in background
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('cccc',request)
    switch ( request.action) {
      case 'newTab': {
        console.log('cccc')
         //note: passing an empty object opens a new blank tab, 
         //but an object must be passed
        //  chrome.tabs.create({/*options*/}); 
         // run callback / send response
       } break;
    }
    return true; //required if you want your callback to run, IIRC
  });

// in content script:
chrome.extension.sendMessage({action: "newTab"}, function(response) {
  console.log(response)
});
