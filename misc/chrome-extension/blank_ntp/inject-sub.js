document.addEventListener('hl_extension_message', (event) => {
  // console.log('eddd', event.detail, event.path);
  // 这里的 window 和 inject.js 里的 window 不是同一个
  // console.log('hl_extension_util', window.hl_extension_util);
  eval(event.detail?.jsFn || '');
});
