// console.log('bg page', chrome.extension.getBackgroundPage());

$('#jokeMain1').click(function () {
  $(this).parent().toggleClass('small')
});

// 输入框本地存储
var textID = $("#textID");
textID.val(localStorage.getItem('textLocal') || '');
textID.change(function () {
  localStorage.setItem('textLocal', $(this).val());
});

function randomItem(arr) {
  var original = arr;
  var remainder;
  return function () {
    // console.log(remainder && remainder.length)
    if (!(remainder && remainder.length)) {
      remainder = original.slice();
    }
    var res = remainder.splice(Math.random() * remainder.length | 0, 1)[0];
    // console.log(res)
    return typeof res === 'string' ? res.trim().replace(/(\r\n|\n|\r)/gm, '<br />') : res;
  };
}

$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  });

  var jr;
  var jokeMain = $('#jokeMain');
  var res = [];
  ['_师说', '__书影'].forEach(file => $.ajax({
    // 在 _joke 文件夹里启动 node server
    // url: 'http://localhost:9998/?joke=1'
    url: `http://localhost:9998/${file}.txt`,
    // dataType: 'json',
    success: (data) => {
      res = res.concat(data.split('\n\n'))
      jr = randomItem(res);
      jokeMain.html(jr());
    }
  }))
  $('#changeJoke').click(function () {
    jokeMain.html(jr());
  });
  jokeMain.hide();
  $('#jokeMain1').click(function () {
    jokeMain.toggle();
  })
})
