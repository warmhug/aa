// 2022-01-16 from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/mv2-archive/api/bookmarks/basic/popup.js

// console.log('cb', chrome.bookmarks);

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    var anchor = $('<a>');
    anchor.attr('href', bookmarkNode.url);
    anchor.attr('title', bookmarkNode.title);
    anchor.on('click', () => {
      if (bookmarkNode.url.indexOf('chrome://') === 0) {
        chrome.tabs.create({url: bookmarkNode.url});
      }
    })
    let formatTitle = bookmarkNode.title;
    if (bookmarkNode.title.length > 60) {
      formatTitle = bookmarkNode.title.substring(0, 60) + '...';
    }
    anchor.text(formatTitle);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    anchor.click(function() {
      // chrome.tabs.create({url: bookmarkNode.url});
    });
    anchor.prepend(`<img src="chrome://favicon/${bookmarkNode.url}" />`);
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
  var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    console.log('bookmarkTreeNodes', bookmarkTreeNodes);
    let newChilds = [];
    const roots = bookmarkTreeNodes[0].children;
    const isChromeOrEdgeFav = ['书签栏', '收藏夹栏'].includes(roots[0].title);
    if (isChromeOrEdgeFav) {
      newChilds = [...roots[0].children, roots[1]];
    }
    const bms = dumpTreeNodes(newChilds, query);
    $('#bookmarks').prepend(bms);
    // https://api.jqueryui.com/menu/
    bms.menu({
      // position: { my: "left top", at: "right-5 top+5" }
    });
  });
}

$(function () {
  dumpBookmarks();
  $('#bkManager, #setting').click((e) => {
    // console.log('ttt', this, e.target.textContent);
    chrome.tabs.create({url: e.target.href});
  });
});