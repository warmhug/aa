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

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    console.log("This is a first install!");
  } else if(details.reason == "update"){
    var thisVersion = chrome.runtime.getManifest().version;
    console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
  }
  // servicework 里打开 option.html https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update
  chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
});

function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// 参考 https://blog.shahednasser.com/register-a-keyword-in-chrome-omnibox-in-your-extension/
// omnibox 相关操作  https://developer.chrome.com/docs/extensions/reference/omnibox/
// 翻译 https://blog.csdn.net/u012419303/article/details/106263338
chrome.omnibox.setDefaultSuggestion({
  description: '输入中文翻译为英语'
});
const changeDelay = debounce((text, suggest) => {
  if (text.length <= 1) {
    suggest([]);
    return;
  }
  fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=zh-CN&tl=en&q=' + text)
    .then((response) => response.json())
    .then((data) => {
      // console.log('ddd', data);
      const resAry = data?.[0]?.[0];
      if (resAry?.length) {
        suggest([{
          content: JSON.stringify({ cn: resAry?.[1], en: resAry?.[0] }),
          deletable: true,
          description: `<dim>中文 ${resAry?.[1]} 英文</dim> <match>${resAry?.[0]}</match> <url>chrome://newtab</url>`
        }]);
      }
    });
}, 500);
chrome.omnibox.onInputChanged.addListener(changeDelay);
chrome.omnibox.onInputEntered.addListener(async (text, OnInputEnteredDisposition) => {
  // console.log('enter', text, OnInputEnteredDisposition, location.href);
  const cn = text ? JSON.parse(text)?.cn : null;
  if (!cn) {
    return;
  }
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  // 在 background.js 用 chrome.runtime.sendMessage 发消息、其他地方收不到！！
  chrome.tabs.sendMessage(curTab.id, {
    _bg: true,
    _url: 'https://translate.google',
    newUrl: `https://translate.google.com/?sl=zh-CN&tl=en&text=${cn}&op=translate`,
  });
});
