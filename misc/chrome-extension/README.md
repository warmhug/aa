# chrome 扩展开发

安装：Chrome输入`chrome://extensions`打开扩展页面，把`blank_ntp`目录拖拽进去，即可安装。

查看安装位置：勾选扩展页面右上角的 `开发者模式`，扩展会显示各自的`extension ID`，进入 mac 的
`~/Library/Application Support/Google/Chrome/Default/Extensions` 目录，根据想要的 id 搜索。

调试方法

1. manifest -> background -> scripts 调试位置：打开 `chrome://extensions/` 相应的插件名、点“背景页”。
2. manifest -> content_scripts 设置的 js 位置：“控制台 -> Sources -> Content scripts”

## 其他

[开发教程](https://developer.chrome.com/extensions/getstarted)

- in background pages (v3 变为 service works): onMessage
- in content script: sendMessage

### 2022-09-08

[Overview of Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)

manifest v3 的 csp 策略更加严格，不允许远程 cdn 资源加载。如下 v2 设置

```json
"content_security_policy": "script-src 'self' 'unsafe-eval' https://code.jquery.com https://gw.alipayobjects.com; object-src 'self'",
```

需要去掉 jquery 和 alipayobjects 远程地址。

v3 中的 webRequest api 被废弃，改为使用 declarativeNetRequest 来处理请求。声明式 API 使用略微不便。
