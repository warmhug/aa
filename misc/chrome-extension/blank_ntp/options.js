//
console.log('options.js running');

// 如果 URL 中含有多个 中文字符 解码可能会错误。统一用 decodeURIComponent 解码、再对比
let tabIframes = [
  // [['http://localhost/a.html'], '工具'],
  [[
    chrome.runtime.getURL('assets/mytool/index.html'),
    'https://translate.google.com/?sl=zh-CN&tl=en&op=translate',
    [
      // decodeURIComponent('https://www.google.com/search?q=%E8%AE%A1%E7%AE%97%E5%99%A8'),
      decodeURIComponent(`https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86`),
      decodeURIComponent(`https://www.baidu.com/s?wd=%E8%AE%A1%E7%AE%97%E5%99%A8`)
    ]
  ], '工具'],
  ['https://bytedance.feishu.cn/messenger/', '消息'],
  ['https://bytedance.feishu.cn/docx/doxcnSCX57RMgHoglsT8S3bM4xe', ''],
  ['https://bytedance.feishu.cn/docx/doxcn2EDJtEmqNmb6uVnJ5MTUbc', ''],
  ['https://bytedance.feishu.cn/docx/doxcnL8nSmUoRzFpuQc9Dwm5Wqe', ''],
];

const injectPages = {
  'https://bytedance.feishu.cn': {
    css: `
      .list-filler {
        width: 540px !important;
      }
    `,
  },
  'https://zhuanlan.zhihu.com': {
    css: `
      .ColumnPageHeader-Wrapper {
        display: none!important;
      }
    `,
  },
  'https://bytedance.feishu.cn/drive/me': {
    blankPageOnly: true,
    css: `
      .sidebar-mouse-in-out {
        display: none!important;
      }
      .sc-gsDJrp, .sc-iqVVwt {
        height: 0!important;
        visibility: hidden;
      }
    `,
    js: `;(() => {
      /*
      给 drive/me 页面里所有 a 标签加 target 使之能替换当前 tab 页面 [...document.getElementsByTagName('a')]
      */
      document.querySelectorAll('a').forEach((item) => {
        item.target = '_parent';
        item.addEventListener('click', (evt) => {
          evt.stopPropagation();
          evt.stopImmediatePropagation();
        });
      });
    })();`
  },
  'https://www.baidu.com/s?': {
    blankPageOnly: true,
    css: ``,
    js: `;(() => {
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
      showSpecialEle(document.querySelector('[srcid="51044"]'));
      showSpecialEle(document.querySelector('[srcid="5601"]'));
    })();`
  },
};

const driveMeUrl = `https://bytedance.feishu.cn/drive/me`;
setStorage({ driveMeUrl });

document.querySelector('.inject_pages').value = JSON.stringify(injectPages, null, 2).replace(/\\n/g, '\n');
setStorage({ injectPages: JSON.stringify(injectPages, null, 2) });
document.querySelector('.inject_pages').addEventListener('input', (e) => setStorage({ injectPages: e.target.value.replace(/\n/g, "") }));

document.querySelector('.blank_page_iframes').value = JSON.stringify(tabIframes, null, 2);
setStorage({ tabIframes: JSON.stringify(tabIframes, null, 2) });
document.querySelector('.blank_page_iframes').addEventListener('input', (e) => setStorage({ tabIframes: e.target.value }));
