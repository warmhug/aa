// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

// console.log('cb', chrome.bookmarks);

const folderIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVGNCI+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=';

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return document.createElement('span');
      }
    }
    // html 0宽字符: U+200B  U+200C  U+200D   U+FEFF  &zwnj;&ZeroWidthSpace;&#xFEFF
    let formatTitle = bookmarkNode.title
      // todo 有问题
      // .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // console.log('unicode', formatTitle, formatTitle.length, formatTitle.charAt(0));
    // formatTitle = $('<div />').html(formatTitle).html().replace(/\u200C/g, '');
    // formatTitle.split('').forEach(console.log);
    formatTitle = [...formatTitle].map((item, idx) => {
      // console.log(formatTitle.charCodeAt(idx))
      const unicodeZeroSpaces = [8203, 8204, 8205, 8236, 8288, 8289, 8290, 8291, 8292, 65279];
      if (unicodeZeroSpaces.includes(formatTitle.charCodeAt(idx))) {
        return '';
      }
      return item;
    }).join('');
    // console.log('formatTitle', formatTitle);
    if (formatTitle.length > 60) {
      formatTitle = formatTitle.substring(0, 60) + '...';
    }
    var anchor = document.createElement('a');
    let iconUrl = folderIcon;
    if (bookmarkNode.url) {
      anchor.setAttribute('data-href', bookmarkNode.url);
      // chrome://bookmarks 打开控制台 查找文件夹图标 chrome://bookmarks/images/folder_open.svg
      iconUrl = chrome.runtime.getURL(`_favicon/?pageUrl=${bookmarkNode.url}`);
    }
    anchor.setAttribute('title', bookmarkNode.title);
    // anchor.setAttribute('target', '_blank');
    anchor.innerHTML = `<img src="${iconUrl}" />${formatTitle}`;
  }
  // console.log('bookmarkNode.title', bookmarkNode.title, bookmarkNode.children);
  var li = document.createElement(bookmarkNode.title ? 'li' : 'div');
  li.append(anchor);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
function dumpTreeNodes(bookmarkNodes, query) {
  var ulEle = document.createElement('ul');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    ulEle.append(dumpNode(bookmarkNodes[i], query));
  }
  return ulEle;
}
function dumpBookmarks(query) {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    // console.log('bookmarkTreeNodes', bookmarkTreeNodes);
    let newChilds = [];
    const roots = bookmarkTreeNodes[0].children;
    const isChromeOrEdgeFav = ['书签栏', '收藏夹栏', 'Bookmarks Bar', 'Other Bookmarks'].includes(roots[0].title);
    if (isChromeOrEdgeFav) {
      newChilds = [...roots[0].children, roots[1]];
    }
    // 筛选出文件夹 布局到右边
    const bmLinks = [];
    const bmFolds = [];
    newChilds.forEach(item => {
      if (item.url) {
        bmLinks.push(item);
      } else {
        bmFolds.push(item);
      }
    });
    document.querySelector('#bookmarks').innerHTML = (`
      <div class="left">
        <div class="other">
          <a data-href="chrome://extensions/">扩展</a>
          <a data-href="chrome://bookmarks">书签</a>
        </div>
      </div>
      <div class="right"></div>
    `)
    document.querySelector('#bookmarks .left').append(dumpTreeNodes(bmLinks, query));
    document.querySelector('#bookmarks .right').prepend(dumpTreeNodes(bmFolds, query));
    document.querySelector('#bookmarks').addEventListener('click', async (e) => {
      const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      // chrome.tabs.create({ index: curTab.index + 1, url: e.target.href });
      // return;
      e.preventDefault();
      const targetUrl = e.target.getAttribute('data-href') || e.target.href;
      if (e.target?.tagName === 'A' && targetUrl) {
        curTab.index === 0 ? chrome.tabs.create({ index: curTab.index + 1, url: targetUrl }) : chrome.tabs.update({ url: targetUrl });
      }
    });
    document.querySelector('#bookmarks .right li').addEventListener('mouseover', (evt) => {
      const targetLi = evt.currentTarget;
      const submenu = targetLi.querySelector('ul');
      submenu.style.left = `-${Math.round(targetLi.offsetWidth * 1.3)}px`;
      submenu.style.top = '0px';
    })
  });
}

