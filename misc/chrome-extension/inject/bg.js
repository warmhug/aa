
// 背景 js，不能与 dom 交互 ？ 初始化只运行在 chrome://extensions/ 页面
// webNavigation 只能用于背景 js 里 ？

var myObj = {
  need_remove_ad_urls: [
    'http://www.qiushibaike.com/'
  ]
}
function getHost(url) {
  var a = document.createElement('a')
  a.href = url;
  return a.hostname
}

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  // 去广告
  myObj.need_remove_ad_ifr.contentWindow.postMessage(JSON.stringify({data: 'rm_ad'}),'*');
}, {
  // url: [{ hostContains: 'ztm.waw.pl' }]
    url: myObj.need_remove_ad_urls.map(function (i) {
      return { hostContains: getHost(i) }
    })
});

chrome.webRequest.onBeforeRequest.addListener(function (details) { 
  console.log(details)
  if (details.url === "https://img.alicdn.com/tps/TB17ghmIFXXXXXAXFXXXXXXXXXX.png") {
    alert('block');
    return { cancel: true };
  }
  return { cancel: false };
}, {urls: ["<all_urls>"]}, ["blocking"]);
