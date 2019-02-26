chrome.webRequest.onBeforeRequest.addListener(function (details) { 
  console.log(details)
  if (details.url === "https://img.alicdn.com/tps/TB17ghmIFXXXXXAXFXXXXXXXXXX.png") {
    alert('block');
    return { cancel: true };
  }
  return { cancel: false };
}, {urls: ["<all_urls>"]}, ["blocking"]);