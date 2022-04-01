
## 研发流程

> [The Evolution of a Software Engineer](https://medium.com/@webseanhickey/the-evolution-of-a-software-engineer-db854689243)、[某G的前端开发方式](http://fex.baidu.com/blog/2014/03/G-ossip/)。

- 文档计划: 前端系分 [研发过程图](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*jRrGSYNyLqIAAAAAAAAAAABjARQnAQ)([图1](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*z-C8SpqQo08AAAAAAAAAAABjARQnAQ))、技术图 (计划图/时序图/类图)
- 数据接口: oneapi 接口和 mock 平台，[postman](https://www.getpostman.com/) ([paw](https://paw.cloud/) [hoppscotch](https://hoppscotch.io/))。 oneapi / dummy-mock / dip。
- 研发平台：阿里def、蚂蚁雨燕 / just / 优酷hub / 菜鸟cone。 飞冰ice / form builder / FormRender。
- 脚手架/组件库：阿里[rax](https://rax.js.org/)跨容器的渲染引擎、antd、umi/qiankun、[primereact](https://www.primefaces.org/primereact/)、[material-design-lite](https://github.com/google/material-design-lite)、[jQuery miniui](http://www.miniui.com/)、[toast ui](https://ui.toast.com/)、[goodui](https://goodui.org/)。
- 微前端：bigfish-onex / icestark([介绍](https://mp.weixin.qq.com/s/L-6ygB2CpdGO1hXRCx5QuQ)) / microx(克军)
- 质量 & 测试 & 埋点监控：arms / quick a+ / spm / aplus / retcode / clue / parrot 国际化方案集。



## 前端工程化

- [蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85)、oneconsole

[bit 介绍](https://juejin.cn/post/6844903872108953607)

工具的易用和完善度打分：
- 做业务上的基础工具，很难按 文档说明 一次性 的就能做好跑起来。
- 构建 COMPRESS=none 不支持，产物不一致、本地没问题 线上有问题。

低代码平台：源码不可维护 git diff 不起作用。

#### 脚手架
使用于某 BU 范围内的“业务脚手架”、内置含 BU 特色的插件，基于“开源脚手架”定制，既提升效率又有开放性，是较好的选择。

#### Mock工具
产品“初始化/初版”时比较有用，但之后“非常”容易腐烂，原因：

- API 接口名称、内容结构“很容易”会改变。
- 接口之间有依赖性、比如 修改/保存之后、再重新获取，数据不会变动。
- mock 的数据、对不同人权限问题。
- 迭代中，绝大多数接口线上都有、少部分是新接口 mock 可直接在相应接口初临时 mock 即可。 

#### 性能和体验

- 弹窗 modal 里高度需要设置、内容长时“内滚动”。
- 一行多列 card 卡片，每个卡片 高度需要设置成一样。
- antd 的 dropdown 动画速度慢、禁止掉动画。
- 一个页面有多个“富文本实例”同时初始化、比较耗时？导致页面卡顿？
- 某个操作 触发多次 ajax 请求、再 setState 页面，导致卡顿？


## 埋点监控

为什么大厂前端监控都在用GIF做埋点？ https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650099077&idx=1&sn=813d2c96cd940dc95b0f47585b989c2f

AEM [表单分析](https://img.alicdn.com/imgextra/i3/O1CN01x1xSNj26XMy1xUikf_!!6000000007671-0-tps-2934-1678.jpg)


## 效能
[研发效能度量引发的血案](https://mp.weixin.qq.com/s/h9zIg2e8iHn3qgxlUGObbQ)、[10 倍程序员神话](https://www.simplethread.com/the-10x-programmer-myth/)、[代码质量](https://stackoverflow.blog/2021/10/18/code-quality-a-concern-for-businesses-bottom-lines-and-empathetic-programmers/)


## 测试
Google [lighthouse](https://developers.google.com/web/tools/lighthouse/)、类似服务 [web.dev/measure](https://web.dev/measure)、[webpagetest](https://www.webpagetest.org/)、[pagespeed insights](https://developers.google.com/speed/pagespeed/insights/)

CI/CD、JS 覆盖率工具 [istanbul](https://istanbul.js.org/)。测试-漏测率。

阿里MTC无线测试中心、蚂蚁云测平台[Solomon]

基础理论: [前端测试体系建设与最佳实践](https://mp.weixin.qq.com/s?__biz=MzI5MjYyODYyNQ==&mid=2247483987&idx=1&sn=132aea5d5185a1e4fa2fab5037a2fb3e)、[测试金字塔](https://martinfowler.com/bliki/TestPyramid.html)

- [codecov.io](https://codecov.io/) 覆盖率分析对比工具
   - 支持所有语言，对 GitHub commit 的覆盖率做记录、前后对比。
- 覆盖率类别：[https://blog.rsuitejs.com/2017/08/20/test-coverage/](https://blog.rsuitejs.com/2017/08/20/test-coverage/)
   - Statements 与 Lines 的区别：一行可能有多个语句
- 百分百测试覆盖率真的有意义吗？ [https://www.zhihu.com/question/29528349](https://www.zhihu.com/question/29528349)
   - 各种 corner cases(比如除0、IO error handling) 很难做到 100% 覆盖。
   - 覆盖率数据只能代表你测试过哪些代码，不能代表你是否测试好这些代码。
   - 不能盲目追求代码覆盖率，而应该想办法设计更多更好的案例，哪怕多设计出来的案例对覆盖率一点影响也没有。




------

## 生成 & 搭建 & 可视化

AECP 开发平台架构 https://img.alicdn.com/imgextra/i2/O1CN01VFIoNq1E0PCIklFol_!!6000000000289-2-tps-2482-1410.png

Microsoft Power Apps 中，页面的生产过程是由字段的布局来决定的，字段对应的组件可以切换。在 Mendix、OutSystems 中。页面虽然是基于模型来生产的，但整体开发体验，依然是面向页面和组件视角的。组件可以绑定字段。
从前端对低代码提效本质的分析来看，可视化搭建本质上是通过可视化手段降低了前端开发的上手门槛，但开发思路和源码开发基本是一样的。其提高开发效率的主要手段是，通过丰富的静态模板让页面开发少写一些代码。没有元数据的支持，其对开发效率的提升至多是线性的，而我们需要的是数量级的提升。
由于模型元数据驱动和可视化搭建在本质思路上的不同，在可视化搭建基础上，集成模型驱动的能力，会让整个产品的复杂性增加，产品定位不清晰，扩展性差。与其这样，不如从0开始打造一个纯净的模型驱动低代码开发工具。
[截图](https://img.alicdn.com/imgextra/i3/O1CN016r6qdv2ABADXwgty2_!!6000000008164-0-tps-1644-1584.jpg)


[2020/01/13/the-no-code-delusion](https://www.alexhudson.com/2020/01/13/the-no-code-delusion/)、[无代码编程介绍](https://mp.weixin.qq.com/s/eKvSxOvSyEZEr3BLloCXdw)
[antd-lowcode](http://g.alicdn.com/code/npm/@ali/antd-lowcode/0.5.1/example/index.html)

Markdown + 卡片 [可视化搭建](https://zhuanlan.zhihu.com/p/164558106)、
宜搭、[云凤蝶](https://www.yunfengdie.com/home)、[阿里云外网建站](https://ac.aliyun.com/jianzhan)。微软 Power [Platform](https://yuque.antfin-inc.com/chenyu/articles/skei6i)。AWS [honeycode](https://www.honeycode.aws/)、[mendix](https://www.mendix.com/)。

[SaaS（科技）行业导航](http://www.allsaas.cn/)、SaaS 平台：[氚云](https://h3yun.com/index.php?g=Chuanyun&m=Scene&a=index)、[搭搭云](https://www.dadayun.cn/)、[明道云](https://blog.mingdao.com/13061.html)、[appsheet](https://www.appsheet.com/)、[fibery](https://fibery.io)、[openchakra](https://openchakra.app/)、[百度amis](https://baidu.github.io/amis/#/docs/getting-started)、[tumult](https://tumult.com/)(YC投资)、
[grapesjs](https://grapesjs.com/)、[noflojs](https://noflojs.org/)、[pagedraw](https://pagedraw.io/)、Google Web Designer (类似 Dreamweaver) 2013 发布 2017 停止更新。

[What's Salesforce?](https://tryretool.com/blog/salesforce-for-engineers/) 、Salesforce [Lightning](https://www.salesforce.com/cn/campaign/lightning)

云上[编排](https://blog.csdn.net/devcloud/article/details/93175186)([cloudcraft](https://app.cloudcraft.co/)/阿里[ros](https://cn.aliyun.com/product/ros)/华为云[aos](https://www.jianshu.com/p/2301a1729fcc)/[Terraform](https://blog.csdn.net/yejingtao703/article/details/80574363)/[PAD图](https://baike.baidu.com/item/PAD%E5%9B%BE))、[图编排(](https://www.atatech.org/articles/170866)[相关](https://www.atatech.org/articles/174875/))

GUI 研发：[umi-ui](https://umijs.org/guide/umi-ui.html)、[angular-console](https://angularconsole.com/)

表单: [formily](https://github.com/alibaba/formily)、[build forms from JSON Schema](https://github.com/mozilla-services/react-jsonschema-form)、[react-final-form](https://github.com/final-form/react-final-form)、[AForm模型驱动生成表单](http://xiehuiqi220.github.io/AForm/doc/book/index.html)。

AI图转码: 西安交大[设计图转代码](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247489854&idx=1&sn=4828d5d36c3becdf8b1f46490b5ce708)、[Microsoft Sketch2Code](https://github.com/Microsoft/ailab/tree/master/Sketch2Code)、[sketch2code](https://azure.microsoft.com/en-us/blog/turn-your-whiteboard-sketches-to-working-code-in-seconds-with-sketch2code)、[pix2code](https://github.com/tonybeltramelli/pix2code)、[Screenshot-to-code](https://github.com/emilwallner/Screenshot-to-code)。

AI Design: Google [AutoDraw](https://www.autodraw.com/) (原理[介绍](https://research.googleblog.com/2017/04/teaching-machines-to-draw.html))、鲁班、[sketch-rnn](https://github.com/tensorflow/magenta/blob/master/magenta/models/sketch_rnn/README.md)、[机器作艺术画](https://robotart.org/artworks/)、设计与人工智能[系列报告](http://sheji.ai/#/?_k=twxxpk)、[lobe.ai 生成表情](https://lobe.ai/)。

AI 编码/代码推荐: [为什么难](https://www.outsystems.com/blog/posts/ai-machine-learning-future-low-code/)、Facebook [Aroma](https://code.fb.com/developer-tools/aroma/)、[Would-AI-be-able-to-write-code](https://www.quora.com/Would-AI-be-able-to-write-code)。
imgcook(控件识别) / dumbo / 闲鱼UI2Code / 视觉稿还原比对-蒙娜丽莎。

JS 实现神经网络、[天猫精灵](https://open.bot.tmall.com/)、机器人工厂、阿里文娱 [AI 视频智能](https://ailab.youku.com/#/)、JS IM / [botui](https://github.com/moinism/botui)


---

### 低代码

物料(模板、页面、区块、基础组件、业务组件、布局组件) 

[引擎](https://img.alicdn.com/imgextra/i1/O1CN01rYYbMH1KKSEUlOB3B_!!6000000001145-2-tps-1196-736.png): 
入料引擎（Materialin Engine）Material for Schema [架构图](https://img.alicdn.com/imgextra/i3/O1CN01ySybed1u7TAlCEmgI_!!6000000005990-2-tps-1698-467.png)；编排引擎（Choreography Engine）Schema to Schema [架构图](https://img.alicdn.com/imgextra/i1/O1CN01BV9MmX26om0c3PECA_!!6000000007709-2-tps-1542-829.png)；渲染引擎（Rendering Engine）Schema to UI [架构图](https://img.alicdn.com/imgextra/i3/O1CN01u0oISH1tUXVQ8V8Wu_!!6000000005905-2-tps-1834-536.png)；出码引擎（Codeout Engine）Schema to Code [架构图](https://img.alicdn.com/imgextra/i1/O1CN01rvvk6H1X433D49JOc_!!6000000002869-2-tps-1382-690.png)。

区块（Block）：一系列业务组件、布局组件等组合而成的代码片段，不对外提供可配置的属性；区块内部具备完整的内部样式、事件、生命周期管理、状态管理、数据流转机制，能独立存在和运行，通过代码片段的复制实现跨页面、跨应用的快速复用，保障功能和数据的正常。
模板（Template）：特定垂直业务领域内的业务组件、区块可组合为单个页面，或者是再配合路由组合为多个页面集，统称为模板。

https://img.alicdn.com/imgextra/i4/O1CN01z4bl431OOoSsB0Fgl_!!6000000001696-0-tps-2647-1048.jpg


#### schema 基础协议规范

```js
{
  "version": "1.0.0",      //当前协议版本号
  "componentsMap": [{      //组件描述
    "componentName": "Button",
    "package": "alife/next",
    "version": "1.0.0",
    "destructuring": true,
    "exportName": "Select",
    "subName": "Button",
  }, {
    "componentName": "CustomInput",
    "package": "@ali/custom",
    "version": "1.0.0",
    "main": "/lib/input",
    "destructuring": true,
    "exportName": "Input"
  }],
  "componentsTree": [{
    "componentName": "Page",   //单个页面。枚举类型 Page|Block|Component
    "fileName": "Page1",
    "meta": {          //页面元信息
      "title": "首页",    //页面标题描述
      "router": "/",     //页面路由
      "spmb": "abef21",  //spm B位
    },
    "props": {},
    "defaultProps": {   // 默认props：  选填 仅用于定义低代码业务组件的默认属性 固定对象
      "name": "xxx"
    },
    "css": "body {font-size: 12px;} .table { width: 100px;}", 
    "state": {                       // 初始state： 选填 对象类型/变量表达式
      "btnText": "submit",                     // 默认数据值： 选填 变量表达式
      "num": 8,
      "num2": 5
    },
    "lifeCycles": {                   //生命周期:          选填 对象类型
      "didMount": {
        "type": "JSExpression",
        "value": "function() {        //生命周期方法：      选填 函数类型\
            console.log('did mount');\
        }",
      },
      "willUnmount": {
        "type": "JSExpression",
        "value": "function() {\
          console.log('will unmount');\
        }"
      }
    },
    "methods": {                     // 自定义方法对象：     选填 对象类型
      "testFunc": { //自定义方法： 选填 函数类型
        "type": "JSExpression",
        "value": "function() {             \
            console.log('test func');\
          }"
      },
      "getNum": {
        "type": "JSExpression",
        "value": "function(a, b){\
                return a + b;\
              }"
      }
    },
    "dataSource": {                  // 数据源对象：选填  对象类型
      "list": [{                          // 数据请求列表    必填  数组类型
        "id": "list",                // 单个数据请求id标识    必填  字符串类型
        "isInit": true,              // 是否为初始数据             必填     布尔类型/变量表达式
        // 建议改个名字，比如 auto | loadOnInit
        "type": "fetch/mtop/jsonp",  //请求类型   必填    字符串类型
        "options": {                //请求类型对应参数  必填  对象类型
          "uri": "",                      //请求地址        必填  字符串/变量表达式
          "params": {},                //请求参数       选填   字符串/变量表达式
          "method": "GET",             //请求方法              必填   字符串/变量表达式
          "isCors": true,              //是否支持跨域,   对应credentials = 'include'     选填  布尔
          "timeout": 5000,             //超时时间单位ms     选填   数字类型 单位ms
          "headers": {}                //请求header参数  选填   请求头信息
        },
        "dataHandler": { //异步请求回调： 选填  函数类型
          "type": "JSExpression",
          "value": "function(data, err) {} "
        }
      }],
      "dataHandler": {  // 所有初始异步数据接口执行完成后的回调   选填 函数类型
        "type": "JSExpression",
        "value": "function(dataMap) { }",
      }
    },
    "children": [{
      "componentName": "Button",    
      "props": {                      
        "text": {
          "type": "JSExpression",
          "value": "getNum(state.num, state.num2) + '万'"
        }
      },
      "condition": {
        "type": "JSExpression",
        "value": "state.num > state.num2"
      }
    },{
      "componentName": "Div",
      "props": {
        "className": "",
        "text": {
          "type": "JSExpression",
          "value": "i18n['i18n-jwg27yo4']"
        }
      },
      "condition": {                     // 函数类型属性：选填 函数类型
        "type": "JSExpression",
        "value": "!!this.state.isshow",  // 渲染条件： 选填 根据表达式结果判断是否渲染物料 默认值true
      },
      "loop": [],                        // 循环渲染数据：选填 根据数据循环渲染物料 默认不进行循环渲染；
      "loopArgs": ["item", "index"],     // 循环迭代对象、索引名称 选填
      "children": [{
        "componentName": "Button",
        "props": {
          "prop1": 1234, // 简单 json 数据
          "prop2": [{   // 简单 json 数据
            "label": "选项1",
            "value": 1
          }, {
            "label": "选项2",
            "value": 2
          }],
          "prop3": [{
            "name": "myName",
            "rule": {
              "type": "JSExpression",
              "value": "/\w+/i"
            }
          }],
          "valueBind": { // 变量绑定
            "type": "JSExpression",
            "value": "this.state.user.name"
          },
          "onClick": { // 动作绑定
            "type": "JSExpression",
            "value": "function(e) { console.log(e.target.innerText) }",
          },
          "onClick2": { // 动作绑定2
            "type": "JSExpression",
            "value": "this.submit",
          },
        }, 
      }]
    }],
  }],
  "utils": [{
    "name": "clone",
    "type": "npm",
    "content": {
      "package": "lodash",
      "version": "0.0.1",
      "exportName": "clone",
      "subName": "",
      "destructuring": false,
      "main": "/lib/clone"
    }
  }, {
    "name": "beforeRequestHandler",
    "type": "function",
    "content": {
      "type": "JSFunction",
      "value": "function(){\n ... \n}"
    }
  }],
  "constants": {
    "ENV": "prod",
    "DOMAIN": "xxx.alibab.com"
  },
  "config": {  //当前应用配置信息
    "sdkVersion": "1.0.3",  //渲染模块版本
    "historyMode": "hash",  // 浏览器路由：brower  哈希路由：hash
    "targetRootID": "J_Container",
    "layout": {
      "componentName": "BasicLayout",
      "props": {
      	"logo": "...",
        "name": "测试网站"
      },
    },
    "theme": {
      //for Fusion use dpl defined
      "package": "@alife/theme-fusion",
      "version": "^0.1.0",
      //for Antd use variable
      "primary": "#ff9966"
    }
  },
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "你好",
      "i18n-jwg27yo3": "中国"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "China"
    }
  }
}
```

区块级API（实现区块级内部的上下文，数据流，状态管理）

```js
this.state
this.setState()
this.dataSourceMap[oneRequest.id]: {
  load(params), status, data, error
}
this.reloadDataSource()
this.xxx()
```

页面级api（实现页面级内部的上下文，数据流，状态管理，从而实现区块之间的通信）

```js
this.page
this.page.state
this.page.setState()
this.page.props
this.page.xxx()
this.page.dataSourceMap
this.page.reloadDataSource()
```

低代码业务组件 API (开发一个低代码业务组件需要用到的API，实现内部的上下文，数据流，状态管理)

```js
this.component
this.component.state
this.component.setState()
this.component.props
this.component.xxx()
this.component.dataSourceMap
this.component.reloadDataSource()
```

获取循环数据对象 api (获取在循环场景下的数据对象)

```js
this.item
this.index
```


