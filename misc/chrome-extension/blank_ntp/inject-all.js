// content_scripts 虽然设置了 match_about_blank 和 match_origin_as_fallback
// 但不能在 data:text/html,<html>Hello, World!</html> 这里起作用
// alert(2);
console.log('this is inject all pages');

(function () {

  const cssMap = {
    'https://bytedance.feishu.cn': `
      .list-filler {
        width: 540px !important;
      }
    `,
    'https://zhuanlan.zhihu.com': `
      .ColumnPageHeader-Wrapper {
        display: none!important;
      }
    `,
  };
  const insertCss = content => {
    const style = document.createElement("style")
    style.textContent = content;
    document.head.appendChild(style)
  };
  Object.keys(cssMap).forEach(url => {
    if (location.href.indexOf(url) === 0) {
      insertCss(cssMap[url]);
    }
  });

})();
