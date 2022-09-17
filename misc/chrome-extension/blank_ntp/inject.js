console.log('inject page', chrome);

// 以下直接修改 window 对象无效，原因是 content_scripts 是独立环境执行
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
// https://stackoverflow.com/questions/9515704
// https://stackoverflow.com/questions/12395722
// window.parent = window;
// // debugger
// console.log('after window.parent', window.parent, window.parent === window);

var actualCode = '// Some code example \n' + 
                 'window.xxx = "xxx"';
document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');


if (window !== top) {
  // console.log(document.documentElement.outerHTML);
  console.log('pathname', location.pathname);
  if (location.pathname.indexOf('/drive/') === 0) {
    dealDriveMe();
  } else if (location.pathname.indexOf('/docx/') === 0) {
    cls(() => {
      chrome.runtime.sendMessage({
        title: document.querySelector('.note-title__input').innerHTML || document.title,
        href: location.href,
      }, (response) => {});
    });
  }
}

// 给 drive/me 页面里所有 a 标签加 target 使之能替换当前 tab 页面
function dealDriveMe() {
  const changeATartet = () => {
    [...document.getElementsByTagName('a')].forEach(item => {
      // console.log('exec in iframe', item);
      item.target = '_parent';
      item.addEventListener('click', evt => {
        // alert(22);
        // evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
      });
    });
  };

  // onload 事件之后、页面还没渲染出正确元素
  // window.addEventListener('load', () => {
  //   console.log('onload', document.getElementsByTagName('a'));
  //   changeATartet();
  // });
  // 使用 Performance cls 方法代替 onload 监测 dom 稳定时机
  cls(() => {
    changeATartet();
  });
}
