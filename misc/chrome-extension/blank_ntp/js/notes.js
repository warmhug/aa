// get local ip https://github.com/dlo83/local-ip-chrome-extension
function getLocalIPs(callback) {
  var ips = [];
  var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel('');
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
  const dbKey = 'ce_fileContent';
  let ctFromDb;
  const getContents = async () => {
    try {
      // https://web.dev/file-system-access/  get set 方法来自 idb-keyval@5.0.2 操作 IndexedDB
      const fileHandleOrUndefined = await get(dbKey);
      if (fileHandleOrUndefined) {
        return fileHandleOrUndefined;
      }
    } catch (error) { alert(error.name, error.message); }
  }
  document.getElementById('notesLoad').addEventListener('click', async () => {
    if (ctFromDb && window.confirm('使用 IndexedDB 里的内容？')) {
      return;
    }
    const filesHandle = await window.showOpenFilePicker({
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: true
    });
    const fileContents = await Promise.all(filesHandle.map(async (fileHandle) => {
      const file = await fileHandle.getFile();
      const contents = await file.text();
      // console.log('ccc', contents);
      return contents;
    }));
    try {
      await set(dbKey, fileContents.join());
      alert('选择的内容写入 IndexedDB 成功');
      // location.reload();
    } catch (error) { alert(error.name, error.message); }
  });

  var jr;
  var notesText = $('#notesText');
  getContents().then(res => {
    if (!res) {
      return;
    }
    ctFromDb = res;
    jr = randomItem(res.split('\n\n'));
    notesText.html(jr());
  });

  $('#changeNote').click(function () {
    notesText.html(jr());
  });
  notesText.hide();
  $('#notesImg').click(function () {
    notesText.toggle();
    $(this).toggleClass('small');
  });

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
