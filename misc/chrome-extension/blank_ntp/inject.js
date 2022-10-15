console.log('this is injected to all pages (ISOLATED window object)', window, chrome);

const hl_extension_util = {
  // 使用 Performance https://web.dev/i18n/en/cls/ 方法代替 onload 监测异步 js 延迟渲染的 dom 元素稳定出现时间点。
  cls: (cb = () => {}) => {
    let clsValue = 0, clsEntries = [], sessionValue = 0, sessionEntries = [];
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            cb();
          }
        }
      }
    }).observe({type: 'layout-shift', buffered: true});
  },
  observeEle: (selector, cb = () => {}) => {
    const targetNode = document.querySelector(selector);
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          console.log('observeEle: A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
          console.log(`observeEle: The ${mutation.attributeName} attribute was modified.`);
        }
      }
    });
    observer.observe(targetNode, config);
    // Later, you can stop observing
    // observer.disconnect();
  },
  checkEle: (selector, cb = () => {}) => {
    let ele, timeout = 8000, startTime = Date.now();
    const check = () => {
      // console.log('check times', Date.now() - startTime);
      ele = document.querySelector(selector);
      if (!ele && Date.now() - startTime < timeout) {
        setTimeout(check, 200);
      } else if (ele) {
        cb(ele);
      }
    };
    check();
  },
  insertCss: content => {
    const style = document.createElement("style")
    style.textContent = content;
    document.head.appendChild(style)
  },
  // https://blog.csdn.net/qq_31201781/article/details/125218891
  injectPageScript: (payload) => {
    var iScript = document.createElement('script');
    // csp 限制不能 eval 代码
    // iScript.textContent = 'console.log(window);';
    // 需要在 manifest 里设置 web_accessible_resources 才能把 chrome-extension://*.js 注入到各个页面里
    iScript.src = chrome.runtime.getURL('inject-sub.js');
    iScript.onload = function() {
      document.dispatchEvent(new CustomEvent('hl_extension_message', { detail: payload }));
      // iScript.remove();
    };
    document.body.appendChild(iScript);
  }
};
window.hl_extension_util = hl_extension_util;

window.addEventListener('load', async () => {
  const { injectPages } = await getStorage();
  // console.log('injectPages', window.hl_extension_data, injectPages);
  const injectCode = JSON.parse(injectPages);
  Object.keys(injectCode).forEach(url => {
    if (location.href.indexOf(url) === 0) {
      if (injectCode[url].blankPageOnly && !window.hl_extension_data?.tabId) {
        return;
      }
      hl_extension_util.cls(() => {
        hl_extension_util.insertCss(injectCode[url].css);
        hl_extension_util.injectPageScript({
          url,
          jsFn: injectCode[url].js,
        });
      });
    };
  });

  if (window !== top && window.hl_extension_data?.tabId) {
    // hl_extension_util.observeEle('#mainBox');
    // console.log('sss', location.href, document.body.clientHeight, document.body.scrollHeight);
    hl_extension_util.checkEle('.note-title__input', (ele) => {
      chrome.runtime.sendMessage({
        _ext: true,
        title: ele.innerHTML,
        scrollHeight: document.body.scrollHeight,
      }, (response) => {});
    });
    chrome.runtime.sendMessage({
      _ext: true,
      scrollHeight: document.body.scrollHeight ,
    }, (response) => {});
  }
});