dumpBookmarks();

chrome.topSites.get(data => {
  console.log('topSites', data);
  document.querySelector('#topSites').innerHTML = data.map(item => (
    `<a title="${item.title}" href="${item.url}">${new URL(item.url).host}</a>`
  )).join('');
});


// https://stackoverflow.com/a/58965134/2190503
// https://stackoverflow.com/a/33523184/2190503
function resizer() {
  var resizer = document.querySelector('#resizerX');
  var sideIframe = document.getElementById('sideIframe');
  const mousemove = (evt) => {
    // return;
    sideIframe.style.width = `${evt.pageX}px`;
  };

  resizer.onmousedown = function () {
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }
  const doDrag = function (evt) {
    if (evt.which != 1) {
      console.log("mouseup");
      stopDrag(evt);
      return;
    }
    // 解决内部有 iframe 时 拖动卡顿 问题
    document.querySelectorAll('iframe').forEach(item => {
      item.style.pointerEvents = 'none';
    });
    mousemove(evt);
  }
  const stopDrag = async function (evt) {
    // console.log("stopDrag(evt)");
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    document.querySelectorAll('iframe').forEach(item => {
      item.style.pointerEvents = 'auto';
    });
    const saveWidth = `${sideIframe.offsetWidth / (window.innerWidth - 12) * 100}%`;
    await hl_utils.setStorage({ hl_sideWidth: saveWidth });
  }
}

const createIfr = (src) => `
  <a class="iframe-title" href="${src}" target="_blank">${src ?? ''}</a>
  <iframe
    ${src ? `src="${src}"` : ''}
    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
  ></iframe>
  ${src ? '' : '<div class="tip">点击选择网址</div>'}
`;

// console.log('new tab page', chrome);
init();
async function init () {
  const sideIframe = document.querySelector('#sideIframe');
  sideIframe.innerHTML = `
  <div class="iframe-wrap">
    ${createIfr('https://warmhug.github.io/aa')}
  </div>
  `;
  resizer();
  const { hl_sideWidth, hl_inject_blankpage = [] } = await hl_utils.getStorage();
  sideIframe.style.width = hl_sideWidth ?? '40%';

  const majorContent = document.querySelector('.major');
  majorContent.insertAdjacentHTML('beforeend', `
    <div class="urls-wrap" style="margin-bottom:4px">
    ${hl_inject_blankpage.map(src => `<a class="urls" style="margin:4px 8px;" href="${src}">${src}</a>`).join('')}
    </div>
    <div class="iframe-wrap">
      ${createIfr()}
    </div>
  `);
  document.querySelectorAll('.major .urls-wrap a').forEach(item => {
    item.addEventListener('click', evt => {
      evt.preventDefault();
      // const iframeWrap = evt.target.closest('.urls-wrap');
      // const curA = evt.target.closest('.urls-wrap > a');
      // const curA = evt.target.nextElementSibling;
      const curUrl = item.getAttribute('href');
      const majorIframe = document.querySelector('.major .iframe-wrap');
      majorIframe.innerHTML = createIfr(curUrl);
    });
  });

  const setUrl = (modal, url) => {
    const iframeWrap = modal.querySelector('.iframe-wrap.google');
    iframeWrap.querySelector('iframe').setAttribute('src', url);
    iframeWrap.querySelector('a').setAttribute('href', url);
    iframeWrap.querySelector('a').innerHTML = url;
  };
  const { modal, toggleModal } = hl_utils.modalBs({
    content: `
      <div class="iframe-wrap google">
        <a class="iframe-title" href="" target="_blank"></a>
        <iframe
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
        >
        </iframe>
      </div>
    `,
    onOpen: () => {
      setUrl(modal, 'https://translate.google.com/?sl=zh-CN&tl=en&op=translate')
    },
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('ssss', request, sender, sendResponse);
    if (request._bg && request.action === 'newTranslateUrl') {
      toggleModal(true);
      setUrl(modal, request.message);
    }
    return true;
  });
}
