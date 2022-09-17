
// https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#sunset-deprecated-apis

console.log('getManifest', chrome.runtime.getManifest());

// webRequest 生命周期监听

chrome.webRequest.onBeforeRequest.addListener(function (details) { 
  console.log('onBeforeRequest', details)
  return { cancel: false };
}, {urls: ["<all_urls>"]});

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  console.log('onBeforeSendHeaders', details);
  // v3 不能再修改 header 因为不能设置 blocking
  // 设置 iPhone UA
  // if (headers[i].name == 'User-Agent') {
  //   headers[i].value = 'iPhone ua';
  // }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders']);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  // remove the X-Frame-Options header to allow inlining pages within an iframe.
  // var header = headers[i].name.toLowerCase();
  // if (header == 'x-frame-options' || 'frame-options' || 'content-security-policy') {
  //   headers.splice(i, 1); // Remove header
  // }
  console.log('onHeadersReceived', details)
  return {responseHeaders: headers};
},
{ urls: ['*://*/*'], types: ['sub_frame'] }, ['responseHeaders']);

chrome.webRequest.onCompleted.addListener(details => {
  console.log('ttt', details);
}, {urls: ["<all_urls>"]})

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  // 去广告
  console.log('onDOMContentLoaded', details)
}, { url: [{ hostContains: 'google.com' }] });

chrome.webNavigation.onCompleted.addListener(details => {
  // console.log('ttt', details);
});

chrome.tabs.captureVisibleTab(function (params) {
  // 截图
  // console.log(params)
});

// chrome.tabs.create({ "url": "http://google.com" });
