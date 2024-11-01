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
  const { hl_text_import = '' } = await hl_utils.getStorage(undefined, false);
  var resArray = hl_text_import.split('\n').filter(item => item && item != '\r');
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
    await hl_utils.setStorage({ hl_text_import: fileContents.join() }, false);
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
    if (request.action === 'openPopup' && request.message) {
      setTimeout(() => {
        window.close();
      }, request.message);
    }
    sendResponse({ action: request.action, clipText });
    return true;
  });

  const dealResponse = (response) => {
    if (response) {
      hl_utils.confirm(JSON.stringify(response, null, 2));
    }
  };

  // 注意 proxy 设置，以最后一个扩展的设置生效
  // https://developer.chrome.com/docs/extensions/reference/api/types#type-ChromeSetting
  chrome.proxy.settings.onChange.addListener(evt => {
    console.log('chrome.proxy.settings.onChange: ', evt);
  });

  const proxyListPrefix = 'hl_ctrl_proxy';
  const proxyList = ['whistle', 'comp', 'no', 'clash'];

  const activeSelect = async (ctrlEle, isInit = false, btnEle) => {
    const tips = {
      switchChromeProxy: () => {
        return `
        进入下方 chrome-proxy 链接、确认 chrome 代理设置是否正确
        `;
      },
      hl_ctrl_proxy_whistle: () => `
        代理服务已启动 (浏览器插件局部代理即可) &nbsp;
        <a href="http://127.0.0.1:8899" target="_blank">规则配置</a> &nbsp;
        <a href="https://wproxy.org/whistle/install.html" target="_blank">文档</a>
      `,
      hl_ctrl_proxy_clash: () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'addRule';
        btn.addEventListener('click', async () => {
          const [curTab] = await chrome.tabs.query({ active: true });
          dealResponse(await hl_utils.sendNativeMessage('addRule', new URL(curTab.url).host));
        });
        setTimeout(() => {
          btn.insertAdjacentHTML('afterend',
          `<a style="margin-left:8px" href="http://127.0.0.1:58147/ui/#/rules" target="_blank">监控</a>`);
        }, 100);
        return btn;
      },
      top: () => {
        const btn = document.createElement('button');
        btn.innerHTML = 'top-kill';
        btn.addEventListener('click', async () => {
          dealResponse(await hl_utils.sendNativeMessage('top-kill'));
        });
        setTimeout(() => {
          btn.insertAdjacentHTML('beforebegin',
          `重启电脑先运行 nohup ttyd -p 9999 -W top &`);
        }, 100);
        return btn;
      },
      reloadTabs: () => {
        const btn = document.createElement('button');
        btn.innerHTML = '刷新所有tabs';
        btn.addEventListener('click', async () => {
          dealResponse(await chrome.runtime.sendMessage({ action: 'reloadTabs', reloadTabsAll: true }));
        });
        return btn;
      },
    };
    const setTips = (key) => {
      const result = tips[key]?.();
      if (ctrlEle.nextElementSibling.classList.contains('msg')) {
        ctrlEle.nextElementSibling.innerHTML = '';
        if (typeof result === 'string') {
          ctrlEle.nextElementSibling.innerHTML = result;
        } else if (result) {
          ctrlEle.nextElementSibling.appendChild(result);
        }
      }
    };
    // console.log('nextElementSibling: ', ctrlEle.nextElementSibling, ctrlEle.nextElementSibling.classList.contains('msg'));
    const storage = await hl_utils.getStorage(null);
    const storageField = ctrlEle.getAttribute('data-field');
    if (isInit) {
      if (storage[storageField]) {
        // 设置 active 初始态、显示相应 msg
        const btn = ctrlEle.querySelector(`#${storage[storageField]}`);
        btn?.classList.add('active');
        setTips(btn?.id);
      }
      ctrlEle.querySelectorAll('button').forEach(item => {
        if (item.id === 'switchChromeProxy') {
          item.innerHTML = `${Boolean(storage[`hl_ctrl_${item.id}`]) ? '关闭': '打开'}Chrome代理`;
        }
      });
    } else if (btnEle) {
      ctrlEle.querySelectorAll('button').forEach(item => item.classList.remove('active'));
      btnEle.classList.add('active');
      setTips(btnEle?.id);
      if (
        storageField === proxyListPrefix
        && btnEle.id?.startsWith(proxyListPrefix)
        || storageField !== proxyListPrefix
        && storageField
      ) {
        // 在 proxyList 所在行、只记忆 proxyList 的按钮
        await hl_utils.setStorage({ [storageField]: btnEle?.id });
      }
    }
  };

  document.querySelectorAll('.controls').forEach(ctrl => {
    const storageField = ctrl.getAttribute('data-field');
    if (storageField === proxyListPrefix) {
      // 生成 proxy 控制按钮
      const htmlStr = proxyList.map(item => `<button id="${proxyListPrefix}_${item}">${item}</button>`).join('');
      ctrl.insertAdjacentHTML('beforeend', htmlStr);
    }
    activeSelect(ctrl, true);
    ctrl.addEventListener('click', (evt) => {
      clickHandle(evt, ctrl);
    });
  });
  async function clickHandle(evt, ctrlEle) {
    const btn = evt.target.tagName === 'BUTTON' ? evt.target : '';
    activeSelect(ctrlEle, false, btn);
    const field = btn?.id?.replace(`${proxyListPrefix}_`, '');
    if (proxyList.includes(field)) {
      // proxy 控制直接调用 native 命令
      dealResponse(await hl_utils.sendNativeMessage(field));
      return;
    }
    const storage = await hl_utils.getStorage(null);
    let response;
    // response = await chrome.runtime.sendMessage({ action: 'test' });
    // console.log('Receive res in popup', response);
    switch (field) {
      case 'ai':
        const clipText = await hl_utils.readClipboardText();
        response = await chrome.runtime.sendMessage({ action: 'aiChat', clipText });
        break;
      case 'top':
      case 'openMacConfig':
        response = await hl_utils.sendNativeMessage(field);
        break;
      case 'reloadTabs':
        response = await chrome.runtime.sendMessage({ action: field });
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
      case 'switchChromeProxy':
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
        const proxyConfig = await chrome.proxy.settings.get({'incognito': false});
        console.log('chrome.proxy proxyConfig', proxyConfig);
        const proxyOn = proxyConfig.value.mode === 'system';
        if (proxyOn) {
          const pacScript = storage.hl_other_pacScript || {
            "url": "http://localhost/a/aa/z_pacRule.pac",
            // "data": ""
          };
          await chrome.proxy.settings.set({
            value: { mode: 'pac_script', pacScript },
            scope: 'regular',
          });
        } else {
          await chrome.proxy.settings.clear({});
        }
        await hl_utils.setStorage({ [`hl_ctrl_${field}`]: proxyOn });
        break;
      case 'reCreateTabs':
        response = await chrome.runtime.sendMessage({ action: field });
        break;
      case 'dedupTabs':
        var tabsAll = await chrome.tabs.query({});
        const dupTabs = tabsAll.filter((tab, index) => {
          const idx = tabsAll.findIndex(item => tab.url === item.url);
          if (idx !== index) {
            return tab;
          }
        });
        console.log('dupTabs: ', dupTabs);
        if (window.confirm(`tab总数 ${tabsAll.length} 重复数量 ${dupTabs.length}`)) {
          await chrome.tabs.remove(dupTabs.map(tab => tab.id));
        }
        break;
      case 'delTabs':
        // 如果 url 里含有 #xxx 则 匹配不到
        // const savedTabs = await chrome.tabs.query({ url: storage.hl_tabs_saved });
        var tabsAll = await chrome.tabs.query({});
        console.log('tabsAll: ', tabsAll);
        const dTabs = tabsAll.filter(tab => tab.groupId == -1 && !tab.pinned);
        await chrome.tabs.remove(dTabs.map(tab => tab.id));
        break;
      case 'restoreTabs':
        var tabsAll = async () => await chrome.tabs.query({});
        // 情况: url 相同或只是 origin-pathname 相同，相同 tab 有多个
        // 粗暴处理: 删掉已存在的 origin-pathname 相同的 tab (多个)
        const fileterTabs = [];
        (await tabsAll()).forEach(tab => {
          storage.hl_tabs_saved.forEach((url) => {
            if (tab.url === url || hl_utils.compareUrl(tab.url, url, { matchOriginPathname: true })) {
              fileterTabs.push(tab);
            }
          });
        });
        await chrome.tabs.remove(fileterTabs.map(tab => tab.id));
        const tabsLength = (await tabsAll()).length;
        storage.hl_tabs_saved.forEach(async (url, idx) => {
          await chrome.tabs.create({ url, index: tabsLength + idx });
        });
        // await hl_utils.removeStorage('hl_tabs_saved');
        break;
      case 'saveTabs':
        // await hl_utils.removeStorage(['hl_tabs_saved']);
        const tabs = await chrome.tabs.query({ highlighted: true });
        const saveVal = tabs.map(tab => tab.url);
        const extra = `
        已存储的 tab 信息会有丢失
        选中的 ${JSON.stringify(saveVal, null, 2)}
        上次存储的 ${JSON.stringify(storage.hl_tabs_saved, null, 2)}
        `;
        let loseInfo = false;
        storage.hl_tabs_saved?.forEach(item => {
          if (!saveVal.includes(item)) {
            loseInfo = true;
          }
        });
        const confirmResult = await hl_utils.confirm(extra);
        console.log('confirmResult: ', confirmResult);
        const confirm = !loseInfo || confirmResult;
        // const confirm = !loseInfo || window.confirm('已存储的 tab 信息会有丢失');
        if (confirm) {
          await hl_utils.setStorage({ hl_tabs_saved: saveVal });
        }
        break;
    }
    dealResponse(response);
  };

  await renderText(document.querySelector('#renderText'));

  hl_utils.getLocalIPs(function (ips) {
    localIP = 'http://' + ips[0] + '';
    const ipEle = document.querySelector('#ipEle');
    ipEle.setAttribute('href', localIP);
    ipEle.innerHTML = localIP;
  });

  document.querySelector('#chromeUrls').addEventListener('click', (e) => {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    if (url) {
      chrome.tabs.create({ url: `chrome://${url}` });
    }
  });

  const localStorage = await hl_utils.getStorage(null, false);
  const syncStorage = await hl_utils.getStorage(null);
  console.log('localStorage: ', localStorage);
  console.log('syncStorage: ', syncStorage);

  // .replaceAll('\n', '<br/>')
  const storageText = document.querySelector('#storage textarea');
  const removeInput = document.querySelector('#storage input');
  storageText.value = JSON.stringify(syncStorage, null, 2);
  storageText.addEventListener('input', async (evt) => {
    console.log('evt: ', evt);
    const tv = hl_utils.jsonParse(evt.target.value);
    if (tv) {
      await hl_utils.setStorage(tv);
    }
  });
  removeInput.addEventListener('input', async (evt) => {
    const tv = hl_utils.jsonParse(evt.target.value);
    if (tv) {
      await hl_utils.removeStorage(tv);
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
