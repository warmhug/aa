
// 设置 ua 为 iPhone ua
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  if (details.parentFrameId > -1) {
    for (var i = 0, l = headers.length; i < l; ++i) {
      if (headers[i].name == 'User-Agent') {
        headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
      }
    }
  }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);

// remove the X-Frame-Options header to allow inlining pages within an iframe.
chrome.webRequest.onHeadersReceived.addListener(function(info) {
    var headers = info.responseHeaders;
    for (var i=headers.length-1; i>=0; --i) {
      var header = headers[i].name.toLowerCase();
      // console.log(headers, 'xxxx');
      if (header == 'x-frame-options' || header == 'frame-options' || header.indexOf('content-security-policy') > -1) {
        headers.splice(i, 1); // Remove header
      }
    }
    return {responseHeaders: headers};
  },
  {
    urls: [ '*://*/*' ], // Pattern to match all http(s) pages
    types: [ 'sub_frame' ]
  },
  ['blocking', 'responseHeaders']
);


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
