console.log('this is injected to all pages (ISOLATED window object)', window, chrome);

// for test
window.hl_extension_util = hl_extension_util;

const asyncSendMessage = (req) => {
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

// content_scripts 和插入进 iframe 里边的 inject-sub.js 通信
window.addEventListener("message", async (event) => {
  // 注意 这里可能会多次收到不同来源的消息
  console.log('message from iframe', event);
  let parsedData;
  try {
    parsedData = JSON.parse(event.data);
  } catch {
    parsedData = {};
  }
  if (parsedData._ext) {
    await asyncSendMessage(parsedData);
  }
});

;(async function () {
  const { hl_injectSites } = await hl_extension_util.getStorage();
  const injectSites = JSON.parse(hl_injectSites) || {};
  const dUrl = decodeURIComponent(location.href);
  const checkUrl = () => {
    const urls = Object.keys(injectSites);
    if (urls.includes(dUrl)) return dUrl;
    return urls.find(url => dUrl.indexOf(url) === 0);
  };

  if (checkUrl()) {
    // window.addEventListener('load', mainFn);
    window.addEventListener('load', () => {
      requestIdleCallback(myNonEssentialWork, { timeout: 5000 });
      function myNonEssentialWork (deadline) {
        // console.log('执行任务 1', deadline.timeRemaining(), location.href);
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout)) {
          // console.log('执行任务 while', deadline.timeRemaining());
        }
        mainFn(injectSites[checkUrl()]);
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
