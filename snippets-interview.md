
# 题目收集


## 2022-08

```js
// 写一个 repeat 方法，实现执行下面代码后每隔 35 输出 123，总共执行 4 次
const test = repeat((a) => console.log(a), 4, 3000);
test(123)

function repeat(func, times, delay) {
  return function (...args) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        func.apply(null, args);
      }, delay * i);
    }
  }
}
```

```js
// lodash get实现
const obj = {
  'a.b.c.d': 'abed',
  'a.d.xx': 'adxx'
  'a.e': 'ae'
}
// 写一个方法，将其转化为
{
  a: { b: { c: { d: 'abcd' } } },
  d: { xx: 'adxx' },
  e: 'ae'
}
```

```js
// 写出输出结果
function F() {
  getName = function () { console.log(1) }
  return this;
}
var getName = function () { console.log(2) }
function getName () { console.log(3) }
F.getName = function () { console.log(4) }
F.prototype.getName = function () { console.log(5) }
F.getName () // 4
F().getName () // 1
new F().getName () // 5
getName() // 1
```



# 2018~2021


### CSS
- CSS 选择器优先级(id>class>标签>伪类)？伪类和伪元素区别？BFC/IFC 介绍？
- 浮动以及清除浮动？页面布局方法？flex一维 CSS Grid 二维。元素垂直居中方法？
- border-box 作用？display/position 作用(absolute会变为块元素)？z-index 在节点 position 值是什么生效(relative/absolute/fixed)？
- 子元素的 margin-top 设置影响父元素位置？页面兼容性问题？响应式布局怎么实现？
- CSS优化方法？减少DOM操作，减少重绘和重排，合理使用选择器，减少@import使用。
- h5高清方案(rem) 优缺点？ css 实现 loading，三角形？ css-module 的作用？ css 样式初始化为了什么？

### JS - 库/框架/工程
- 原型链/闭包(匿名函数)？实现继承？new的原理实现？this指向改变(call/apply/bind)？null/undefined区别？事件代理(委托)？减少事件注册 节省内存。
- es6 常用哪些特性？ 变量最小作用域 es5 function, es6 let 块级。 var 变量提升(Hoisting)。 Map 和 WeakMap 区别。 Symbol generator。
- promise 跟 async/await 关系？ async 方法返回 promise 、是 promise 的语法糖。
- es6 generator？ es6 和 node 的 module 的区别？ fetch、xhr 优劣势？

- 看过 框架或库 源码？ vue angular 实现 双向绑定 的原理？单双向数据流区别？https://pomb.us/build-your-own-react
- redux 基本流程？为什么用单一的 store? 子组件 connect 后可使用 store 了？ context。 immutable-js ？ immerjs
- dva 的 model 里能否访问 window.location.pathname 等 ui 对象？ initialState 怎么设置？什么时候调用？
- react diff 原理？生命周期？受控组件和非受控组件？父组件和子组件的通信方式？render-props 高阶组件 (代替mixin及ref问题)？
- react 应用性能优化？列表 key / shouldComponentUpdate / PureComponent (props state 不变时不render) / memoization
  - getDerivedStateFromProps https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
- react setState 是同步的还是异步的? 子组件和父组件 componentDidMount 哪一个先执行？
- react hooks 怎么把 props 里复杂对象（数据请求结果）的实时变化、”完全同步/只是初始化“ 更新到 state 中？
- react hooks useRef 用途？和“函数组件”外定义的变量区别？(类全局变量) 分别的执行时机？
- react hooks useMemo useCallback useReducer/redux 应用场景？ https://blog.logrocket.com/frustrations-with-react-hooks
- react hooks useEffect 及其 return 函数的执行时机？子组件先执行？多个时执行顺序？怎么确保 dom 先增加成功 (setTimeout)？
- react Call child method from parent
- React-Fiber 并发模式、区分任务优先级、调度协调 中断/恢复任务，浏览器60fps渲染 10毫秒自己执行 5毫秒空闲时间。
- Web Components https://www.polymer-project.org

