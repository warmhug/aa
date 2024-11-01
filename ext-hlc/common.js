const hl_uiUtils = {
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
  confirm: function (text = '', closeTime = 0) {
    // 原生 alert confirm 框 能显示的 字符数量 较少
    let [res, rej] = []
    const promise = new Promise((resolve, reject) => {
      [res, rej] = [resolve, reject];
    });
    // console.log('[res, rej]: ', [res, rej]);
    const container = document.createElement('div');
    container.id = 'hl_alert';
    container.style.cssText = 'display:block; position:fixed; z-index:999; top:50%; left:50%; transform:translate(-50%, -50%); background-color:white; padding:20px; border:1px solid black;';
    container.style.display = 'block';
    const content = document.createElement('div');
    content.innerHTML = text;
    const footer = document.createElement('div');
    footer.addEventListener('click', (evt) => {
      if (evt.target.id == 'ok') {
        res(true);
      }
      if (evt.target.id == 'cancel') {
        res(false);
        // rej(false);
      }
      // container.style.display = 'none';
      container.remove();
    });
    footer.innerHTML = `
    <button id="ok">确定</button>
    <button id="cancel">取消</button>
    `
    container.appendChild(content);
    container.appendChild(footer);
    if (closeTime) {
      setTimeout(() => {
        container.remove();
      }, closeTime);
    }
    if (!document.querySelector(`#${container.id}`)) {
      document.body.appendChild(container);
    }
    return promise;
  },
  // ulList([{ text: 'test', onClick: () => {}, onClose: () => {} }], document.body, true)
  ulList: (listData, container, showClose = true) => {
    const ulList = container || document.createElement('div');
    listData.forEach((item, index) => {
      const li = document.createElement('span');
      li.textContent = item.text;
      li.style.cssText = 'display: inline-block; margin: 6px 4px; padding: 2px 8px;';
      const deleteBtn = document.createElement('b');
      deleteBtn.style.cssText = 'cursor: pointer; color: gray; margin-left: 6px; font-size: 12px; vertical-align: top';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.onclick = () => {
        item?.onClose(index);
      };
      if (showClose) {
        li.appendChild(deleteBtn);
      }
      li.onclick = () => {
        li.parentNode.querySelectorAll('span').forEach(item => {
          console.log(item.textContent);
          item.style.background = null;
        });
        li.style.background = '#bee5be';
        item?.onClick(index);
      };
      ulList.appendChild(li);
    });
    return ulList;
  },
};

