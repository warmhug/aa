
var ce = {
  getFileContent: function (url, callback) {
    var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = callback; // Implemented elsewhere.
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        // Success!
        callback(xhr.responseText);
      } else {
        // We reached our target server, but it returned an error
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  },
  addScript: function (src,callback) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = callback;
    document.body.appendChild(s);
  },
  addStyle: function (cssText) {
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.appendChild(document.createTextNode(cssText));
    document.getElementsByTagName('head')[0].appendChild(styleNode);
  }
}