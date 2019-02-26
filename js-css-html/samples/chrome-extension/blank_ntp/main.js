

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


$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  })
})
