# chrome 扩展开发

安装：Chrome输入`chrome://extensions`打开扩展页面，把`blank_ntp`目录拖拽进去，即可安装。

查看安装位置：勾选扩展页面右上角的 `开发者模式`，扩展会显示各自的`extension ID`，进入 mac 的
`~/Library/Application Support/Google/Chrome/Default/Extensions` 目录，根据想要的 id 搜索。

开发教程：[https://developer.chrome.com/extensions/getstarted](https://developer.chrome.com/extensions/getstarted)

## 调试方法：

1. manifest -> background -> scripts 调试位置：打开 `chrome://extensions/` 相应的插件名、点“背景页”。
2. manifest -> content_scripts 设置的 js 位置：“控制台 -> Sources -> Content scripts”
