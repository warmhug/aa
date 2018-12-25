
# pwa amp

移动 web 体验不太好，开发速度快、一般用来给 app 引流拉新用户，而 native app 体验好、开发速度慢，用来保活。
希望用 pwa + amp 来提升 webapp 体验。

## amp

- https://www.ampproject.org/
- [How AMP achieves its speed - Google I/O 2016](https://www.youtube.com/watch?v=cfekj564rs0)

## [pwa](https://developers.google.com/web/progressive-web-apps/)

[渐进增强的 Web 体验（Progressive Web AMP）](https://zhuanlan.zhihu.com/p/24749809)、
[pwabuilder](http://www.pwabuilder.com/)

优点：优雅降级、渐进增强，Web App 的进化方向。
缺点：浏览器支持问题（Safari 目前不考虑）；用户习惯、短期难培养。

### serviceWorker

- https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker / 
https://developer.mozilla.org/en-US/docs/Web/API/Cache
- [chrome://serviceworker-internals/](chrome://serviceworker-internals/) / [chrome://inspect/#service-workers](chrome://inspect/#service-workers)


- 需要运行于 HTTPS 或 本地 localhost 环境，是继 Web Worker 后又一个新的线程。来实现离线页面功能。
- Service Worker 是独立于页面的一个运行环境，它在页面关闭后仍可以运行。Web Worker 在页面关闭后不再运行。
- Service Worder 在安装（install）和激活(activate)后，关闭网络再次打开页面，资源的获取途径是“from ServiceWorker”
