
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
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('onUpdated', tabId, changeInfo, tab);
});
// chrome.tabs.create({ "url": "http://google.com" });


chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('onchange Value currently is ', changes, namespace);
});
chrome.runtime.onMessage.addListener(function(e, t, s) {
  console.log('onMessage Value currently is ', e, t, s);
});


// programmatically injected content_scripts
// 注意：先注册到相应域 后让页面加载 才会执行先注册的 js
const rcs = await chrome.scripting.getRegisteredContentScripts();
const id = '1';
if (!rcs.find(item => item.id === id)) {
  await chrome.scripting.registerContentScripts([{
    id,
    allFrames: true,
    // content_scripts 虽然设置了 match_about_blank 和 match_origin_as_fallback
    // 但不能在 data:text/html,<html>Hello, World!</html> 这里起作用
    matchOriginAsFallback: true,
    // matches: ["<all_urls>"],
    // matches: ['http://localhost/*'],
    runAt: 'document_start',
    // world: 'MAIN', // 默认是 ISOLATED 改变设置会影响 chrome.runtime.sendMessage
    js: ['constants.js', 'inject.js'],
  }]);
  // console.log('register success');
}

// content_scripts 是独立环境执行，在注入的 inject.js 里修改页面本来的 window 对象无效
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
// https://stackoverflow.com/questions/9515704
// https://stackoverflow.com/questions/12395722
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// window 对象的 parent top 属性都是 只读 的。如 window.top = window; 修改无效
// Object.defineProperty(window, 'top', {
//   get () {
//     return 100;
//   }
// });

// 插件内的 html 文件里不能注入 content_scripts
