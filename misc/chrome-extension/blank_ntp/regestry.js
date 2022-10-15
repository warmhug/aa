console.log('new tab page', chrome);

(async () => {
  const { driveMeUrl } = await getStorage();
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  // 注意: webNavigation listener 在这里注册，当打开或刷新 浏览器其他 tab 页面时，这里都会执行回调。
  // 所以 executeScript 需要传入 curTab.id
  chrome.webNavigation.onDOMContentLoaded.addListener(async details => {
    // console.log('webNavigation', curTab, details);
    const injectionResults = await chrome.scripting.executeScript({
      target: {
        tabId: curTab.id,
        frameIds: [details.frameId]
      },
      func: (tabId) => {
        // alert(2);
        window.hl_extension_data = { tabId };
      },
      args: [curTab.id]
    });
    // console.log('injectionResults', injectionResults);
  });

  if (driveMeUrl) {
    // https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
    // 因为飞书代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
    const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url: driveMeUrl });
    // console.log('cookieStores', cookieStores.value);
    const res = await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [10],
      addRules: [
        {
          "id": 10,
          "priority": 1,
          "action": {
            "type": "modifyHeaders",
            "requestHeaders": [
              { "header": "x-csrftoken", "operation": "set", "value": cookieStores?.value || '' }
            ]
          },
          "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
        }
      ]
    });
    // console.log('dnres', res);
    $('#sideIframe').find('iframe').attr('src', driveMeUrl);
    $('#sideIframe').find('a').attr('href', driveMeUrl).html(driveMeUrl);
  }
})();
