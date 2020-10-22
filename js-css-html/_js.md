# JS

代码片段 (笔试题): [codesandbox.io](https://codesandbox.io/s/zpjo211yp) ([codepen.io](https://codepen.io/dashboard/)、[jsfiddle.net](https://jsfiddle.net/user/dashboard/fiddles/))

- 从输入URL到页面加载完成 http://fex.baidu.com/blog/2014/05/what-happen/
- js 算法 https://github.com/trekhleb/javascript-algorithms
- js秘密花园 http://bonsaiden.github.io/JavaScript-Garden/zh/
- 33-js-concepts https://github.com/leonardomso/33-js-concepts
- 只在行首字符是 +、-、[、(、/ 这5种情况下，加前置分号即可。
- lodash 常用函数: throttle / escape / unescape

ECMAScript compatibility http://kangax.github.io/compat-table/es6/、
https://www.chromestatus.com/features、https://webkit.org/、
https://developer.microsoft.com/en-us/microsoft-edge/platform/status/、
https://whatwg-cn.github.io/html/、https://experiments.withgoogle.com/collection/chrome、
http://html5test.com/、https://2018.stateofjs.com、https://2019.stateofcss.com/、
[IE CSS Compatibility](https://msdn.microsoft.com/library/cc351024(VS.85).aspx)、

前端组件设计 http://warmhug.github.io/2018/09/09/components-design-experience.html
前后端通信方法 http://warmhug.github.io/2015/04/17/communication-between-fe-backend.html
基础性能优化方法总结 http://warmhug.github.io/2015/03/31/performance.html
函数式编程入门 http://warmhug.github.io/2015/04/30/functional-programming.html
静态资源版本更新与缓存 http://www.infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part1
一个对前端模板技术的全面总结 http://www.html-js.com/article/2313
开源前端框架纵横谈 http://www.csdn.net/article/2013-04-15/2814893

## 规范
https://github.com/airbnb/javascript
https://eslint.org/
https://github.com/danielstjules/jsinspect
https://github.com/kucherenko/jscpd (vs code: Copy/Paste Detector) https://www.code-inspector.com/


## http 缓存
- Cache-Control 之 no-cache https://www.jianshu.com/p/1744780ddda0
- 200、304 状态图 https://img2018.cnblogs.com/blog/907596/201903/907596-20190302011346217-1805589363.png (文章 https://www.cnblogs.com/kevingrace/p/10459429.html)


## 登录、Cookie、cors 跨域
[CORS 跨域 Cookie 的设置与获取](https://www.jianshu.com/p/13d53acc124f):
对于跨域的 XMLHttpRequest 请求，需要设置withCredentials 属性为 true。
服务端的响应中必须携带 Access-Control-Allow-Credentials: true 首部，服务器不得设置 Access-Control-Allow-Origin 的值为*。

[现在的前端框架全是通过API获得数据，如何记录用户登录状态？](https://www.zhihu.com/question/301253397/answer/547887208) ([user-authentication-with-jwt](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/))


## ES 与 CommonJS modules 的区别
- 静态化，支持静态分析，编译时就能确定模块的依赖关系，以及输入和输出的变量。能支持引入宏（macro）和类型检验（type system）。CommonJS 和 AMD 模块，都只能在运行时确定。
- `import`、`export`可以出现在模块的任何位置，但要处于模块顶层，不能放在块级作用域内。
- CommonJS 模块输出的是一个值的拷贝（输出后不可变），而 ES6 模块输出的是值的引用（输出后可变）。
- ES6 模块支持“循环依赖”，正常输出。CommonJS 模块也支持，但只输出已经执行的部分，还未执行的部分不会输出。


## SPA 实现

- 如果浏览器支持 history API，使用 pjax (pushState + Ajax)
  - 点击一个链接，通过 Ajax 获取页面部分区域数据（向服务器发送一个有PJAX标志(设置在header里)的请求，服务器返回一段相应的html片段）
  - 通过 pushState 修改 URL 和 document.title，并把服务器返回的htm片段插入页面。
  - Github上的文件/目录跳转加载，就是采用 pjax 的方式实现的。
- 如果浏览器不支持 history API，使用 hash 如 [http://example.com#word](http://example.com/#word)
  - 浏览器会把不同的 hash 记录到历史记录中，但需要监听 hash 值的变化。
  - 对于支持 onhashchange 的浏览器，监听此事件；不支持的则要定时去判断hash的变化。
spa 基础问题
- 切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。
- 客户端渲染和服务端渲染，哪个快？
- Batching HTTP Requests to Improve Performance


----

[zeit/swr](https://github.com/zeit/swr)、
[immerjs](https://immerjs.github.io/immer/docs/introduction)、
[蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85)、

Mobx 是基于动态依赖收集来进行状态监听，被一些开发者描述成“状态管理中的jQuery”。

## redux
不可变的数据更新模式 [官方文档](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns) ([翻译](https://cn.redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html))

[解读 redux 的设计思路与用法](http://div.io/topic/1309)、[UI state应该放到哪里？](https://github.com/rackt/redux/issues/595)
[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)、[Reactive programming vs Passive programming](https://vaibhavgupta.me/2017/12/31/reactive-programming-vs-passive-programming/)

- reactive :: Action -> Model -> Model（Model, Side Effects(异步消息)）[elm-architecture](https://github.com/evancz/elm-architecture-tutorial/)
- React.js 本质：`(state, props) => state` (render :: Model -> UI)
- flux 本质：`(state, action) => state` (redux 的 reducer)
   - 不同的 component 维护许多各自不同 state，导致数据碎片化，flux 模式利用顶层 store 能解决这个问题。

### redux 概念

- actions 其实就是 mutations，即 ui 或者 server 的 response。
- action creator 调用 dispatcher (passive)，传递 mutations。
   - dispatcher 是一个 pub-sub systems。
- store 监听 actions 再去 mutate data。
   - Only Store gets to decide how to update the data。
- component 监听 store。Views subscribe to the stores that contain the data that it needs。

### redux & redux-saga 典型流程
form 表单提交，触发 FORM_POST action，saga 里 `yield put` POST_SUCCESS 触发 action，改变页面状态或拉取新数据，触发 UI CHANGE 的 action，过程中用 `yield select` 从 state 里选取需要的参数。


----

## React
生命周期 [图示](https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/)、[react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)、[Reactive Programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)、[build-your-own-react](https://pomb.us/build-your-own-react/)

### Hooks
[frustrations-with-react-hooks](https://blog.logrocket.com/frustrations-with-react-hooks/)、[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)、[react-hooks](https://wattenberger.com/blog/react-hooks)、

### React Fiber
[React Fiber 是什么](https://zhuanlan.zhihu.com/p/26027085)、
[The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)、
[Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
Concurrent 更适用于带有大量长时间渲染并含有富交互的应用。

### PureComponent
[介绍](https://reactjs.org/docs/react-api.html#reactpurecomponent)。相比使用 Component 多了以下代码，避免了 props 和 state 不变时组件的重新渲染（即 render 函数不会执行、也就不会触发 react 内部的 virtual DOM diff、节约了计算）。

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}
```

- 父组件是 pure component，子组件也需要是 pure component。因为父组件的 state 和 props 保持不变时是不会重新渲染的，子组件也就不会重新渲染了。
- 除非碰到了性能问题，不然不要用 PureComponent。遇到性能问题，也可以通过自己定制 shouldComponentUpdate 来控制。
- 如果预期到某个组件的 props 或是 state 会「频繁变动」，那就不用使用 PureComponent，因为这样反而会变慢。示例：
```javascript
render() {
  // 每次传入的 style 都是一个新对象，Post 组件每次都需要 rerender，
  // 不需要使用 PureComponent 会再多一次 props 和 state 的对比。
  return <Post item={item} style={{ 'width': 120 }} />;
}
```

### setState
[3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.o2lwoysxh) 

- setState 是异步的 [state-updates-may-be-asynchronous](https://facebook.github.io/react/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous) / [示例](https://stackoverflow.com/a/45249445/2190503)
- setState 引起不必要的 render。
- setState 不能覆盖所有的组件状态（像生命周期的钩子、timers、events）。

### diff & key

- React.js does not need to have knowledge about what exactly changed. All it needs to know is whether the state changed at all or not.
- While immutability does not provide easier answers to a what exactly changed problem, it provides a great answer to the is it changed at all or not question.
- [虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)
- [Dynamic Children - Why the Keys are Important](http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/)
- 不能在组件内通过 props 获取 key 或 ref。
- React.Children.map 会修改 key, 而 this.props.children.map 不会，参考 demo 示例

dom 对象是很庞大的（上边有很多属性），其创建的开销比较大，已有的 dom 对象上做更新开销并不大，众多框架都在围绕此做优化，比如用`key`是否变化来判断对 dom 的操作是 “更新” 还是 “销毁重建”。
dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。
如果用 dom-api 一步步操作，会导致中间多次的 repaints 和 reflows，这是比较低效耗性能的。
如果放到「虚拟 dom」上操作，会把这三个过程最终的结果，一次更新到实际 dom 树上，只用操作一次实际 dom。
react virtual-dom 里一次 digest 中的 diff 只需一次，但是会随着 ui 的复杂度，性能损耗严重，virtual-dom 与原 dom 的对应也更难 (如果 angular 的脏检查的性能取决与 watcher 的数量，那 react 则是取决与 ui 规模)。 virtual-dom 的内部结构变化是不可预知的

- [真实 DOM 和 react 虚 dom 讨论](http://www.zhihu.com/question/31809713)
- [React Virtual DOM vs Incremental DOM vs Ember’s Glimmer: Fight](https://auth0.com/blog/2015/11/20/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/)

### 处理 children
需要遍历或修改 children，要使用`React.Children.forEach / React.Children.map` 方法，
而不要用`Array.isArray(children) / children.forEach`等方法。
`React.Children.xx`方法里有类似递归调用（详细跟踪React源码里的`traverseAllChildrenImpl`方法）、能自动解析类似这样的 children：

```html
<List.Body>
  <List.Item>收银员</List.Item>
  {[1, 2, 3].map((i, index) => (<List.Item key={index}>运营</List.Item>))}
</List.Body>
```

而自己写的`Array.isArray`等如果不递归解析、就会把上段代码解析错误。


----

## 新技术/标准

Web 前端中的增强现实（AR）开发技术 https://geekplux.com/2018/01/18/augmented-reality-development-tech-in-web-frontend.html


### WebAssembly
介绍：https://juejin.im/entry/5b20d09d6fb9a01e242490b1

- WebAssembly 并不是一门编程语言，而是一份字节码标准。
- 各种复杂的计算：图像处理、3D运算(大型 3D 网页游戏)、语音识别、音视频编码解码。区块链合约。
- React 的 dom diff、RN 对 JavaScriptCore 的使用。
- [madewithwebassembly](https://madewithwebassembly.com/)

案例：eBay 的[条形码扫描](https://www.infoq.cn/article/vc*q7psQqWMaVU8igJeD)、[Google earth web](https://earth.google.com/web/) 版、[autocad](https://web.autocad.com/login) web 版


### PWA / amp
移动 web 体验不太好，开发速度快、一般用来给 app 引流拉新用户，而 native app 体验好、开发速度慢，用来保活。 希望用 pwa + amp 来提升 webapp 体验。[渐进增强的 Web 体验（Progressive Web AMP）](https://zhuanlan.zhihu.com/p/24749809)，[ppt1](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*ggnRRYNZjacAAAAAAAAAAABjARQnAQ)、[ppt2](https://gw.alipayobjects.com/mdn/security_content/afts/img/A*OIPXTaVg9kkAAAAAAAAAAABjARQnAQ)、[ppt3](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*lghFTIKjO-sAAAAAAAAAAABjARQnAQ)、[ppt4](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*bCcKSpjP6WAAAAAAAAAAAABjARQnAQ)。

- [pwa](https://developers.google.com/web/progressive-web-apps/)、[pwabuilder](http://www.pwabuilder.com/)、[amp](https://www.ampproject.org/)、[How AMP achieves its speed - Google I/O 2016](https://www.youtube.com/watch?v=cfekj564rs0)
- [ServiceWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker)、[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) chrome://inspect/#service-workers
- Service Worker 需要运行于 HTTPS 或本地 localhost 环境，是继 Web Worker 后又一个新的线程。来实现离线页面功能。
- Service Worker 是独立于页面的一个运行环境，它在页面关闭后仍可以运行。Web Worker 在页面关闭后不再运行。

### 小程序 & Flutter
[京东 tarojs](https://taro.aotu.io/)、[didi/mpx](https://github.com/didi/mpx)、[remaxjs/remax](https://github.com/remaxjs/remax)。
[flutter_web](https://github.com/flutter/flutter_web)、[aspnet/Blazor](https://github.com/aspnet/Blazor)、[基于 JS 的高性能 Flutter 动态化框架 MXFlutter](https://mp.weixin.qq.com/s/5kIby2EEEldkhnTwIg4KEQ) 

### Web Components
开发组件或写应用，语法比较“古老”不受欢迎（兼容性要求也稍高）
[polymer](https://www.polymer-project.org/)、[lwc.dev](https://lwc.dev/)、[Web Components - building blocks of the future web](https://infinum.co/the-capsized-eight/web-components-building-blocks-of-the-future-web) 
