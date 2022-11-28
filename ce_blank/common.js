const hl_extension_util = {
  setStorage: async (kv) => {
    const localRes = await chrome.storage.local.set(kv);
    // console.log('local Value is set ', localRes);
    const syncRes = await chrome.storage.sync.set(kv);
    // console.log('sync Value is set ', syncRes);
  },
  getStorage: async (kv) => {
    const localRes = await chrome.storage.local.get(kv);
    // console.log('local Value is get ', localRes);
    const syncRes = await chrome.storage.sync.get(kv);
    // console.log('sync Value is get', syncRes);
    return localRes || syncRes;
  },
  removeStorage: async (kv) => {
    const localRes = await chrome.storage.local.clear();
    // console.log('local Value is get ', localRes);
    const syncRes = await chrome.storage.sync.clear();
    // console.log('sync Value is get', syncRes);
    return localRes || syncRes;
  },
  insertCss: content => {
    if (!content) {
      return;
    }
    const style = document.createElement("style")
    style.setAttribute('data-type', 'hl_extension');
    style.textContent = content;
    document.head.appendChild(style)
  },
  // https://blog.csdn.net/qq_31201781/article/details/125218891
  injectPageScript: (payload, cb = () => {}) => {
    if (!payload?.js) {
      return;
    }
    var iScript = document.createElement('script');
    // csp 限制不能 eval 代码
    // iScript.textContent = 'console.log(window);';
    // 需要在 manifest 里设置 web_accessible_resources 才能把 chrome-extension://*.js 注入到各个页面里
    iScript.setAttribute('data-type', 'hl_extension');
    iScript.src = chrome.runtime.getURL('inject-sub.js');
    iScript.onload = function() {
      document.dispatchEvent(new CustomEvent('hl_extension_message', { detail: payload }));
      // iScript.remove();
      cb();
    };
    document.body.appendChild(iScript);
  },
};
