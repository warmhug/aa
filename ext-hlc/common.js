const hl_utils = {
  // chrome storage 的保存内容可以是对象
  // setStorage({ hl_savedData: obj }, false);
  setStorage: async (kv, isSync = true) => {
    if (!chrome?.storage?.local) {
      Object.keys(kv).forEach(key => {
        localStorage.setItem(key, kv[key]);
      });
      return;
    }
    // local 最大为 5m sync 最大为8k 超出报错 QUOTA_BYTES_PER_ITEM quota exceeded
    const localRes = await chrome.storage.local.set(kv);
    // console.log('local Value is set ', localRes);
    if (isSync) {
      const syncRes = await chrome.storage.sync.set(kv);
    }
    // console.log('sync Value is set ', syncRes);
  },
  // getStorage(null, false);
  // getStorage(['hl_savedData'], false);
  getStorage: async (keys = null, isSync = true) => {
    if (!chrome?.storage?.local) {
      const res = {};
      Object.keys(localStorage).forEach(key => {
        res[key] = localStorage.getItem(key);
      });
      return res;
    }
    let res = await chrome.storage.local.get(keys);
    // console.log('local Value is get ', res);
    if (isSync) {
      res = await chrome.storage.sync.get(keys);
    }
    // console.log('sync Value is get', res);
    return res;
  },
  removeStorage: async (keys) => {
    if (!chrome?.storage?.local) {
      localStorage.removeItem(keys);
      return;
    }
    const localRes = await chrome.storage.local.remove(keys);
    // console.log('local Value is get ', localRes);
    const syncRes = await chrome.storage.sync.remove(keys);
    // console.log('sync Value is get', syncRes);
    return localRes || syncRes;
  },
  activeTabByUrl: async (url = 'chrome://newtab/') => {
    // 'chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/blank.html' can't be query.
    const queryTab = await chrome.tabs.query({ url });
    // console.log('curTab', queryTab);
    await chrome.tabs.highlight({tabs: queryTab[0].index});
  },
  // 检测 url 对应的 tab ，如果不存在 则创建，如果存在 则激活
  createOrUpdateTab: async (targetUrl, strictMatch = fasle) => {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    let targetTab = tabs.find((tab) => {
      return new URL(tab.url).hostname === new URL(targetUrl).hostname;
    });
    if (!targetTab) {
      targetTab = await chrome.tabs.create({ url: targetUrl, active: true });
    } else {
      // console.log('targetTab: ', targetTab, targetUrl);
      if (strictMatch && targetTab.url !== targetUrl) {
        await chrome.tabs.update(targetTab.id, {
          url: targetUrl,
        });
      }
      if (targetTab.status !== 'complete') {
        // status complete 只表示 页面 初始化完成 但页面内容的资源可能没有 onload
        // chrome.tabs.reload 和 update 很快会结束，指的是 tab 的变化、跟页面内容无关
        await chrome.tabs.reload(targetTab.id);
        // 轮询检查状态
        await new Promise(resolve => {
          let interval;
          interval = setInterval(() => {
            if (targetTab.status === 'complete') {
              console.log('targetTab.status: ', targetTab.status);
              clearInterval(interval);
              resolve();
            }
          }, 50);
        });
      }
    }
    // console.log('targetTab: ', targetTab);
    return targetTab;
  },
  sendNativeMessage: (() => {
    let port = null;
    function connect(name) {
      // 双向通信
      port = chrome.runtime.connectNative(name);
      port.onMessage.addListener((message) => {
        console.log('Received message from native: ', message);
      });
      port.onDisconnect.addListener((p) => {
        console.log('Disconnected', chrome.runtime.lastError);
        port = null;
      });
    }
    async function sendMessage(message, content) {
      // 单向通信
      let response;
      try {
        response = await chrome.runtime.sendNativeMessage('nm_sh', {
          message,
          content,
        });
        console.log('接收到消息:', response);
        // alert(JSON.stringify(response));
      } catch (error) {
        console.log('error: ', error);
      }
      return response;
      connect('nm_sh');
      port.postMessage({ message });
    }
    return sendMessage;
  })(),
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
      const el = document.createElement('textarea');
      el.value = 'before paste';
      document.body.append(el);
      el.select();
      const success = document.execCommand('paste');
      // console.log('document.execCommand result: ', success);
      const text = el.value;
      el.remove();
      if (!success) reject(new Error('Unable to read from clipboard'));
      resolve(text);
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
      if (chrome?.clipboard) {
        // https://developer.chrome.com/docs/apps/reference/clipboard
        // chrome app 里可以获取 clipboard 但插件里不支持
        text = await chrome.clipboard.readText();
        console.log('clipboard from chrome: ', text);
      }
      if (!text) {
        // DOMException: Document is not focused.
        text = await navigator.clipboard.readText();
        console.log('clipboard from navigator: ', text);
      }
    } catch (error) {
      console.log('hl readClipboardText custom', error);
      text = await readText();
    } finally {
      console.log('hl readClipboardText finally', text);
    }
    // console.log('hl readClipboardText', text);
    return text;
  },
  downloadBase64File: function (base64String, fileName) {
    // const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = fileName || this.getNow() + '.jpeg';
    downloadLink.click();
  },
  // get local ip https://github.com/dlo83/local-ip-chrome-extension
  getLocalIPs: (callback) => {
    var ips = [];
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.onicecandidate = function (e) {
      if (!e.candidate) { // Candidate gathering completed.
        pc.close();
        callback(ips);
        return;
      }
      var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
      if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
        ips.push(ip);
    };
    pc.createOffer(function (sdp) {
      pc.setLocalDescription(sdp);
    }, function onerror() { });
  },
  // createSearchSwitch('https://www.google.com/search?q=ss&sca_esv=bb');
  // createSearchSwitch('https://bing.com/search?q=js&ac=b')
  // createSearchSwitch('https://www.baidu.com/s?wd=js')
  createSearchSwitch: function (url) {
    const createContainer = () => {
      const container = document.createElement('div');
      container.setAttribute('data-flag', 'hl_search');
      container.style.cssText = 'position: fixed; right: 500px; top: 4px; z-index: 9999; opacity: 0.3;';
      document.body.append(container);
      return container;
    }
    const createLink = (container, href, text) => {
      const ele = document.createElement('a');
      ele.href = href;
      ele.innerText = text;
      ele.style.cssText = 'text-decoration: none; margin-right: 10px';
      container.appendChild(ele);
    }
    const urlObj = new URL(url || location.href);
    const searchEngines = ['google.com', 'bing.com', 'baidu.com'];
    const searchEngineNames = ['Goog', 'Bing', 'BD'];
    const createHref = (matchTxt, query) => 'https://www.' + matchTxt + '?' + query;
    console.log('run search', urlObj.pathname);
    if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[0])) {
      const query = urlObj.searchParams.get('q') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
      createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
    } else if (['/', '/search'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[1])) {
      const query = urlObj.searchParams.get('q') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
      createLink(container, createHref(searchEngines[2] + '/s', 'wd=' + query), searchEngineNames[2]);
    } else if (['/', '/s'].includes(urlObj.pathname) && urlObj.host.endsWith(searchEngines[2])) {
      const query = urlObj.searchParams.get('wd') || '';
      const container = createContainer();
      createLink(container, createHref(searchEngines[0] + '/search', 'q=' + query), searchEngineNames[0]);
      createLink(container, createHref(searchEngines[1] + '/search', 'q=' + query), searchEngineNames[1]);
    }
  },
  videoSpeedController: (videoSpeed = 2, onChange = async () => {}) => {
    // 参考 Video Speed Controller https://chromewebstore.google.com/detail/nffaoalbilbmmfgbnbgppjihopabppdk
    // 测试地址 https://shapeshed.com/examples/HTML5-video-element/
    const controlEle = (video) => {
      const rect = video.getBoundingClientRect();
      const offsetRect = video.offsetParent?.getBoundingClientRect();
      const top = Math.max(rect.top - (offsetRect?.top || 0), 0);
      const left = Math.max(rect.left - (offsetRect?.left || 0), 0);
      const input = document.createElement('input');
      input.setAttribute('name', 'hl_video_controller');
      input.setAttribute('type', 'number');
      input.setAttribute('step', '0.2');
      input.setAttribute('min', '0.2');
      input.style.cssText = `position: absolute; z-index: 9999; opacity: 0.3; width: 50px; height: 20px; top: ${top}px; left: ${left}px;`;
      input.value = video.playbackRate !== 1 ? video.playbackRate.toFixed(2) : videoSpeed;
      video.playbackRate = Number(input.value);
      input.addEventListener('change', async (evt) => {
        // console.log('evt: ', evt);
        video.playbackRate = Number(evt.target.value);
        await onChange();
      });
      video.parentElement.insertBefore(input, video.parentElement.firstChild);
      return input;
    }
    document.querySelectorAll('video').forEach(item => {
      const input = controlEle(item);
      input.parentElement.addEventListener('mouseenter', () => {
        input.style.display = 'block';
      });
      input.parentElement.addEventListener('mouseleave', () => {
        input.style.display = 'none';
      });
    });
  },
  getNow: () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}`;
  },
  debounce: (fn, delay) => {
    var timer = null;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  },
  sleep: (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
  }),
  cron: function (time, callback = () => {}) {
    let cronLog = '';
    const self = this;
    function cronFn(time) {
      const defaultTime = 4 * 60 * 60 * 1000;
      setTimeout(async () => {
        callback();
        cronLog += `${self.getNow()} cronFn \n`;
        console.log('cronLog: ', cronLog);
        await self.setStorage({ hl_reloadCron: cronLog }, false);
        cronFn();
      }, time || defaultTime);
      setTimeout(async () => {
        cronLog = '';
        cronLog += '清除 log';
        await self.setStorage({ hl_reloadCron: cronLog }, false);
      }, 5 * defaultTime);
    }
    return cronFn(time);
  },
  injectStyles: (cssText, id) => {
    if (id) {
      const isExist = document.querySelector([`data-hl-style-id=${id}`]);
      if (isExist) {
        return;
      }
    }
    const style = document.createElement('style');
    style.textContent = cssText;
    document.head.appendChild(style);
  },
  modalBs: function ({
    content,
    onOpen = () => {}, onClose = () => {},
  }) {
    const modalTemp = `
      <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
          </div>
        </div>
      </div>
    `;
    const css = `
      .fade {
        opacity: 0;
        transition: opacity .15s linear;
      }
      .fade.in {
        opacity: 1;
      }
      .modal-open {
        overflow: hidden;
      }
      .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        overflow: hidden;
        outline: 0;
      }
      .modal.fade .modal-dialog {
        transition: transform .3s ease-out;
        transform: translate(0, -25%);
      }
      .modal.in .modal-dialog {
        transform: translate(0, 0);
      }
      .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .modal-dialog {
        position: relative;
        width: auto;
        margin: 30px auto;
      }
      .modal-content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #999;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 6px;
        outline: 0;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
      }
      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
      }
      .modal-backdrop.fade {
        opacity: 0;
      }
      .modal-backdrop.in {
        opacity: .5;
      }
      .modal-lg {
        width: 900px;
      }
    `;
    this.injectStyles(css);
    const modalWrapper = document.createElement('div');
    modalWrapper.innerHTML = modalTemp;
    const modal = modalWrapper.querySelector('.modal');
    document.body.appendChild(modalWrapper);
    modal.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        toggleModal(false);
      }
    });
    let modalBackdrop;
    const toggleModal = (isOpen) => {
      if (isOpen) {
        modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');
        modal.style = 'display: block;';
        modal.classList.add('in');
        document.body.classList.add('modal-open');
        document.body.append(modalBackdrop);
      } else {
        modal.style = 'display: none;';
        modal.classList.remove('in');
        document.body.classList.remove('modal-open');
        modalBackdrop?.remove();
      }
    };
    let openState = false;
    document.body.addEventListener('dblclick', () => {
      openState = !openState;
      toggleModal(openState);
      openState ? onOpen() : onClose();
    });
    modal.querySelector('.modal-content').innerHTML = content;
    return {
      modal,
      toggleModal,
      openState,
    }
  },
  /*
  问 chatgpt
  使用 html modal 元素写一个类似 bootstrap 的 modal 功能，抽象成 js 组件、把 css 注入进去。
  把类改为使用函数写法。
  防止多次调用时，多次生成样式和元素。
  返回 打开 关闭 toggleModal 的函数。
  把 openModalBtn 元素放到 js 里。
  把 modal-content 和 close-btn 也放到 js 里去。
  */
  modalGpt: function () {
    let modalsInitialized = new Set();  // 用 Set 来标记已经初始化的 modal
    const defaultContainer = document.body;
    const self = this;
    function createModal(modalId, {
      container = defaultContainer, title = '', content = '',
      onOpen = () => {}, onClose = () => {},
    }) {
      // 防止同一个 modal 被多次初始化
      if (modalsInitialized.has(modalId)) {
        return;
      }
      const html = `
      <dialog id="${modalId}">
        <div class="modal-header">
          <h3>${title}</h3>
          <span class="close-btn">&times;</span>
        </div>
        <div class="modal-content">${content}</div>
      </dialog>
      `;
      let newContainer = container;
      if (container === defaultContainer) {
        newContainer = document.createElement('div');
        defaultContainer.appendChild(newContainer);
      }
      newContainer.innerHTML = html;
      self.injectStyles(`
        dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          width: 80%;
          max-width: 500px;
        }
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
      `, modalId);
      const dialog = newContainer.querySelector('dialog');
      const closeButton = newContainer.querySelector('close-btn');
      closeButton.addEventListener('click', () => {
        dialog.close();
        onClose();
      });
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
          dialog.close();
          onClose();
        }
      });
      modalsInitialized.add(modalId);  // 标记该 modal 已经初始化
      // 返回的控制 Modal 的函数
      return {
        openModal: () => dialog.show(),
        closeModal: () => dialog.close(),
        toggleModal: () => {
          if (dialog.open) {
            dialog.close();
          } else {
            dialog.show();
          }
        }
      };
    }

    return createModal;
  },
};