const hl_commonUtils = {
  getNow: () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}`;
  },
  sleep: (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
  }),
  jsonParse: function (objStr) {
    let res;
    try {
      res = JSON.parse(objStr);
    } catch (error) {
      console.log('JSON.parse error: ', error);
    }
    return res;
  },
  downloadBase64File: function (base64String, fileName) {
    // const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = fileName || this.getNow() + '.jpeg';
    downloadLink.click();
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
  compareUrl: function (ua, ub, defaultOptions = {}) {
    const options = {
      matchOrigin: false,
      matchOriginPathname: false,
      ...defaultOptions,
    }
    const urla = new URL(ua);
    const urlb = new URL(ub);
    if (options.matchOrigin) {
      return urla.origin === urlb.origin;
    } else if (options.matchOriginPathname) {
      return urla.origin === urlb.origin && urla.pathname === urlb.pathname;
    }
    return ua = ub;
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
      /**
        // need to add clipboard/clipboardWrite/clipboardRead to manifest
        // https://developer.chrome.com/docs/extensions/reference/clipboard/
        console.log('chrome.clipboard', chrome.clipboard);
        chrome.clipboard.onClipboardDataChanged.addListener(() => {
          const success = document.execCommand('paste');
          console.log('document.execCommand result1: ', success);
        });
      */
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
  requestPersistentStorage: async function () {
    navigator.storage.estimate().then(estimate => {
      console.log(`已使用存储空间: ${estimate.usage}`);
      console.log(`可用存储空间: ${estimate.quota}`);
    });
    const isPersisted = await navigator.storage.persisted();
    if (!isPersisted) {
      const result = await navigator.storage.persist();
      if (result) {
        console.log("持久化权限已授予");
      } else {
        console.log("持久化权限请求被拒绝");
      }
    } else {
      console.log("持久化权限已经启用");
    }
  },
  // 打开或创建一个 IndexedDB 数据库
  openDatabase: async function (dbName = 'fileHandlesDB', dbTable = 'fileHandles') {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(dbTable, { keyPath: "id" });
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(dbTable, 'readwrite');
        const objectStore = transaction.objectStore(dbTable);
        resolve([objectStore, transaction, db]);
        // transaction.oncomplete = function() {
        // }
      };
      request.onerror = (event) => {
        console.error('打开数据库出错：', event.target.error);
        reject(event.target.error);
      };
    });
  },
  fileReader: async function (fileArg, streamRead) {
    try {
      let file = fileArg;
      if (!file) {
        const [fileHandle] = await window.showOpenFilePicker();
        file = await fileHandle.getFile();
      }
      if (!streamRead) {
        const contents = await file.text();
        // console.log('contents: ', contents);
        return contents;
      } else {
        await streamReader(file);
      }
    } catch (err) {
      console.error("fileReader 报错", err);
    }
    async function streamReader(file) {
      // 按块读取文件的方式，特别适合处理大文件时逐步读取，避免一次性读取整个文件占用太多内存
      const reader = file.stream().getReader();
      let decoder = new TextDecoder(); // 用于解码文本数据
      let { done, value } = await reader.read();
      while (!done) {
        // 将二进制数据转换为文本
        let chunk = decoder.decode(value, { stream: true });
        console.log('读取的块:', chunk);
        ({ done, value } = await reader.read());
      }
    }
  },
  // FileHandle 可以通过 IndexedDB 来存储
  fileHandleOpt: function () {
    // 存储文件句柄
    const saveFileHandle = async (id, fileHandle) => {
      // console.log('id, fileHandle: ', id, fileHandle);
      if (!id || !fileHandle) {
        return;
      }
      const [store] = await this.openDatabase();
      const request = store.put({ id, fileHandle });
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    // 读取文件句柄
    const getFileHandle = async (id) => {
      if (!id) {
        return;
      }
      const [store] = await this.openDatabase();
      const request = await store.get(id);
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    // 删除文件句柄
    const deleteFileHandle = async (id) => {
      if (!id) {
        return;
      }
      const [store] = await this.openDatabase();
      const request = store.delete(id);
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
      });
    }
    return { saveFileHandle, getFileHandle, deleteFileHandle };
  },
};

const hl_utils = {
  ...hl_commonUtils,
  ...hl_uiUtils,
  // chrome storage 的保存内容可以是对象
  // setStorage({ hl_savedData: obj }, false);
  setStorage: async function (kv, isSync = true) {
    if (!chrome?.storage?.local) {
      Object.keys(kv).forEach(key => {
        if (typeof kv[key] === 'object') {
          localStorage.setItem(key, JSON.stringify(kv[key]));
        } else {
          localStorage.setItem(key, kv[key]);
        }
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
  getStorage: async function (keys = null, isSync = true) {
    if (!chrome?.storage?.local) {
      const res = {};
      Object.keys(localStorage).forEach(key => {
        const resItem = localStorage.getItem(key);
        const parseItem = this.jsonParse(resItem);
        if (parseItem) {
          res[key] = parseItem;
        } else {
          res[key] = resItem;
        }
      });
      return res;
    }
    let res = await chrome.storage.local.get(keys);
    // console.log('local Value is get ', res);
    if (isSync) {
      res = (await chrome.storage.sync.get(keys)) || res;
    }
    // console.log('sync Value is get', res);
    return res;
  },
  removeStorage: async function (keys) {
    if (!chrome?.storage?.local) {
      if (Array.isArray(keys)) {
        keys.forEach(item => {
          localStorage.removeItem(item);
        });
      } else {
        localStorage.removeItem(keys);
      }
      return;
    }
    const localRes = await chrome.storage.local.remove(keys);
    // console.log('local Value is get ', localRes);
    const syncRes = await chrome.storage.sync.remove(keys);
    // console.log('sync Value is get', syncRes);
    return localRes || syncRes;
  },
  cron: function (time, callback = () => {}) {
    let cronLog = '';
    const self = this;
    const defaultTime = 2 * 60 * 60 * 1000;
    function cronFn(time) {
      setTimeout(async () => {
        callback();
        cronLog += `${self.getNow()} cronFn \n`;
        console.log('cronLog: ', cronLog);
        await self.setStorage({ hl_cron: cronLog }, false);
        cronFn(time || defaultTime);
      }, time || defaultTime);
    }
    setInterval(async () => {
      await self.setStorage({ hl_cron: `清除 log ${self.getNow()}` }, false);
    }, 10 * defaultTime);
    return cronFn(time);
  },
  // 检测 url 对应的 tab ，如果不存在 则创建，如果存在 则激活
  createOrUpdateTab: async (targetUrl, strictMatch = fasle) => {
    // 'chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/blank.html' can't be query. 比如 chrome://newtab/
    const tabs = await chrome.tabs.query({});
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
  // 如果在 popup 页面 调用 tabs.remove /
  // 会立即关闭，不能再运行后续代码，所以逻辑要放到 background 里
  reCreateTabsDelay: async (urls = []) => {
    const tabsAll = await chrome.tabs.query({});
    const tabs = tabsAll.filter(tab => urls.includes(tab.url));
    // const tabs = await chrome.tabs.query({ url: urls });
    // console.log('tabs: ', tabs);
    await chrome.tabs.remove(tabs.map(tab => tab.id));
    setTimeout(async () => {
      urls?.forEach(url => {
        chrome.tabs.create({ url, pinned: true });
      });
    }, 500);
  },
  reloadTabs: async (curTab) => {
    // 定时销毁和刷新页面 (解决 循环登录、被墙网站 问题) 有时因为 登录状态检测 等循环调用、导致页面假死状态，这时使用 discard 不起作用，调用 reload 也不执行。
    // 当页面本身有问题时、跟 tab 的状态无关，即这里 tab 的 url 和 status complete 都正常，discarded 也为 false，使用 chrome.tabs.discard/reload 也不解决问题。
    // await chrome.tabs.discard(curTab.id);
    // await chrome.tabs.reload();
    if (curTab) {
      const { index, active, url, pinned } = curTab;
      // await chrome.tabs.duplicate(curTab.id);
      await chrome.tabs.remove(curTab.id);
      await chrome.tabs.create({ index, active, url, pinned });
    } else {
      // 刷新所有页面
      const tabsAll = await chrome.tabs.query({});
      tabsAll.forEach(async (tab) => {
        await chrome.tabs.reload(tab.id);
      });
    }
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
        console.log('sendNativeMessage 接收到消息:', response);
      } catch (error) {
        console.log('sendNativeMessage error: ', error, error.name);
        response = { code: '304', error: error.message };
      }
      return response;
      connect('nm_sh');
      port.postMessage({ message });
    }
    return sendMessage;
  })(),
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
  videoSpeedController: (videoSpeed = 2, onChange = async (arg) => {}) => {
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
        await onChange(video.playbackRate);
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
};
