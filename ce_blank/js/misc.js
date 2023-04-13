$(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('msg bg aa', request, sender, location.href);
    if (request._bg && request.newTranslateUrl) {
      // 来自 Google translate 消息
      setHtml(request.newTranslateUrl)
    }
    return true;
  });

  const setHtml = url => {
    $('#translateModal').find('iframe').attr('src', url);
    $('#translateModal').find('a').attr('href', url).html(url);
  };
  setHtml('https://translate.google.com/?sl=zh-CN&tl=en&op=translate');

  $('body').dblclick(() => {
    $("#translateModal").modal('toggle');
  });
});
