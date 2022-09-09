console.log('this inject by my chrome extension');

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
  // 给所有 a 标签加 target 在当页显示，大约3秒后才能渲染出正确元素
  setTimeout(() => {
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
  }, 3000);
}
