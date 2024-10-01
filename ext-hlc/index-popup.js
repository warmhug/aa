// 在 popup 页面右键 查看元素 看控制台
// console.log('when exec?');

async function renderText(container = document.body) {
  const wrapper = document.createElement('details');
  wrapper.setAttribute('open', true);
  wrapper.class = 'import-txt';
  wrapper.innerHTML = `
    <summary>
      导入的文案 &nbsp;
      <a id="importBtn">load</a>
      <a id="changeTxt">换一个</a>
    </summary>
    <div id="importTxt">importTxt</div>
  `;
  container.appendChild(wrapper);
  const renderItem = () => {
    const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min) ) + min;
    const randomIndex = getRndInteger(2, resArray.length - 1);
    document.querySelector('#importTxt').innerHTML = `
      ${resArray[randomIndex] || ''}<br>
      ${resArray[randomIndex + 1] || ''}
    `;
  };
  const { hl_importTxt = '' } = await hl_utils.getStorage(undefined, false);
  var resArray = hl_importTxt.split('\n').filter(item => item && item != '\r');
  renderItem();
  document.querySelector('#importBtn').addEventListener('click', async () => {
    if (resArray?.length && window.confirm('使用缓存的内容？')) {
      return;
    }
    const filesHandle = await window.showOpenFilePicker({
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: true
    });
    const fileContents = await Promise.all(filesHandle.map(async (fileHandle) => {
      const file = await fileHandle.getFile();
      const contents = await file.text();
      // console.log('ccc', contents);
      return contents;
    }));
    await hl_utils.setStorage({ hl_importTxt: fileContents.join() }, false);
    alert('写入本地存储成功');
  });
  document.querySelector('#changeTxt').addEventListener('click', (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    renderItem();
  });
}

