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

$(async function () {
  Object.entries(await getSetStorage.getInjectSites()).filter(([key, val]) => val.tabIdx).forEach(([url, urlProps]) => {
    const { tabIdx, tabName, min } = urlProps;
    const tArr = tabIdx.split('.');
    // 构造 bootstrap 需要的 tabs html 基本结构
    if (!$('#eTabs').find(`[data-idx="${tArr[0]}"]`).length) {
      $('#eTabs').append(`<li role="presentation" data-idx="${tArr[0]}">
      <a href="#tabContent${tArr[0]}" data-toggle="tab">${tabName || '-'}</a>
      </li>`);
    }
    // 构造 bootstrap 需要的 tabs html 基本结构
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

  $('.tabs').resizable({
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
      await hl_extension_util.setStorage({ hl_tabWidth: saveWidth });
    }
  });

  const { hl_tabWidth } = await hl_extension_util.getStorage();
  $('.tabs').width(hl_tabWidth ?? '80%');

});
