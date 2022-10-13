// https://stackoverflow.com/questions/11800873/javascript-split-an-array-into-subarrays-by-a-given-seperator
function splitArray(rawArray, seperator) {
  let row = [];
  const rows = [];
  rawArray.forEach(item => {
    if (item === seperator) {
      rows.push(row);
      row = [];
    } else {
      row.push(item);
    }
  });
  rows.push(row);
  return rows;
}

function getNewLinks () {
  const links = localStorage.getItem('links') || JSON.stringify(iframes);
  return JSON.parse(links);
}

$(function () {
  const curTabIdx = parseInt(localStorage.getItem('tabIndex') ?? 0);
  let navs = '', contents = '';
  getNewLinks().forEach((item, idx) => {
    navs += `<li role="presentation" data-idx="${idx}">
    <a href="#tabContent${idx}" data-toggle="tab">${item[1] || '-'}</a>
    </li>`;
    contents += `<div class="tab-pane" id="tabContent${idx}" role="tabpanel"></div>`;
  });
  $('#eTabContent').html(contents);
  $('#eTabs').html(navs);
  const createIfr = src => `
  <div class="iframe-wrap">
    <a class="iframe-title text-nowrap" href="${src}" target="_blank">${src}</a>
    <iframe src="${src}" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"></iframe>
  </div>
  `;
  $('#eTabs li').click(e => {
    const ele = $(e.currentTarget);
    ele.find('a').tab('show');
    const idx = ele.data('idx');
    localStorage.setItem('tabIndex', idx);
    const cts = getNewLinks()[idx][0];
    if (Array.isArray(cts)) {
      const rows = splitArray(cts, NEWLINE).map(subArray => `<div class="tp-row">${subArray.map(subItem => createIfr(subItem)).join(' ')}</div>`).join(' ');
      // console.log('rrr', rows);
      $(`#tabContent${idx}`).html(rows);
    } else if (cts && typeof cts === 'string') {
      $(`#tabContent${idx}`).html(createIfr(cts));
    }
  }).eq(curTabIdx).trigger("click");
  chrome.runtime.onMessage.addListener((request, sender, res) => {
    // 注意 这里可能会多次收到不同来源的消息
    // console.log('ssss', request, sender, res);
    if (request._ext && request.title) {
      localStorage.setItem('links', JSON.stringify(getNewLinks().map((item, idx) => {
        if (item[0] === sender.url && !item[1]) {
          $('#eTabs li').eq(idx).find('a').html(request.title);
          return [item[0], request.title];
        }
        return item;
      })));
    }
    const iframeTitleEle = document.querySelector(`[href="${sender.url}"]`);
    if (request._ext && request.windowSize?.height && iframeTitleEle) {
      iframeTitleEle.parentNode.style.height = request.windowSize?.height + 'px';
    }
    // 没有 res 会报错吗 Unchecked runtime.lastError: The message port closed before a response was received.
    res('aaa');
  });

  $('#closeSide').click((e) => {
    $('#sideIframe').toggle();
  });
});
