
// 设置 ua 为 iPhone ua
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  if (details.parentFrameId > -1) {
    for (var i = 0, l = headers.length; i < l; ++i) {
      if (headers[i].name == 'User-Agent') {
        headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
      }
    }
  }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);

// remove the X-Frame-Options header to allow inlining pages within an iframe.
chrome.webRequest.onHeadersReceived.addListener(function(info) {
    var headers = info.responseHeaders;
    for (var i=headers.length-1; i>=0; --i) {
      var header = headers[i].name.toLowerCase();
      // console.log(headers, 'xxxx');
      if (header == 'x-frame-options' || header == 'frame-options' || header.indexOf('content-security-policy') > -1) {
        headers.splice(i, 1); // Remove header
      }
    }
    return {responseHeaders: headers};
  },
  {
    urls: [ '*://*/*' ], // Pattern to match all http(s) pages
    types: [ 'sub_frame' ]
  },
  ['blocking', 'responseHeaders']
);

var hidden = localStorage.getItem('show') ? false : true;

$('#showIfr').on('click', function () {
  hidden = !hidden;
  $(this).velocity(hidden ? { opacity: 0.5, width: '/=2', height: '/=2' } : { opacity: .7, width: 80, height: 80 });
  var ifrWrap = $('#ifr-wrap');
  if (hidden) {
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
