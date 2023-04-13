console.log('this is injected to all pages (ISOLATED window object)', window, chrome);

// for test
window.hl_extension_util = hl_extension_util;

const hl_asyncSendMessage = (req) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(req, (response) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

// content_scripts 和插入进 iframe 里边的 inject-sub.js 内容通信
const hl_handleMsg = async (event) => {
  // 注意 这里可能会多次收到不同来源的消息
  // console.log('message from other', event);
  let parsedData;
  try {
    parsedData = JSON.parse(event.data);
  } catch {
    parsedData = {};
  }
  if (parsedData._ext) {
    await hl_asyncSendMessage(parsedData);
  }
};
window.addEventListener("message", hl_handleMsg);
setTimeout(() => {
  // 初始化完成，不再处理 message 消息、避免对原有页面的性能影响。需要配合 option.js 里的内容
  window.removeEventListener("message", hl_handleMsg);
}, 8000);

// 处理来自 background.js 里的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log('msg bg', request, sender, location.href);
  if (request._bg && location.href.indexOf(request._url) === 0) {
    // 来自 Google translate 消息
    if (request.newTranslateUrl) {
      location.href = request.newTranslateUrl;
    }
    // 来自其他标记
    if (request.clipChanged) {
      console.log('clipChanged', requet);
    }
  }
  return true;
});

;(async function () {
  const { hl_injectSites } = await hl_extension_util.getStorage();
  const injectSites = JSON.parse(hl_injectSites) || {};
  const dUrl = decodeURIComponent(location.href);
  const equalUrl = (ua, ub) => {
    // 判断 ua 是否是 ub 的子集
    const uaObj = new URL(ua);
    const ubObj = new URL(ub);
    let isInclude = true;
    uaObj.searchParams.forEach((val, key) => {
      // console.log('vk', val, key);
      if (ubObj.searchParams.get(key) !== val) {
        isInclude = false;
      }
    });
    if (uaObj.origin === ubObj.origin && isInclude) {
      return true;
    }
    return false;
  }
  const getUrl = () => {
    const urls = Object.keys(injectSites);
    // 优先匹配完全一样的 (todo: 如果既有完全一样、又有部分匹配 多种规则，应该合并起来)
    if (urls.includes(dUrl)) return dUrl;
    // 再进行部分匹配
    return urls.find(url => {
      if (dUrl.indexOf(url) === 0) {
        return true;
      }
      // 比如 Google translate 默认 url 是 https://translate.google.com/?sl=zh-CN&tl=en&op=translate
      // 搜索时 url 是 https://translate.google.com/?sl=zh-CN&tl=en&text=as&op=translate
      // 前者是后者的子集
      return equalUrl(url, dUrl);
    });
  };

  // console.log('getUrl()', getUrl(), location.href);
  if (getUrl()) {
    // window.addEventListener('load', mainFn);
    window.addEventListener('load', () => {
      requestIdleCallback(myNonEssentialWork, { timeout: 5000 });
      function myNonEssentialWork (deadline) {
        // console.log('执行任务 1', deadline.timeRemaining(), location.href);
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout)) {
          // console.log('执行任务 while', deadline.timeRemaining());
        }
        mainFn(injectSites[getUrl()]);
      }
    });
  }

  function mainFn(urlProps) {
    console.log('执行任务 2', location.href, document.scrollingElement.scrollHeight);
    // 使用 hl_extension_data?.tabId 判断只是在 blankPage 里
    if (!window.hl_extension_data?.tabId && !urlProps.allPage) {
      return;
    }
    hl_extension_util.insertCss(urlProps.css);
    hl_extension_util.injectPageScript({
      js: urlProps.js,
      hl_extension_data: window.hl_extension_data?.tabId,
    });
  }

})();
