

const getSetStorage = {
  getIframes: async () => {
    // return JSON.parse(localStorage.getItem('iframesInfo')) || [];
    const { tabIframes } = await getStorage();
    return tabIframes ? JSON.parse(tabIframes) : [];
  },
  setIframes: async (data) => {
    // localStorage.setItem('iframesInfo', JSON.stringify(data));
    await setStorage({ tabIframes: JSON.stringify(data) });
  },
  getTabIdx: async () => {
    // return parseInt(localStorage.getItem('tabIndex') ?? 0);
    const { tabIndex } = await getStorage();
    return parseInt(tabIndex ?? 0);
  },
  setTabIdx: async (idx) => {
    // localStorage.setItem('tabIndex', idx);
    await setStorage({ tabIndex: idx });
  },
  getTabWidth: async () => {
    // return parseInt(localStorage.getItem('tabIndex') ?? 0);
    const { tabWidth } = await getStorage();
    return tabWidth ?? '70%';
  },
  setTabWidth: async (wd) => {
    // localStorage.setItem('tabWidth', wd);
    await setStorage({ tabWidth: wd });
  },
};

$(async function () {
  let navs = '', contents = '';
  const ifrData = await getSetStorage.getIframes();
  ifrData.forEach((item, idx) => {
    navs += `<li role="presentation" data-idx="${idx}">
    <a href="#tabContent${idx}" data-toggle="tab">${item[1] || '-'}</a>
    </li>`;
    contents += `<div class="tab-pane" id="tabContent${idx}" role="tabpanel"></div>`;
  });
  $('#eTabContent').html(contents);
  $('#eTabs').html(navs);
  const createIfr = (src, extra) => `
  <div class="iframe-wrap ${extra?.[src]?.min ? 'min' : ''}">
    <b>—</b>
    <a class="iframe-title text-nowrap" href="${src}" target="_blank">${src}</a>
    <iframe src="${src}" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"></iframe>
  </div>
  `;
  $('#eTabs li').click(async e => {
    const ele = $(e.currentTarget);
    ele.find('a').tab('show');
    const idx = ele.data('idx');
    await getSetStorage.setTabIdx(idx);
    const dataCopy = (await getSetStorage.getIframes())[idx];
    if (Array.isArray(dataCopy[0])) {
      const rows = dataCopy[0].map(sub => {
        return Array.isArray(sub) ?
         `<div class="tp-row">${sub.map(subItem => createIfr(subItem, dataCopy[2])).join(' ')}</div>` :
         `<div class="tp-row">${createIfr(sub, dataCopy[2])}</div>`
      }).join(' ');
      // console.log('rrr', rows);
      $(`#tabContent${idx}`).html(rows);
    } else if (dataCopy[0] && typeof dataCopy[0] === 'string') {
      $(`#tabContent${idx}`).html(createIfr(dataCopy[0], dataCopy[2]));
    }
  }).eq(await getSetStorage.getTabIdx()).trigger("click");
  $('#eTabContent .tab-pane').click(async e => {
    const idx = Number(e.currentTarget.id.replace('tabContent', ''));
    const dataCopy = await getSetStorage.getIframes();
    const heightMap = dataCopy?.[idx]?.[2];
    if (e.target.tagName === 'B' && heightMap) {
      const curUrl = $(e.target).siblings('a').attr('href');
      const { scrollHeight, min } = heightMap[curUrl] || {};
      const iframeWrap = $(e.target).parent('.iframe-wrap');
      if (!min) {
        heightMap[curUrl].min = 1;
        iframeWrap.addClass('min');
      } else if (scrollHeight) {
        heightMap[curUrl].min = 0;
        iframeWrap.removeClass('min').height(scrollHeight);
      }
      await getSetStorage.setIframes(dataCopy);
    }
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 注意 这里可能会多次收到不同来源的消息
    // console.log('ssss', request, sender, sendResponse);
    if (request._ext) {
      (async () => {
        const dUrl = decodeURIComponent(sender.url);
        const dataCopy = await getSetStorage.getIframes();
        dataCopy.forEach((item, idx) => {
          const isMatch = Array.isArray(item[0]) ? item[0].flat().includes(dUrl) : dUrl === item[0];
          if (isMatch && request.title) {
            $('#eTabs li').eq(idx).find('a').html(request.title);
            item[1] = request.title;
          }
          // console.log('onMessage', isMatch, dUrl, request.scrollHeight);
          if (isMatch && request.scrollHeight != null) {
            item[2] = {
              ...(item[2] || {}),
              [dUrl]: {
                ...(item[2]?.[dUrl] || {}),
                scrollHeight: request.scrollHeight,
              },
            };
          }
        });
        await getSetStorage.setIframes(dataCopy);

        const iframeTitleEle = $('#eTabContent').find(`[href="${dUrl}"]`);
        // 只给 工具tab 内的 iframe 设置高度
        const isToolTab = !dataCopy.find(item => item[0] === dUrl);
        if (isToolTab && request.scrollHeight != null && iframeTitleEle) {
          iframeTitleEle.parent().height(request.scrollHeight);
        }
        // 没有 res 会报错吗 Unchecked runtime.lastError: The message port closed before a response was received.
        sendResponse({ success: true, data: dataCopy });
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
    stop: function(event, ui) {
      $('iframe').css('pointer-events','auto');
      const { width } = ui.size;
      const saveWidth = `${width / (window.innerWidth - 12) * 100}%`;
      getSetStorage.setTabWidth(saveWidth);
    }
  });

  const tabWidth = await getSetStorage.getTabWidth();
  $('.tabs').width(tabWidth);

});
