console.log('new tab page', chrome);

(async () => {
  // programmatically injected content_scripts
  // 注意：先注册到相应域 后让页面加载 才会执行先注册的 js
  const rcs = await chrome.scripting.getRegisteredContentScripts();
  const id = '1';
  if (!rcs.find(item => item.id === id)) {
    await chrome.scripting.registerContentScripts([{
      id,
      allFrames: true,
      matchOriginAsFallback: true,
      // matches: ["<all_urls>"],
      matches: Object.values(urlsMap).map(item => `${item}*`),
      runAt: 'document_start',
      // world: 'MAIN', // 默认是 ISOLATED 改变设置会影响 chrome.runtime.sendMessage
      js: ['lib/cls.js', 'constants.js', 'inject.js'],
    }]);
    // console.log('register success');
  }

  // https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
  // 因为代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
  const url = `${urlsMap.drive}me`;
  const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url });
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
            // { "header": "aatest", "operation": "set", "value": cookieStores.value },
            { "header": "x-csrftoken", "operation": "set", "value": cookieStores?.value || '' }
          ]
        },
        "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
      }
    ]
  });
  // console.log('dnres', res);
  $('#sideIframe').attr('src', url);

})();
