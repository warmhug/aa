const getSetStorage = {
  getInjectSites: async () => {
    const { hl_injectSites } = await hl_extension_util.getStorage();
    return hl_injectSites ? JSON.parse(hl_injectSites) : {};
  },
  setInjectSites: async (data) => {
    await hl_extension_util.setStorage({ hl_injectSites: JSON.stringify(data) });
  },
};

const createIfr = (src, min) => `
<div class="iframe-wrap ${min ? 'min' : ''}">
  <b>—</b>
  <a class="iframe-title text-nowrap" href="${src}" target="_blank">${src}</a>
  <iframe data-src="${src}" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"></iframe>
</div>
`;

console.log('new tab page', chrome);

$(async function () {
  const _injectSites = await getSetStorage.getInjectSites();
  const driveMeUrl = Object.keys(_injectSites).find(url => _injectSites[url].sideOfPage);

  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  // 注意: webNavigation listener 在这里注册，当打开或刷新 浏览器其他 tab 页面时，这里都会执行回调。
  // 所以 executeScript 需要传入 curTab.id 并判断与打开的页面所在 tab 是否一致。
  chrome.webNavigation.onDOMContentLoaded.addListener(async details => {
    // console.log('webNavigation', curTab, details);
    if (details.url === 'about:blank' || details.tabId !== curTab.id) {
      return;
    }
    const injectionResults = await chrome.scripting.executeScript({
      target: {
        tabId: curTab.id,
        frameIds: [details.frameId]
      },
      func: (tabId) => {
        // alert('injected data');
        window.hl_extension_data = { tabId };
      },
      args: [curTab.id]
    });
    // console.log('injectionResults', injectionResults);
  });

  if (driveMeUrl) {
    // https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
    // 因为飞书代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
    const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url: driveMeUrl });
    // console.log('cookieStores', cookieStores.value);
    const res = await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [10],
      addRules: [
        {
          "id": 10,
          "priority": 1,
          "action": {
            "type": "modifyHeaders",
            "requestHeaders": [
              { "header": "x-csrftoken", "operation": "set", "value": cookieStores?.value || '' }
            ]
          },
          "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
        }
      ]
    });
    // console.log('dnres', res);
    $('#sideIframe').find('iframe').attr('src', driveMeUrl);
    $('#sideIframe').find('a').attr('href', driveMeUrl).html(driveMeUrl);
  }


  Object.entries(_injectSites).filter(([key, val]) => val.tabIdx).forEach(([url, urlProps]) => {
    const { tabIdx, tabName, min } = urlProps;
    const tArr = tabIdx.split('.');
    // 构造 bootstrap 需要的 tabs html 基本结构
    if (!$('#eTabs').find(`[data-idx="${tArr[0]}"]`).length) {
      $('#eTabs').append(`<li role="presentation" data-idx="${tArr[0]}">
      <a href="#tabContent${tArr[0]}" data-toggle="tab">${tabName || '-'}</a>
      </li>`);
    }
    if (!$('#eTabContent').find(`#tabContent${tArr[0]}`).length) {
      $('#eTabContent').append(`<div class="tab-pane" id="tabContent${tArr[0]}" role="tabpanel"></div>`);
    }
    if (tArr.length === 1) {
      $(`#tabContent${tArr[0]}`).append(createIfr(url, min));
    } else if (tArr.length === 2) {
      $(`#tabContent${tArr[0]}`).append(`<div class="tp-row" data-idx="${tabIdx}">${createIfr(url, min)}</div>`);
    } else if (tArr.length === 3) {
      const targetEle = () => $(`#tabContent${tArr[0]}`).find(`[data-idx="${tArr[0]}.${tArr[1]}"]`);
      if (!targetEle().length) {
        $(`#tabContent${tArr[0]}`).append(`<div class="tp-row" data-idx="${tArr[0]}.${tArr[1]}"></div>`);
      }
      targetEle().append(createIfr(url, min));
    }
  });

  const { hl_tabIndex } = await hl_extension_util.getStorage();
  $('#eTabs li').click(async e => {
    const ele = $(e.currentTarget);
    ele.find('a').tab('show');
    const idx = ele.data('idx');
    await hl_extension_util.setStorage({ hl_tabIndex: idx });
    const ifrs = $(`#tabContent${idx}`).find('iframe');
    ifrs.attr('src', (ind, val) => val ? undefined : $(ifrs[ind]).attr('data-src'));
  }).eq(parseInt(hl_tabIndex ?? 0)).trigger("click");

  $('.iframe-wrap b').click(async e => {
    const curUrl = $(e.target).siblings('a').attr('href');
    const iframeWrap = $(e.target).parent('.iframe-wrap');
    const injectSites = await getSetStorage.getInjectSites();
    const { scrollHeight, min } = injectSites[curUrl] || {};
    if (!min) {
      injectSites[curUrl].min = 1;
      iframeWrap.addClass('min');
    } else if (scrollHeight) {
      injectSites[curUrl].min = 0;
      iframeWrap.removeClass('min').height(scrollHeight);
    }
    await getSetStorage.setInjectSites(injectSites);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._ext) {
      void (async () => {
        const dUrl = decodeURIComponent(request._url);
        const injectSites = await getSetStorage.getInjectSites();
        const tabIdx = injectSites[dUrl].tabIdx.split('.')[0];
        // 不改变第一个 tab 的名字
        if (Number(tabIdx) > 0 && request.title) {
          $('#eTabs li').eq(tabIdx).find('a').html(request.title);
          injectSites[dUrl].tabName = request.title;
        }
        if (request.scrollHeight != null) {
          injectSites[dUrl] = {
            ...(injectSites[dUrl] || {}),
            scrollHeight: request.scrollHeight,
          };
        }
        await getSetStorage.setInjectSites(injectSites);

        const iframeTitleEle = $('#eTabContent').find(`[href="${dUrl}"]`);
        // 只给 工具tab 内的 iframe 设置高度
        if (tabIdx === '0' && request.scrollHeight != null && iframeTitleEle) {
          iframeTitleEle.parent().height(request.scrollHeight);
        }
        // 没有 res 会报错吗 Unchecked runtime.lastError: The message port closed before a response was received.
        sendResponse({ success: true, data: injectSites });
      })();
    }
    return true;
  });

  $('#sideIframe').resizable({
    handles: 'e',
    containment: "parent",
    start: function(event, ui) {
      // 解决内部有 iframe 时 拖动卡顿 问题
      $('iframe').css('pointer-events','none');
    },
    stop: async function(event, ui) {
      $('iframe').css('pointer-events','auto');
      const { width } = ui.size;
      const saveWidth = `${width / (window.innerWidth - 12) * 100}%`;
      await hl_extension_util.setStorage({ hl_sideWidth: saveWidth });
    }
  });

  const { hl_sideWidth } = await hl_extension_util.getStorage();
  $('#sideIframe').width(hl_sideWidth ?? '20%');

});
