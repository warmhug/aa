
// 在 popup 页面右键 查看元素 看控制台
console.log('when exec?');
// alert('每次打开都会执行');

// 防止休眠或屏幕关闭
// https://chrome.google.com/webstore/detail/keep-computer-awake-for-a/imbpigcghoambmanjekibelfjemnnool
$(async function() {
  const localData = await chrome?.storage?.local.get();
  const html = (localData?.hl_clipTxt || '').replace(/[\n\r]/g, '<br>');
  $('#clipTxt').html(html);

  const powerMode = localData?.hl_power || 'default';
  $('#powerOps input[type="radio"]').filter('[value="' + powerMode + '"]').attr('checked', true);
  $('#powerOps input[type="radio"]').change(async function(e) {
    console.log('ee', e.target);
    switch (e.target.value) {
      case 'display':
      case 'system':
        chrome?.power?.requestKeepAwake(e.target.value);
        await chrome?.storage?.local.set({ hl_power: e.target.value });
        break;
      default:
        chrome?.power?.releaseKeepAwake();
        await chrome?.storage?.local.set({ hl_power: '' });
        break;
    }
  });

  // chrome.power.reportActivity(() => {
  //   console.log('reportActivity');
  // });
});
