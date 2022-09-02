// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

// console.log('cb', chrome.bookmarks);

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    // html 0宽字符: U+200B  U+200C  U+200D   U+FEFF  &zwnj;&ZeroWidthSpace;&#xFEFF
    // 使用 正则替换、jQuery 的 html() 方法处理 都没效果。
    let formatTitle = bookmarkNode.title
      // .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // console.log('unicode', formatTitle, formatTitle.length, formatTitle.charAt(0));
    // formatTitle = $('<div />').html(formatTitle).text();
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
    var anchor = $('<a>');
    anchor.attr('href', bookmarkNode.url);
    anchor.attr('title', bookmarkNode.title);
    anchor.text(formatTitle);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    // anchor.on('click', () => { });
    anchor.click(function() {
      if (bookmarkNode.url?.indexOf('chrome://') === 0) {
        chrome.tabs.create({url: bookmarkNode.url});
      }
    });
    // chrome://bookmarks 打开控制台 查找文件夹图标 chrome://bookmarks/images/folder_open.svg
    const iconUrl = bookmarkNode.url ? 
      `chrome://favicon/${bookmarkNode.url}` : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVGNCI+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=';
    anchor.prepend(`<img src="${iconUrl}" />`);
  }
  // console.log('bookmarkNode.title', bookmarkNode.title, bookmarkNode.children);
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(anchor);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}
function dumpBookmarks(query) {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    console.log('bookmarkTreeNodes', bookmarkTreeNodes);
    let newChilds = [];
    const roots = bookmarkTreeNodes[0].children;
    const isChromeOrEdgeFav = ['书签栏', '收藏夹栏'].includes(roots[0].title);
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
    // for back
    // const bms = dumpTreeNodes(newChilds, query);
    // $('#bookmarks').prepend(bms);
    // // https://api.jqueryui.com/menu/
    // bms.menu({
    //   // position: { my: "left top", at: "right-5 top+5" }
    // });
    $('#bookmarks').prepend(dumpTreeNodes(bmLinks, query));
    $('#bmright').prepend(dumpTreeNodes(bmFolds, query).menu());
  });
}

$(function () {
  dumpBookmarks();
  $('#bkManager, #setting').click((e) => {
    // console.log('ttt', this, e.target.textContent);
    chrome.tabs.create({url: e.target.href});
  });
});