importScripts('common.js');
importScripts('background-in.js');
// console.log('hl_utils: ', hl_utils);
console.log('bg page, 注意其执行时机', chrome);
// console.log('bg page init no window', window?.document?.title);

chrome.omnibox.setDefaultSuggestion({
  description: '输入中文翻译为英语'
});
// 在地址栏调用 Google 翻译 API 直接搜索
const changeDelay = hl_utils.debounce((text, suggest) => {
  if (text.length <= 1) {
    suggest([]);
    return;
  }
  fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=zh-CN&tl=en&q=' + text)
    .then((response) => response.json())
    .then((data) => {
      const resAry = data?.[0]?.[0];
      if (resAry?.length) {
        suggest([{
          content: `${resAry?.[1]} | ${resAry?.[0]}`,
          deletable: true,
          description: `<dim>中文 ${resAry?.[1]} 英文</dim> <match>${resAry?.[0]}</match> <url>chrome://newtab</url>`
        }]);
      }
    });
}, 900);
// 填入搜索结果到本插件 Google 翻译的 iframe 里，产生搜索记录、方便回顾
const saveResult = async (text) => {
  const cn = text?.split(' | ')?.[0];
  if (!cn) {
    return;
  }
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const newTranslateUrl = `https://translate.google.com/?sl=zh-CN&tl=en&text=${cn}&op=translate`;
  if (curTab.url === 'chrome://newtab/') {
    // 如果打开了 newtab 页面
    chrome.runtime.sendMessage({
      _bg: true,
      action: 'newTranslateUrl',
      message: newTranslateUrl,
    }, (response) => {
      console.log("Receive response in background", response);
    });
  } else {
    chrome.tabs.create({ url: newTranslateUrl, index: curTab.index });
  }
};

let cacheText = '';
chrome.omnibox.onInputCancelled.addListener(() => {
  // console.log('onInputCancelled', cacheText);
  if (cacheText.trim().length) {
    void saveResult(cacheText);
  }
});
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // console.log('change', text);
  cacheText = text;
  return changeDelay(text, suggest);
});
chrome.omnibox.onInputEntered.addListener(saveResult);
chrome.omnibox.onDeleteSuggestion.addListener((text) => {
  // console.log('onDeleteSuggestion', text, cacheText);
});
chrome.omnibox.onInputStarted.addListener((text) => {
  // console.log('onInputStarted', text, cacheText);
});

chrome.tabs.onCreated.addListener(async (tabInfo) => {
  console.log('onCreated tabInfo: ', tabInfo);
  // 在 地址栏搜索 并按住 CMD+Enter 后打开的 tab 移动到在当前 tab 右边
  const searchEngines = ['google.com', 'bing.com', 'baidu.com'];
  const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tabInfo.active && searchEngines.some(item => tabInfo.pendingUrl?.indexOf(item) > -1)) {
    await chrome.tabs.move(tabInfo.id, { index: curTab.index + 1 });
  }
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('onUpdated tabs: ', tabId, changeInfo, tab.url);
  const { hl_inject_auto = [] } = await hl_utils.getStorage();
  // 自动注入代码
  hl_inject_auto.forEach(async (url, idx) => {
    const queryTabs = await chrome.tabs.query({ url: url });
    console.log('queryTabs: ', queryTabs);
    queryTabs.forEach(async (qTab) => {
      if (qTab.id = tabId) {
        const { css = '', ...rest } = hl_inject_auto_params[idx];
        await chrome.scripting.insertCSS({ target: { tabId }, css });
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId },
          ...rest,
        });
        console.log('auto injectionResults: ', injectionResults);
      }
    });
  });
});


let clipText;
let aiChatNew = false;
async function aiChat() {
  const { hl_inject_ai = [] } = await hl_utils.getStorage();
  hl_inject_ai.forEach(async (url, idx) => {
    const targetTab = await hl_utils.createOrUpdateTab(url, aiChatNew);
    const tabId = targetTab.id;
    if (targetTab.index > 6) {
      await chrome.tabs.move(tabId, { index: 0 });
    }
    try {
      const injectionResults = await chrome.scripting.executeScript({
        ...hl_inject_ai_params[idx],
        target: { tabId },
        args: [clipText],
      });
      console.log('autoInject: ', url, injectionResults);
    } catch (error) {
      console.log('executeScript error: ', url, error);
    }
  });
  aiChatNew = false;
};

// 开启定时任务
hl_utils.cron(null, () => {
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'aiChat') {
    clipText = request.clipText;
    aiChat();
    sendResponse({ action: request.action, result: '调用 aiChat 成功' });
  }
  return true;
});

function openPopup (text = 'popup', cb = () => {}) {
  chrome.action.openPopup();
  chrome.action.setBadgeText({ text });
  setTimeout(() => {
    cb();
    chrome.action.setBadgeText({ text: '' });
  }, 1000);
}

// 注册和使用快捷键 https://developer.chrome.com/docs/extensions/reference/commands
// chrome://extensions/shortcuts
chrome.commands.onCommand.addListener((command) => {
  openPopup(command, () => {
    if (command === 'aiChatNew') {
      aiChatNew = true;
    }
    if (command === 'aiChat') {
      chrome.runtime.sendMessage({
        _bg: true, action: command,
      }, (response) => {
        // 需要等 popup 页面获取到内容，这里才能收到消息
        console.log("Receive response in background", response);
        if (response?.action === command && response?.clipText) {
          clipText = response.clipText;
          aiChat();
        }
      });
    }
  });
});