popup();
async function popup () {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    // console.log(`Command "${command}" triggered`, window, location.href);
    const clipText = await hl_utils.readClipboardText();
    if (request.action === 'shortcuts' && request.message === 'openGoogTl') {
      chrome.tabs.create({ url: `https://translate.google.com/?sl=zh-CN&tl=en&text=${clipText}&op=translate` });
    }
    sendResponse({ action: request.action, clipText });
    return true;
  });

  const proxyConfig = await chrome.proxy.settings.get({'incognito': false});
  // SwitchyOmega https://github.com/gfwlist/gfwlist
  console.log('chrome.proxy proxyConfig', proxyConfig);
  console.log('chrome.proxy: ', chrome.proxy);
  // 注意 proxy 设置，以最后一个扩展的设置生效
  // https://developer.chrome.com/docs/extensions/reference/api/types#type-ChromeSetting
  chrome.proxy.settings.onChange.addListener(evt => {
    console.log('chrome.proxy.settings.onChange: ', evt);
  });

  // const localStorage = await hl_utils.getStorage(['hl_savedTabs'], false);
  const localStorage = await hl_utils.getStorage(null, false);
  const syncStorage = await hl_utils.getStorage(null);
  console.log('localStorage: ', localStorage);
  console.log('syncStorage: ', syncStorage);

  const [curTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let proxyOn = false;
  const renderMsg = (ctrl, field, extra) => {
    const tips = {
      saveTabs: () => extra || '',
      reloadPage: () => `先 discard 再 reload`,
      whistle: () => `
    代理服务已启动 (浏览器插件局部代理即可) &nbsp;
    <a href="http://127.0.0.1:8899" target="_blank">规则配置</a> &nbsp;
    <a href="https://wproxy.org/whistle/install.html" target="_blank">文档</a>`,
      stopProxy: () => {
        // chrome.tabs.create({ url: 'chrome://settings/system' });
        return `
        复制 chrome://settings/system 确认代理
        点击 ${proxyOn ? '关闭' : '打开'} 当前插件设置的 Chrome 代理
        `;
      },
      clash: () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'addRule';
        btn.addEventListener('click', async () => {
          await hl_utils.sendNativeMessage('addRule', new URL(curTab.url).host);
        });
        setTimeout(() => {
          btn.insertAdjacentHTML('afterend',
          `<a style="margin-left:8px" href="http://127.0.0.1:58147/ui/#/rules" target="_blank">监控</a>`);
        }, 100);
        return btn;
      },
      kill: () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'top-kill';
        btn.addEventListener('click', async () => {
          await hl_utils.sendNativeMessage('top-kill');
        });
        return btn;
      },
    };
    // console.log('nextElementSibling: ', ctrl.nextElementSibling, ctrl.nextElementSibling.classList.contains('msg'));
    const result = tips[field]?.();
    if (ctrl.nextElementSibling.classList.contains('msg')) {
      ctrl.nextElementSibling.innerHTML = '';
      if (typeof result === 'string') {
        ctrl.nextElementSibling.innerHTML = result;
      } else if (result) {
        ctrl.nextElementSibling.appendChild(result);
      }
    }
  };

  let storageField;
  const proxyList = ['whistle', 'no', 'comp', 'clash'];
  const ctrls = document.querySelectorAll('.controls');
  ctrls.forEach(ctrl => {
    storageField = ctrl.getAttribute('data-field');
    if (storageField === 'hl_proxy') {
      ctrl.innerHTML =
        proxyList.map(item => `<button id="${item}">${item}</button>`).join('');
    }
    const initValue = syncStorage[storageField];
    // 设置初始状态
    if (initValue) {
      ctrl.querySelector(`#${initValue}`).classList.add('active');
      renderMsg(ctrl, initValue);
    }
    ctrl.addEventListener('click', (evt) => hander(evt, ctrl));
  });
  async function hander(evt, ctrlEle) {
    storageField = ctrlEle.getAttribute('data-field');
    // console.log('evt: ', evt, ctrlEle, storageField);
    const field = evt.target.tagName === 'BUTTON' ? evt.target.id : '';
    if (field && evt.target.tagName === 'BUTTON') {
      ctrlEle.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      evt.target.classList.add('active');
      if (storageField) {
        await hl_utils.setStorage({ [storageField]: field });
      }
    }
    if (proxyList.includes(field)) {
      await hl_utils.sendNativeMessage(field);
      renderMsg(ctrlEle, field);
      return;
    }
    switch (field) {
      case 'ai':
        const clipText = await hl_utils.readClipboardText();
        chrome.runtime.sendMessage({ action: 'aiChat', clipText }, (response) => {
          console.log('Receive response in popup', response);
        });
        break;
      case 'top':
      case 'openMacConfig':
        await hl_utils.sendNativeMessage(field);
        break;
      case 'reloadMy':
        // 定时销毁和刷新页面 (解决 内网循环登录、被墙网站 问题)
        break;
      case 'reloadPage':
        chrome.tabs.discard(curTab.id);
        chrome.tabs.reload();
        break;
      case 'snapshot':
        chrome.tabs.captureVisibleTab((dataUrl) => {
          const url = dataUrl.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20image.png;');
          hl_utils.downloadBase64File(url);
        });
        break;
      case 'resizeWindow':
        chrome.windows.getCurrent(function(wind) {
          chrome.windows.update(wind.id, { width: 1728 });
        });
        break;
      case 'stopProxy':
        const fixConfig = {
          mode: 'fixed_servers',
          rules: {
            bypassList: ['127.0.0.1', '[::1]', 'localhost'],
            singleProxy: {
              host: '127.0.0.1',
              port: 7890,
              scheme: 'http',
            }
          }
        };
        proxyOn = !proxyOn;
        if (proxyOn) {
          const pacConfig = {
            mode: 'pac_script',
            pacScript: syncStorage.hl_pacScript,
          };
          await chrome.proxy.settings.set({ value: pacConfig, scope: 'regular' });
        } else {
          await chrome.proxy.settings.clear({});
        }
        renderMsg(ctrlEle, field);
    }
    // 帮我写 Chrome 插件代码，实现这样的功能：选中一些标签页、把他们的 URL以有序数组形式 存储到 chrome storage 里、同时关闭这些标签页，通过 popup  页面的一个按钮、从数组里恢复打开标签页，并把这些标签页移动到其他已存在标签页的后边。
    switch (field) {
      case 'saveTabs':
        // await hl_utils.removeStorage(['hl_savedTabs']);
        const tabs = await chrome.tabs.query({highlighted: true, currentWindow: true});
        const saveVal = tabs.map(tab => tab.url);
        const extra = `
        选中的 ${JSON.stringify(saveVal)}
        上次存储的 ${JSON.stringify(syncStorage.hl_savedTabs)}
        `;
        let loseInfo = false;
        syncStorage.hl_savedTabs?.forEach(item => {
          if (!saveVal.includes(item)) {
            loseInfo = true;
          }
        });
        renderMsg(ctrlEle, field, extra);
        if (!loseInfo || window.confirm('已存储的 tab 信息会有丢失')) {
          await hl_utils.setStorage({ hl_savedTabs: saveVal });
          await chrome.tabs.remove(tabs.map(tab => tab.id));
        }
        break;
      case 'restoreTabs':
        const tabsAll = await chrome.tabs.query({currentWindow: true});
        const lastTabIndex = tabsAll.length - 1;
        syncStorage.hl_savedTabs.forEach(url => {
          const { host, pathname } = new URL(url);
          const exists = tabsAll.find(tab => tab.url.host === host && tab.url.pathname === pathname);
          if (exists?.length) {
            exists.forEach(async tab => {
              await chrome.tabs.move(tab.id, { index: lastTabIndex + 1 });
            });
          } else {
            chrome.tabs.create({url: url, index: lastTabIndex + 1});
          }
        });
        // await hl_utils.removeStorage('hl_savedTabs');
        break;
    }
  };

  await renderText(document.querySelector('#renderText'));

  hl_utils.getLocalIPs(function (ips) {
    localIP = 'http://' + ips[0] + '';
    const ipEle = document.querySelector('#ipEle');
    ipEle.setAttribute('href', localIP);
    ipEle.innerHTML = localIP;
  });

  document.querySelector('#chromeUrls a').addEventListener('click', (e) => {
    const targetEle = e.target;
    const url = targetEle.getAttribute('data-href');
    chrome.tabs.create({ url: `chrome://${url}` });
  });

  // .replaceAll('\n', '<br/>')
  const storageText = document.querySelector('#storage textarea');
  storageText.value = JSON.stringify(syncStorage, null, 2);
  storageText.addEventListener('input', async (evt) => {
    console.log('evt: ', evt);
    try {
      const tv = JSON.parse(evt.target.value);
      await hl_utils.setStorage(tv);
    } catch (error) {
      console.log('JSON.parse error: ', error);
    }
  });

  // 获取快捷键
  const manifest = chrome.runtime.getManifest()
  document.querySelector('#cmds').innerHTML = JSON.stringify(manifest.commands, null, 2);

  // 电源模式
  // 防止休眠或屏幕关闭 https://chrome.google.com/webstore/detail/keep-computer-awake-for-a/imbpigcghoambmanjekibelfjemnnool
  const powerMode = localStorage?.hl_power || 'default';
  document.querySelectorAll('#powerOps input[type="radio"]').forEach(item => {
    if (item.getAttribute('value') === powerMode) {
      item.setAttribute('checked', true);
    }
    item.addEventListener('change', async function(e) {
      // console.log('ee', e.target);
      switch (e.target.value) {
        case 'display':
        case 'system':
          chrome?.power?.requestKeepAwake(e.target.value);
          await hl_utils.setStorage({ hl_power: e.target.value });
          break;
        default:
          chrome?.power?.releaseKeepAwake();
          await hl_utils.setStorage({ hl_power: '' });
          break;
      }
    });
    // chrome.power.reportActivity(() => {
    //   console.log('reportActivity');
    // });
  });

}
