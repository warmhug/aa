
// 设置 ua 为 iPhone ua
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  if (details.parentFrameId > -1) {
    for (var i = 0, l = headers.length; i < l; ++i) {
      if (headers[i].name == 'User-Agent') {
        headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
      }
    }
  }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);

var switched = true;

$('#showIfr').on('click', function () {
  switched = !switched;
  $(this).velocity(switched ? { opacity: 0.5, width: '/=2', height: '/=2' } : { opacity: 1, width: 80, height: 80 });
  var ifrWrap = $('#ifr-wrap');
  if (switched) {
    $(this).html('hide');
    $.ajax({
      url: "ifr/ifr.html",
      cache: true
    }).done(function(html) {
      ifrWrap.html(html).css('display', 'inline-flex');
      ifrWrap.velocity({ opacity: 1, width: $('#i').width() + 10 }, { duration: 500 })
    });
  } else {
    $(this).html('show');
    ifrWrap.velocity({ opacity: 0, width: 50 }, { duration: 500, complete: function() {
      // alert("Done animating!")
      ifrWrap.html('').css('display', 'none');
    }})
  }
})
.trigger('click');
