console.log('inject page, ISOLATED window object', chrome, urlsMap);

// 以下直接修改 window 对象无效，原因是 content_scripts 是独立环境执行
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
// https://stackoverflow.com/questions/9515704
// https://stackoverflow.com/questions/12395722
// window.parent = window;
// window.top = window;
// https://developer.mozilla.org/en-US/docs/Web/API/Window
// window 对象的 parent top 属性都是 只读 的。

var iScript = document.createElement('script');
// csp 限制不能 eval 代码
// iScript.textContent = 'console.log(window);';
// 需要在 manifest 里设置 web_accessible_resources 才能把 chrome-extension://*.js 注入到各个页面里
iScript.src = chrome.runtime.getURL('inject-sub.js');
(document.head||document.documentElement).appendChild(iScript);
iScript.onload = function() {
  iScript.remove();
};


if (location.href.indexOf(urlsMap.icloud) === 0) {
  console.log('window?.filterMainJs', window?.filterMainJs, window.top === window);
}

if (window !== top) {

  if (location.href.indexOf(urlsMap.drive) === 0) {
    // 给 drive/me 页面里所有 a 标签加 target 使之能替换当前 tab 页面
    cls(() => {
      [...document.getElementsByTagName('a')].forEach(item => {
        item.target = '_parent';
        item.addEventListener('click', evt => {
          // evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
        });
      });
    });
  }

  if (location.href.indexOf(urlsMap.docx) === 0) {
    cls(() => {
      // extensions cannot send messages to content scripts using this method.
      chrome.runtime.sendMessage({
        title: document.querySelector('.note-title__input')?.innerHTML || document.title,
      }, (response) => {});
    });
  }

  if (location.href.indexOf(urlsMap.bd) === 0) {
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
    cls(() => {
      showSpecialEle(document.querySelector('[srcid="51044"]'));
      showSpecialEle(document.querySelector('[srcid="5601"]'));
    });
  }

}
