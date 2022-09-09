
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



## 2011常见面试题目

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
