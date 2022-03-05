
# react
> antd-mobile 旧 demo 备份
> - antd_custom_ui move from https://github.com/warmhug/__/tree/master/_react/antd_custom_ui to > https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui
> - antd-mobile + TypeScript move from https://github.com/warmhug/__/tree/master/_react/antd-ts > to https://github.com/ant-design/antd-mobile-samples/tree/master/web-typescript


## redux & react

- React Hooks 使用误区 https://zhuanlan.zhihu.com/p/450513902
- 不优雅的 React Hooks https://zhuanlan.zhihu.com/p/455317250
- 陷阱 https://mp.weixin.qq.com/s?__biz=MzIzMjcxNzE5MA==&mid=2247488097&idx=1&sn=e8a6d71d1c05c8be04c25b32af43fb09
- useLayoutEffect和useEffect的区别 https://zhuanlan.zhihu.com/p/348701319

https://beta.reactjs.org/ 
https://github.com/mithi/react-philosophies
https://react.iamkasong.com/
https://xueshiming.cn/2021/05/08/React%20%E4%B9%8B%20Fiber%20%E6%9E%B6%E6%9E%84/

react 需要遍历或修改 children，要使用`React.Children.forEach / React.Children.map` 方法，而不要用`Array.isArray(children) / children.forEach`等方法。

不可变的数据更新模式 [官方文档](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns) ([翻译](https://cn.redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html))

[解读 redux 的设计思路与用法](http://div.io/topic/1309)、[UI state应该放到哪里？](https://github.com/rackt/redux/issues/595)
[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)、[Reactive programming vs Passive programming](https://vaibhavgupta.me/2017/12/31/reactive-programming-vs-passive-programming/)

- reactive :: Action -> Model -> Model（Model, Side Effects(异步消息)）[elm-architecture](https://github.com/evancz/elm-architecture-tutorial/)
- React.js 本质：`(state, props) => state` (render :: Model -> UI)
- flux 本质：`(state, action) => state` (redux 的 reducer)。 不同的 component 维护许多各自不同 state，导致数据碎片化，flux 模式利用顶层 store 能解决这个问题。

### redux 概念

- actions 其实就是 mutations，即 ui 或者 server 的 response。
- action creator 调用 dispatcher (passive)，传递 mutations。
    - dispatcher 是一个 pub-sub systems。
- store 监听 actions 再去 mutate data。
    - Only Store gets to decide how to update the data。
- component 监听 store。Views subscribe to the stores that contain the data that it needs。

### redux & redux-saga 典型流程
form 表单提交，触发 FORM_POST action，saga 里 `yield put` POST_SUCCESS 触发 action，改变页面状态或拉取新数据，触发 UI CHANGE 的 action，过程中用 `yield select` 从 state 里选取需要的参数。

### [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)

- 父组件是 pure component，子组件也需要是 pure component。因为父组件的 state 和 props 保持不变时是不会重新渲染的，子组件也就不会重新渲染了。
- 除非碰到了性能问题，不然不要用 PureComponent。遇到性能问题，也可以通过自己定制 shouldComponentUpdate 来控制。
- 如果预期到某个组件的 props 或是 state 会「频繁变动」，那就不用使用 PureComponent，因为这样反而会变慢。示例：
<!-- 
render() {
  // 每次传入的 style 都是一个新对象，Post 组件每次都需要 rerender，
  // 不需要使用 PureComponent 会再多一次 props 和 state 的对比。
  return <Post item={item} style={{ 'width': 120 }} />;
} -->

### setState
[3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.o2lwoysxh) 

- setState 是异步的 [state-updates-may-be-asynchronous](https://facebook.github.io/react/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous) / [示例](https://stackoverflow.com/a/45249445/2190503)
- setState 引起不必要的 render。
- setState 不能覆盖所有的组件状态（像生命周期的钩子、timers、events）。

### diff & key

- [虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)
- [Dynamic Children - Why the Keys are Important](http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/)

dom 对象是很庞大的（上边有很多属性），其创建的开销比较大，已有的 dom 对象上做更新开销并不大，众多框架都在围绕此做优化，比如用`key`是否变化来判断对 dom 的操作是 “更新” 还是 “销毁重建”。
dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。
如果用 dom-api 一步步操作，会导致中间多次的 repaints 和 reflows，这是比较低效耗性能的。
如果放到「虚拟 dom」上操作，会把这三个过程最终的结果，一次更新到实际 dom 树上，只用操作一次实际 dom。
react virtual-dom 里一次 digest 中的 diff 只需一次，但是会随着 ui 的复杂度，性能损耗严重，virtual-dom 与原 dom 的对应也更难 (如果 angular 的脏检查的性能取决与 watcher 的数量，那 react 则是取决与 ui 规模)。 virtual-dom 的内部结构变化是不可预知的

- [真实 DOM 和 react 虚 dom 讨论](http://www.zhihu.com/question/31809713)
- [React Virtual DOM vs Incremental DOM vs Ember’s Glimmer: Fight](https://auth0.com/blog/2015/11/20/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/)