- 内存泄漏的情况？ html head 里的 js css 如何放置？
- iframe 带来哪些问题？高度改变麻烦、弹框、iframe 里再嵌套 ifr。
- JSONP 的原理以及 cors 怎么设置？跨域的方法有哪些？jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面。
- xss/csrf 原理和防御方法。CORS 的 POST 跨域如何带cookie？ https://www.jianshu.com/p/13d53acc124f
- [现在的前端框架全是通过API获得数据，如何记录用户登录状态？](https://www.zhihu.com/question/301253397/answer/547887208) (http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)
- 200、304 状态图 https://img2018.cnblogs.com/blog/907596/201903/907596-20190302011346217-1805589363.png (文章 https://www.cnblogs.com/kevingrace/p/10459429.html)
- SPA 实现方法？产生的问题：切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。客户端渲染和服务端渲染，哪个快？
- 浏览器 eventLoop 机制 microtask marcotask 执行顺序？setTimeout 宏队列先执行，promise 微队列。
- web worker 突破同源限制？importScripts。 不好地方:(协程)解决并行计算，数据共享和精确控制线程生命周期方面存在缺陷。
- 数据可视化: 3d 编辑器功能？技术点 svg 3dgis canvas webgl，svg 转 webgl 怎么实现？
- 移动: 点击穿透/300ms延迟？Fastclick。首频渲染、网络性能？手势库？有没有用过RN PWA？
- ES 与 CommonJS modules 的区别

- eslint / ts; 单测 CI/CD ？GitHub 如何协作？ git rebase / merge 区别？roolup 和 webpack 主要不同是什么？
- 前后端联调、效率怎么提高？有什么平台或 API 约定？swagger
- HTTP 协议，http2.0，http 301 / 302 / 304 的区别。 设计模式：工厂模式、观察者模式、MVC。
- 基础性能：压缩资源、异步加载、预加载、缓存、使用gzip、减少cookie、减少重定向、减少请求数。

### 架构 & 算法
- 组件设计经验？ 弹窗的 visible 应该在哪儿维护？
- 代码可维护性提升方法？ 与优秀代码的差距？ 重复代码。 编程范式？(函数式与OO) S.O.L.I.D 原则：S：单一职责 O：开闭 L：里氏替换 I：接口隔离 D：依赖倒置。

- 哪些后端 API 设计方法？github twitter 的 RESTful api 优点？GraphQL 解决了 rest 的什么问题？(https://github.com/warmhug/web-api)
- BFF: 多端适配/聚合裁剪数据，额外的部署资源及运维成本，集合 GraphQL https://insights.thoughtworks.cn/use-graphql-build-bff-in-microservices
- 深度优先搜索(DFS)、广度优先搜索(BFS)，二叉树的遍历 前序遍历，如何将递归用循环表示，排序算法、逆波兰式，人工智能算法？
- slam 算法；杨辉三角的输出、两个有序链表合并成一个有序的链表；从 n 个数中取出 m 个不同的数，要求时间复杂度低。MySQL为什么用 b+ 树？

### 开放问题
- 在项目中的角色？是否“独立”负责/0-1的项目、还是维护修改项目？
- 遇到印象深刻的难题是什么？怎么解决的？（潜力） 开源作品或技术博客？ 最有成就感的技术产出？
- 原工作是否有过因为他的存在而带来不一样的结果？以后三年职业计划？
- 看哪些技术网站？国外网站？最近有学什么新技术（学习能力和专业热情）







# 2011常见面试题目

```
Q:你会怎样去设计一个异步请求队列？（可以用任何你喜欢的方式描述）
Q:谈谈你对IE页面渲染，那个“奇怪”的layout的理解
Q:Apple iOS & Google Android . Which do you like best ? Why?

Ajax readyState 值 0 1 2 3 4 分别表示什么？当 readyState=4 时，一个完整的服务器响应已经收到了，接着，函数会检查HTTP服务器响应的状态值。完整的状态取值可参见W3C文档。当HTTP服务器响应的值为200时，表示状态正常。
http状态码： 1xx: 信息。  2xx: 成功。 3xx: 重定向。  304 Not Modified 未按预期修改文档 使用缓存。 4xx: 客户端错误。 403 Forbidden。  5xx: 服务器错误。

跨域。 实现继承。 实现 XHR封装。 实现addEvent函数。 实现 getElementsByClassName。
```

IE6 bug

- 双倍 margin bug，如何解决？
- DIV浮动IE文本产生3象素的bug。
- 在IE6中使用透明PNG图片。
- 对一个inline元素使用宽度，它将只在IE6下起作用。
- IE6不支持最小宽度（min-width）
- IE6不支持position:fixed;解决方法。


```js
  // 2011-11 胡同
  ;(function(){
  var _toString = Object.prototype.toString;
  var data=
  [1,[],{},undefined,NaN,false,null,'true',/\s/,XMLHttpRequest(),Array];
          for(var i in data)
              console.log(typeof data[i]);
              //out?
          for(var i in data)
          console.log(_toString.call(data[i]).replace(/^.*?\s([a-z]+)]$/i,function(n,i1){return i1;}));
            //out?
  })()

  ;(function(){
      var  foo = function(i){
              var _that = this,
                  _self  = arguments.callee;
                    _self.i = i;
                    _self._getIti = function(){
                          return i;
            };
                    _self._getItii = (function(){
                          var i = _self.i;
                          return (function(){
                                      return i;
                                });
            }());
                  _that.getIti = _self._getIti;
                  _that.getItii = _self._getItii;
      }
            foo.prototype = {
                  pgetIti:function(){return foo._getIti();},
                  pgetItii:function(){return foo._getItii();}   
            }
          var f1 = new foo(1);
                console.log(f1.getIti());//?
          var f2 = new foo(2);
                console.log(f2.getIti());//?
                console.log(f2.getItii());//?
          var f3 = new foo(3);
                console.log(f3.getItii());//?
                console.log(f1.getIti());//?
                console.log(f2.getItii());//?
                console.log(f1.pgetIti());//?
                console.log(f2.pgetItii());//?
                console.log(f3.pgetIti());//?
                console.log(f3.pgetItii());//?
                console.log(f1.pgetItii());//?
      return 'done';
  })()
```
