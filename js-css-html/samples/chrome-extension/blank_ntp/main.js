

$('#jokeMain1').click(function () {
  $(this).parent().toggleClass('small')
});

// qrcode text
var qri = $("#qrcode_input");
qri.val(localStorage.getItem('qrtxt') || '');
qri.change(function () {
  localStorage.setItem('qrtxt', $(this).val());
})
$('#gen').click(function () {
  $('#dqr').html('');
  new QRCode($('#dqr')[0], {
    text: qri.val(),
    width: 200,
    height: 200,
    colorDark: "#003450",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
})

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
    return  typeof res === 'string' ? res.trim().replace(/(\r\n|\n|\r)/gm, '<br />') : res;
  };
}

$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  })

  var jr;
  var jokeMain = $('#jokeMain');
  $.ajax({
    url: 'http://localhost:9998/?joke=1',
    dataType: 'json',
    success: (data) => {
      jr = randomItem(data);
      jokeMain.html(jr());
      // jokeMain.html(data[Math.floor(Math.random() * data.length)]);
    }
  })
  $('#changeJoke').click(function () {
    jokeMain.html(jr());
  });
  jokeMain.hide();
  $('#jokeMain1').click(function () {
    jokeMain.toggle();
  })
})
