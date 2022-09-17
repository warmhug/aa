console.log('new tab page', chrome);

const drivePrefix = 'https://bytedance.feishu.cn/drive/';
const docxPrefix = 'https://bytedance.feishu.cn/docx/';

(async () => {
  // programmatically injected content_scripts
  const rcs = await chrome.scripting.getRegisteredContentScripts();
  // console.log('rcs', rcs);
  const id = '1';
  if (!rcs.find(item => item.id === id)) {
    await chrome.scripting.registerContentScripts([{
      id,
      js: ['lib/cls.js', 'inject.js'],
      matches: [`${drivePrefix}*`, `${docxPrefix}*`],
      // matches: ["https://www.baidu.com/", "<all_urls>"],
      allFrames: true,
      runAt: 'document_idle',
    }]);
    // console.log('register success');
  }

  // https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
  // 因为代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
  const url = `${drivePrefix}me`;
  const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url });
  // console.log('cookieStores', cookieStores.value);
  const res = await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [3, 4],
    addRules: [
      {
        "id": 4,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            // { "header": "aatest", "operation": "set", "value": cookieStores.value },
            { "header": "x-csrftoken", "operation": "set", "value": cookieStores.value }
          ]
        },
        "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
      }
    ]
  });
  // console.log('dnres', res);
  $('#ifr').attr('src', url);

  editorFn(JSON.stringify([
    ['', ''],
    [docxPrefix + 'doxcn2EDJtEmqNmb6uVnJ5MTUbc', ''],
    [docxPrefix + 'doxcnL8nSmUoRzFpuQc9Dwm5Wqe', ''],
    [docxPrefix + 'doxcnSCX57RMgHoglsT8S3bM4xe', ''],
  ]));

})();

