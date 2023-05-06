console.log('options.js running');

const bdJs = `;(() => {
  const showSpecialEle = (ele) => {
    if (!ele) return;
    ele.parentNode.removeChild(ele);
    document.body.appendChild(ele);
    [...document.body.children].forEach(item => {
      if (item !== ele) {
        item.style.display = 'none';
      } else {
        ele.style.margin = '10px 0 0 30px';
      }
    });
  };
  console.log('inj bdjs', window.hl_extension_data, window.parent === window.top);
  showSpecialEle(document.querySelector('[srcid="51044"]'));
  showSpecialEle(document.querySelector('[srcid="5601"]'));
  window.postMessage(JSON.stringify({
    _ext: true,
    _url: location.href,
    scrollHeight: document.body.scrollHeight,
  }), '*');
})();`

const feishuDocsJs = `;(() => {
  const checkEle = (selector, cb = () => {}) => {
    let ele, timeout = 8000, startTime = Date.now();
    const check = () => {
      ele = document.querySelector(selector);
      if (!ele && Date.now() - startTime < timeout) {
        setTimeout(check, 200);
      } else if (ele) {
        cb(ele);
      }
    };
    check();
  };
  if (window !== top) {
    checkEle('.note-title__input', (ele) => {
      window.postMessage(JSON.stringify({
        _ext: true,
        _url: location.href,
        title: ele.innerHTML,
      }), '*');
    });
  }
})();`


// 如果 URL 中含有多个 中文字符 解码可能会错误。统一用 decodeURIComponent 解码、再对比
const injectSites = {
  'https://bytedance.feishu.cn': {
    allPage: true,
    css: `
      .list-filler {
        width: 540px !important;
      }
    `,
  },
  'https://zhuanlan.zhihu.com': {
    allPage: true,
    css: `
      .ColumnPageHeader-Wrapper {
        display: none!important;
      }
    `,
  },
  'https://translate.google.com/': {
    css: `
      body {
        overflow: hidden!important;
      }
    `,
  },
  'https://bytedance.feishu.cn/docx/PmUMdEzWhovDajxojqDcIQwpn8f': {
    tabIdx: '0.0',
    css: `
      .navigation-bar-wrapper, .bidirection-link-list, .global-like-wrap, .docx-global-comment,
      .page-block-header .page-block-content, .docx-comment__first-comment-btn, .gpf-biz-help-center__button-group {
        display: none;
      }
    `,
    js: `;(() => {
      window.postMessage(JSON.stringify({
        _ext: true,
        _url: location.href,
        scrollHeight: 1300,
      }), '*');
    })();`
  },
  // 'https://translate.google.com/?sl=zh-CN&tl=en&op=translate': {
  //   tabIdx: '0.1',
  //   js: `;(() => {
  //     window.postMessage(JSON.stringify({
  //       _ext: true,
  //       _url: location.href,
  //       scrollHeight: document.body.scrollHeight * 0.6,
  //     }), '*');
  //   })();`,
  //   css: `
  //     body {
  //       overflow: hidden!important;
  //     }
  //   `,
  // },
  [chrome.runtime.getURL('assets/mytool/index.html')]: {
    tabIdx: '0.2',
  },
  [decodeURIComponent(`https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86`)]: {
    tabIdx: '0.3.0',
    js: bdJs,
  },
  [decodeURIComponent(`https://www.baidu.com/s?wd=%E8%AE%A1%E7%AE%97%E5%99%A8`)]: {
    tabIdx: '0.3.1',
    js: bdJs,
  },
  'https://bytedance.feishu.cn/docx/doxcn2EDJtEmqNmb6uVnJ5MTUbc': {
    tabIdx: '1',
    js: feishuDocsJs,
  },
  'https://bytedance.feishu.cn/drive/me/': {
    rightSideOfPage: true,
    css: `
      .sidebar-mouse-in-out {
        display: none!important;
      }
    `,
    js: `;(() => {
      /*
      给 drive/me 页面里所有 a 标签加 target 使之能替换当前 tab 页面
      document.querySelectorAll('a').forEach((item) => {
        item.target = '_parent';
        item.addEventListener('click', (evt) => {
          evt.stopPropagation();
          evt.stopImmediatePropagation();
        });
      });
      */
    })();`
  },
};

async function setOpt(ele, key, val) {
  const remoteData = await hl_extension_util.getStorage();
  if (!remoteData[key]) {
    hl_extension_util.setStorage({ [key]: JSON.stringify(val, null, 2) });
  }
  ele.value = (remoteData[key] || JSON.stringify(val, null, 2)).replace(/\\n/g, '\n');
  ele.addEventListener('input', (e) => {
    hl_extension_util.setStorage({ [key]: (e.target.value).replace(/\n/g, "") });
  });
}
setOpt(document.querySelector('.injectSites'), 'hl_injectSites', injectSites);

document.querySelector('#clearData').addEventListener('click', async () => {
  const remoteData = await hl_extension_util.getStorage();
  console.log('remoteData', JSON.stringify(remoteData, null, 2).replace(/\\n/g, '\n'));
  if (window.confirm('检查文本框或打开 console 确认要删除的数据')) {
    const removeRes = await hl_extension_util.removeStorage();
    console.log('removeRes', removeRes);
    location.reload();
  }
});
