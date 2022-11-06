# chrome 扩展开发

安装：Chrome输入`chrome://extensions`打开扩展页面，把`blank_ntp`目录拖拽进去，即可安装。

查看安装位置：勾选扩展页面右上角的 `开发者模式`，扩展会显示各自的`extension ID`，进入 mac 的
`~/Library/Application Support/Google/Chrome/Default/Extensions` 目录，根据想要的 id 搜索。

调试方法

0. 打开 `chrome://extensions/` 相应的插件名、点“刷新”按钮，点击 `chrome://newtab` 页面的 后退 按钮。
1. manifest -> background -> scripts 打开 `chrome://extensions/` 相应的插件名、点“背景页”。
2. manifest -> content_scripts 设置的 js 位置：“控制台 -> Sources -> Content scripts”

[开发教程](https://developer.chrome.com/extensions/getstarted)


## 其他

开发时生成固定的 [extension_id](https://stackoverflow.com/questions/21497781)、
[crxviewer](https://robwu.nl/crxviewer/)，在不同电脑上安装、打开`chrome://sync-internals/`搜 `hl_` 验证结果。
注意 `chrome.storage.sync` 只存储和同步当前插件的数据，如果卸载插件、则同步的数据立即被删除。


`chrome://newtab` 页面、其他标签页打开的 xxx.com 页面，与其内嵌的 iframe 通信限制方面完全一样、不能跨域访问。包括他们被注入的 content_scripts 在访问跨域iframe时、也一样受到限制。


rules.json 里的 modifyHeaders 修改 responseHeaders 会生效，但是不显示在 Chrome DevTools 里。ref [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=258064)


### 2022-09-17

梳理清楚各个 js 执行的先后顺序。注意 chrome.webRequest 和 chrome.webNavigation 生命周期顺序。


`chrome://newtab` 页面 以 iframe 方式嵌入 xxx.com 页面、并且 注入 content_script 如果在 content_script 里访问 `chrome://newtab` 页面的 `window.xx` (即 `top.xxx`) 则会报错: Uncaught SecurityError: Blocked a frame with origin "https://xxx.com" from accessing a frame with origin "chrome-extension://pbcjojjclbiihmponegploiehianebdk". The frame requesting access has a protocol of "https". 同样 `chrome://newtab` 页面、因为跨域 也不能访问 iframe 里的 xxx.com 页面 window 对象。


override [newtab](https://developer.chrome.com/docs/extensions/mv3/override/) 后的页面是 chrome-extension://pbcjojjclbiihmponegploiehianebdk/blank.html 不能在此页面运行 `chrome.scripting.executeScript` why? https://bugs.chromium.org/p/chromium/issues/detail?id=1191971


chrome.webRequest 和 chrome.webNavigation 都不能获取到 HTTP [Response Body](https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body)


### 2022-09-08

[Overview of Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)

manifest v3 的 csp 策略更加严格，不允许远程 cdn 资源加载。如下 v2 设置

```json
"content_security_policy": "script-src 'self' 'unsafe-eval' https://code.jquery.com https://gw.alipayobjects.com; object-src 'self'",
```

需要去掉 jquery 和 alipayobjects 远程地址。
[mdn csp](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
[edge csp](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/store-policies/csp)

v3 中的 webRequest api 被废弃，改为使用 declarativeNetRequest 来处理请求。声明式 API 使用略微不便。
