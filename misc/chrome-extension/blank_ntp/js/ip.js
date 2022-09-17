// get local ip https://github.com/dlo83/local-ip-chrome-extension
function getLocalIPs(callback) {
  var ips = [];

  var RTCPeerConnection = window.RTCPeerConnection ||
    window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

  var pc = new RTCPeerConnection({
    // Don't specify any stun/turn servers, otherwise you will
    // also find your public IP addresses.
    iceServers: []
  });
  // Add a media line, this is needed to activate candidate gathering.
  pc.createDataChannel('');

  // onicecandidate is triggered whenever a candidate has been found.
  pc.onicecandidate = function (e) {
    if (!e.candidate) { // Candidate gathering completed.
      pc.close();
      callback(ips);
      return;
    }
    var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
    if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
      ips.push(ip);
  };
  pc.createOffer(function (sdp) {
    pc.setLocalDescription(sdp);
  }, function onerror() { });
}


$(function () {

  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  });
  getLocalIPs(function (ips) { // local IP addresses.
    localIP = 'http://' + ips[0] + '';
    $('#ip').html(localIP).attr('href', localIP);
    new QRCode(document.getElementById("qrcode"), {
      text: localIP,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  });

});