// alert('每次打开都会执行');
// why console not show?
console.log('when exec?');
(async function () {
  const localData = await chrome.storage.local.get();
  $('#clipTxt').val(localData.hl_clipTxt || '');
})();
