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
    iScript.src = chrome.runtime.getURL('injected.js');
    iScript.onload = function() {
      document.dispatchEvent(new CustomEvent('hl_extension_message', { detail: payload }));
      // iScript.remove();
      cb();
    };
    document.body.appendChild(iScript);
  },
  /**
    // need to add clipboard/clipboardWrite/clipboardRead to manifest
    // https://developer.chrome.com/docs/extensions/reference/clipboard/
    console.log('chrome.clipboard', chrome.clipboard);
    chrome.clipboard.onClipboardDataChanged.addListener(() => {
      const success = document.execCommand('paste');
      console.log('document.execCommand result1: ', success);
    });
   */
  readClipboardText: async () => {
    // https://github.com/extend-chrome/clipboard/blob/master/src/index.ts
    const readText = () => new Promise((resolve, reject) => {
      // Create hidden input to receive text
      const el = document.createElement('textarea')
      el.value = 'before paste'
      document.body.append(el)
      el.select()
      const success = document.execCommand('paste');
      // console.log('document.execCommand result: ', success);
      const text = el.value
      el.remove()
      if (!success) reject(new Error('Unable to read from clipboard'))
      resolve(text)
    });
    const writeText = (text) => new Promise((resolve, reject) => {
      // Create hidden input with text
      const el = document.createElement('textarea')
      el.value = text
      document.body.append(el)
      // Select the text and copy to clipboard
      el.select()
      const success = document.execCommand('copy')
      el.remove()
      if (!success) reject(new Error('Unable to write to clipboard'))
      resolve(text)
    });

    let text = '';
    try {
      // DOMException: Document is not focused.
      text = await navigator.clipboard.readText();
    } catch (error) {
      // console.log('err', error);
      text = await readText();
    }
    console.log('readClipboardText', text);
    return text;
  },
  getMatchUrl: (urls, matchUrl) => {
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
      if (uaObj.origin === ubObj.origin && uaObj.pathname === ubObj.pathname && isInclude) {
        return true;
      }
      return false;
    };
    // 优先匹配完全一样的 (todo: 如果既有完全一样、又有部分匹配 多种规则，应该合并起来)
    if (urls.includes(matchUrl)) return matchUrl;
    // 再进行部分匹配
    return urls.find(url => {
      // 优先匹配同样域名和路径的
      if (matchUrl.indexOf(url) === 0) {
        return true;
      }
      // 比如 Google translate 默认 url 是 https://translate.google.com/?sl=zh-CN&tl=en&op=translate
      // 搜索时 url 是 https://translate.google.com/?sl=zh-CN&tl=en&text=as&op=translate
      // 前者是后者的子集
      return equalUrl(url, matchUrl);
    });
  },
};
