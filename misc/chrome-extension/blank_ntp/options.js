//
console.log('options.js running');

// 如果 URL 中含有多个 中文字符 解码可能会错误。统一用 decodeURIComponent 解码、再对比
let tabIframes = [
  // [['http://localhost/a.html'], '工具'],
  [[
    'https://translate.google.com/?sl=zh-CN&tl=en&op=translate',
    chrome.runtime.getURL('assets/mytool/index.html'),
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
    css: `.sidebar-mouse-in-out, header.sc-gsDJrp, .sc-fIoroj, .sc-eJwXpk, div[data-sel="explorer-v3-folder-list"] { display: none!important; }`,
    js: `;(() => {
      // 隐藏部分内容
      // console.log('eeeeeee');
      // 给 drive/me 页面里所有 a 标签加 target 使之能替换当前 tab 页面 [...document.getElementsByTagName('a')]
      document.querySelectorAll('a').forEach((item) => {
        item.target = '_parent';
        item.addEventListener('click', (evt) => {
          // evt.preventDefault();
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
      // 修改 百度框计算 结果样式
      const showSpecialEle = (ele) => {
        if (!ele) return;
        // console.log('ccc', ele, document.body.children);
        ele.parentNode.removeChild(ele);
        document.body.appendChild(ele);
        [...document.body.children].forEach(item => {
          if (item !== ele) {
            item.style.display = 'none';
          } else {
            ele.style.margin = '10px 0 0 30px';
          }
        });
      }
      showSpecialEle(document.querySelector('[srcid="51044"]'));
      showSpecialEle(document.querySelector('[srcid="5601"]'));
    })();`
  },
};

const driveMeUrl = `https://bytedance.feishu.cn/drive/me`;
setStorage({ driveMeUrl });

document.querySelector('.inject_pages').value = JSON.stringify(injectPages);
setStorage({ injectPages: JSON.stringify(injectPages) });
document.querySelector('.inject_pages').addEventListener('input', (e) => setStorage({ injectPages: e.target.value }));

document.querySelector('.blank_page_iframes').value = JSON.stringify(tabIframes);
setStorage({ tabIframes: JSON.stringify(tabIframes) });
document.querySelector('.blank_page_iframes').addEventListener('input', (e) => setStorage({ tabIframes: e.target.value }));
