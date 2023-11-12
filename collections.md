
gmtc https://gmtc.infoq.cn/2022/beijing/schedule
重庆前端交流会 https://zhuanlan.zhihu.com/p/581717444
[2021 大前端技术回顾及未来展望](https://mp.weixin.qq.com/s/HfZDrrqDNUVpnU-aegKxcg)
[2021 年 Rust 生态版图调研报告](https://zhuanlan.zhihu.com/p/458046979)
[Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey)、[JavaScript risingstars](https://risingstars.js.org)、[awesome-react](https://github.com/enaqx/awesome-react)、[awesome-react-components](https://github.com/brillout/awesome-react-components)、[react-china](http://react-china.org/)。
[uxtools.co](https://uxtools.co/tools/design)、[2018前端技术清单](https://juejin.im/post/5bdfb387e51d452c8e0aa902)、[2019中国开源软件榜](https://www.oschina.net/project/top_cn_2019)。
[chromestatus](https://www.chromestatus.com/features)、
[edge-status](https://developer.microsoft.com/en-us/microsoft-edge/status/)、
[webkit](https://webkit.org/)、[stateofjs](https://stateofjs.com/)、[stateofcss](https://stateofcss.com/)、
[html5test](http://html5test.com/)、[chrome-experiments](https://experiments.withgoogle.com/collection/chrome)。

https://coolshell.cn/
[前端领域的 “干净架构”](https://zhuanlan.zhihu.com/p/458410158)
徐飞 - [业务中的前端组件化体系](https://zhuanlan.zhihu.com/p/383129585)


## 分类

研发流程/前端工程化
评审系分, 研发平台, 脚手架, 数据 mock, 组件库, 微前端, 质量, 测试, 埋点监控
[The Evolution of a Software Engineer](https://medium.com/@webseanhickey/the-evolution-of-a-software-engineer-db854689243)、[某G的前端开发方式](http://fex.baidu.com/blog/2014/03/G-ossip/)。

研发平台
阿里def、蚂蚁雨燕 / just / 优酷hub / 菜鸟cone。 飞冰ice / form builder / FormRender。
前端系分 [研发过程图](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*jRrGSYNyLqIAAAAAAAAAAABjARQnAQ)([图1](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*z-C8SpqQo08AAAAAAAAAAABjARQnAQ))、技术图 (计划图/时序图/类图)

工具的易用和完善度: 做业务上的基础工具，很难按 文档说明 一次性 的就能做好跑起来。 产物不一致、本地没问题 线上有问题。

脚手架
企业级前端开发框架：[redux](https://redux.js.org/)、[dvajs](https://dvajs.com/)、[umijs](https://umijs.org/)、[bigfish](https://bigfish.alipay.com/)
umi/qiankun, 阿里[rax](https://rax.js.org/)跨容器的渲染引擎, [primereact](https://www.primefaces.org/primereact/), [蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85), oneconsole.
使用于某 BU 范围内的“业务脚手架”、内置含 BU 特色的插件，基于“开源脚手架”定制，既提升效率又有开放性，是较好的选择。
微前端
bigfish-onex / icestark([介绍](https://mp.weixin.qq.com/s/L-6ygB2CpdGO1hXRCx5QuQ)) / microx(克军)
微应用注册、路由管控(统一菜单/权限)、发布版本管控、发布灰度控制、多环境(日常/预发/线上)、预加载、应用组件。 子应用样式丢失。
request 组件
csrf-token 处理、gateway domain 网关域名、登录、返回异常、返回json结果格式化、上传/下载

UI
[bit 介绍](https://juejin.cn/post/6844903872108953607),
antd, [react-data-grid](https://github.com/adazzle/react-data-grid)、[moveable](https://github.com/daybrush/moveable)、[react-grid-layout](https://github.com/STRML/react-grid-layout)、[Re-Flex](https://github.com/leefsmp/Re-Flex)、[react-mosaic](https://github.com/nomcopter/react-mosaic)、[ScrollTrigger](https://github.com/terwanerik/ScrollTrigger)、[react-virtualized](https://github.com/bvaughn/react-virtualized)、[元素定位tether](https://github.com/shipshapecode/tether)、[tailwindcss](https://github.com/tailwindcss/tailwindcss)、分步指引([shepherd](https://github.com/shipshapecode/shepherd)/[driver.js](https://github.com/kamranahmedse/driver.js))、[react-trello](https://github.com/rcdexta/react-trello)。[css 图标集](http://livicons.com/)
[material-design-lite](https://github.com/google/material-design-lite)、[jQuery miniui](http://www.miniui.com/)、[toast ui](https://ui.toast.com/)、[goodui](https://goodui.org/)

数据 mock
[postman](https://www.getpostman.com/) ([paw](https://paw.cloud/) [hoppscotch](https://hoppscotch.io/))。 oneapi / dummy-mock / dip。
Mock工具在产品“初始化/初版”时比较有用，但之后“非常”容易腐烂，原因：API 接口名称、内容结构“很容易”会改变。 接口之间有依赖性、比如 修改/保存之后、再重新获取，数据不会变动。 mock 的数据、对不同人权限问题。 迭代中，绝大多数接口线上都有、少部分是新接口 mock 可直接在相应接口初临时 mock 即可。

前后端
[zeit/swr](https://github.com/zeit/swr)、[web-servers](https://gist.github.com/willurd/5720255)、[swagger](https://swagger.io/)、[json-server、](https://github.com/typicode/json-server)[miragejs](https://miragejs.com/)、[browser-functions](https://medium.com/@richardyoung00/browser-functions-a-new-serverless-platform-using-web-browser-execution-engines-31d2293e650b)、[isomorphic-git](https://isomorphic-git.org/en/)、[onedev](https://github.com/theonedev/onedev)(DevOps平台)。

小程序&移动端
[taro](https://taro.aotu.io/)、[remax](https://github.com/remaxjs/remax)、[alibaba/rax](https://github.com/alibaba/rax)、[flutter](https://github.com/flutter/flutter)。

图表
antv、[alibaba/GGEditor](https://github.com/alibaba/GGEditor)、[workflow 设计器 wfd](https://github.com/guozhaolong/wfd/)、[amcharts](http://www.amcharts.com/demos/)。

日历
[fullcalendar](https://fullcalendar.io/)、[webix/scheduler](https://webix.com/scheduler/)、[react-big-calendar](https://github.com/jquense/react-big-calendar)、[tui.calendar](https://github.com/nhn/tui.calendar)

地图
antv [L7](https://l7.antv.vision/zh)、饿了么 [react-amap](https://elemefe.github.io/react-amap/)。数据源 [datav data](http://datav.aliyun.com/tools/atlas/#&lat=33.50475906922609&lng=104.2822265625&zoom=4)、[hcharts.cn/mapdata](https://img.hcharts.cn/mapdata/)，高德点聚合 [markerclusterer](https://lbs.amap.com/api/javascript-api/example/marker/markerclusterer)。

IDE
[eclipse-theia](https://github.com/eclipse-theia/theia)、[coding.腾讯、](https://coding.net/)[stackblitz](https://stackblitz.com/)、[gitpod](https://www.gitpod.io/) (蚂蚁 cloudIDE)。

编辑器
[slate](https://github.com/ianstormtaylor/slate)、[trix](https://github.com/basecamp/trix)、[braft-editor](https://github.com/margox/braft-editor)、[edtr-io](https://github.com/edtr-io)、[svg-editors](https://css-tricks.com/browser-based-svg-editors/)、[各种编辑器](https://github.com/JefMari/awesome-wysiwyg)、数学公式[编辑器](https://www.mathcha.io/)、[zebra-editor-core](https://github.com/acccco/zebra-editor-core)、[tui-editor](https://ui.toast.com/tui-editor/)、[craft.js](https://github.com/prevwong/craft.js)、[react-visual-editor](https://github.com/anye931123/react-visual-editor)、[stylojs](https://stylojs.com/)。

截图
[dom-to-image和html2canvas原理](https://github.com/zhangyu0414/notebook-to-record-learning)、[各设备截图服务](https://screendump.techulus.com/)、录制回放 [rrweb](https://github.com/rrweb-io/rrweb) (内网 xreplay)、[screen-share-party](https://ba.net/screen-share-party/#9730179072993984)。

文件管理
[top10-javascript-file-managers](https://hackernoon.com/top-10-javascript-file-managers-8o2p34vw)、[file-browser](https://reactjsexample.com/tag/file-browser/)、[file-manager](https://js.plus/products/file-manager)、[OpusCapita](https://demo.core.dev.opuscapita.com/filemanager/master/?currentComponentName=FileManager&maxContainerWidth=100%25&showSidebar=false)、[dxFileManager](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/)、[dhtmlxFileManager](https://dhtmlx.com/docs/products/dhtmlxFileManager/)、[syncfusion/file-manager](https://www.syncfusion.com/blogs/post/introducing-new-javascript-file-manager-control.aspx)、[webix/filemanager](https://webix.com/filemanager/)。

其他
[react-sketchapp](https://github.com/airbnb/react-sketchapp)、[fabricjs](http://fabricjs.com/)(canvas)、[ua 检测](https://github.com/ded/bowser)、[特性检测](https://github.com/barisaydinoglu/Detectizr)、[jsinspect](https://github.com/danielstjules/jsinspect)、[jscpd](https://github.com/kucherenko/jscpd)、[code-inspector](https://www.code-inspector.com/)、[自动 polyfill](https://polyfill.io/v3/url-builder/)、[jsfuck 代码混淆](http://www.jsfuck.com/)、[代码圈复杂度Cyclomatic Complexity](http://kaelzhang81.github.io/2017/06/18/%E8%AF%A6%E8%A7%A3%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6/)、[franc](https://github.com/wooorm/franc)、[togetherjs](https://togetherjs.com/)、[docz](https://www.docz.site/)、[wiki.js](https://wiki.js.org/)、[多媒体](https://www.yuque.com/books/share/6487738a-085c-4a82-98b3-834f87859a2a)、/ oneshot / web-Excel / 机器人工厂。

营销/游戏/大屏: 魔石 / 魔切 / 喵动 / 犸良 / sherry / 幻鹦-大屏。


## 监控 & 体验 & 质量 & 测试

https://github.com/GoogleChromeLabs/quicklink
https://superset.apache.org/

ICBU前端性能度量 https://mp.weixin.qq.com/s/XAdNOovCQxh5xuGVOSEz3w

[Web vitals](https://www.cnblogs.com/constantince/p/15237915.html)、
[thresholds](https://web.dev/i18n/en/defining-core-web-vitals-thresholds/)、
[Chrome的First Paint触发的时机探究](https://cloud.tencent.com/developer/article/1124484)、
[window.onload vs document.onload](https://stackoverflow.com/questions/40193553/load-event-on-script-with-async-and-or-defer)

[如何根治 Script Error.](https://mp.weixin.qq.com/s/6v_X0vtM5EZThF0odwJmTw)
[JavaScript Errors Handbook](https://github.com/mknichel/javascript-errors/blob/master/README.md)、
[如何捕获前端错误](https://mp.weixin.qq.com/s/E51lKQOojsvhHvACIyXwhw)、[搞定前端错误捕获和上报](https://juejin.cn/post/7031876097390149645)、[错误监控总结](https://segmentfault.com/a/1190000014672384)

为什么大厂前端监控都在用GIF做埋点？ https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650099077&idx=1&sn=813d2c96cd940dc95b0f47585b989c2f

AEM [表单分析](https://img.alicdn.com/imgextra/i3/O1CN01x1xSNj26XMy1xUikf_!!6000000007671-0-tps-2934-1678.jpg)

Google [lighthouse](https://developers.google.com/web/tools/lighthouse/)、类似服务 [web.dev/measure](https://web.dev/measure)、[webpagetest](https://www.webpagetest.org/)、[pagespeed insights](https://developers.google.com/speed/pagespeed/insights/)

arms / quick a+ / spm / aplus / retcode / clue。

性能和体验
弹窗 modal 里高度需要设置、内容长时“内滚动”。 一行多列 card 卡片，每个卡片 高度需要设置成一样。
某个操作 触发多次 ajax 请求、再 setState 页面，导致卡顿？ 一个页面有多个“富文本实例”同时初始化、比较耗时？导致页面卡顿？

测试
CI/CD、JS 覆盖率工具 [istanbul](https://istanbul.js.org/)。测试-漏测率。 阿里MTC无线测试中心、蚂蚁云测平台[Solomon]
基础理论: [前端测试体系建设与最佳实践](https://mp.weixin.qq.com/s?__biz=MzI5MjYyODYyNQ==&mid=2247483987&idx=1&sn=132aea5d5185a1e4fa2fab5037a2fb3e)、[测试金字塔](https://martinfowler.com/bliki/TestPyramid.html)
[codecov.io](https://codecov.io/) 覆盖率分析对比工具 支持所有语言，对 GitHub commit 的覆盖率做记录、前后对比。
[代码测试覆盖率分析](https://blog.rsuitejs.com/2017/08/20/test-coverage/)
Statements 与 Lines 的区别：一行可能有多个语句
[百分百测试覆盖率真的有意义吗？](https://www.zhihu.com/question/29528349) 各种 corner cases(比如除0、IO error handling) 很难做到 100% 覆盖。 覆盖率数据只能代表你测试过哪些代码，不能代表你是否测试好这些代码。 不能盲目追求代码覆盖率，而应该想办法设计更多更好的案例，哪怕多设计出来的案例对覆盖率一点影响也没有。

质量
[研发效能度量引发的血案](https://mp.weixin.qq.com/s/h9zIg2e8iHn3qgxlUGObbQ)、[10 倍程序员神话](https://www.simplethread.com/the-10x-programmer-myth/)、[代码质量](https://stackoverflow.blog/2021/10/18/code-quality-a-concern-for-businesses-bottom-lines-and-empathetic-programmers/)


## 生成 & 搭建 & 可视化

[阿里低代码引擎LowCodeEngine正式开源](https://mp.weixin.qq.com/s/rQ-X9OBFRvhI16KrWwIT6w)
[官网](https://lowcode-engine.cn/)、[github](https://github.com/alibaba/lowcode-engine)

[网易云音乐低代码体系建设思考与实践](https://mp.weixin.qq.com/s/9yo-Au3wwsWErBJfFjhxUg)

[从实现原理看LowCode](https://zhuanlan.zhihu.com/p/452251297)

https://github.com/imcuttle/mometa

AECP 开发平台架构 https://img.alicdn.com/imgextra/i2/O1CN01VFIoNq1E0PCIklFol_!!6000000000289-2-tps-2482-1410.png

Microsoft Power Apps 中，页面的生产过程是由字段的布局来决定的，字段对应的组件可以切换。在 Mendix、OutSystems 中。页面虽然是基于模型来生产的，但整体开发体验，依然是面向页面和组件视角的。组件可以绑定字段。
从前端对低代码提效本质的分析来看，可视化搭建本质上是通过可视化手段降低了前端开发的上手门槛，但开发思路和源码开发基本是一样的。其提高开发效率的主要手段是，通过丰富的静态模板让页面开发少写一些代码。没有元数据的支持，其对开发效率的提升至多是线性的，而我们需要的是数量级的提升。
由于模型元数据驱动和可视化搭建在本质思路上的不同，在可视化搭建基础上，集成模型驱动的能力，会让整个产品的复杂性增加，产品定位不清晰，扩展性差。与其这样，不如从0开始打造一个纯净的模型驱动低代码开发工具。


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


### 低代码

低代码平台：源码不可维护 git diff 不起作用。

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



## h5 or 小程序

> 2018-12-24

- butian线下面的，除非特殊情况，否则都是优先小程序，如果要走h5的话，需要走审批。(@hanseng - 支付宝)
- 只会在一些小需求上试点，目前主要还是 h5。(@yuanfei - 微贷)
- 核心的链路，容易出 bug 的用 h5，比如我们这边的通用业务，通用投保，理赔，一些新业务会考虑小程序。(@chengwu - 保险)

考虑到一期的重要性、和直接面向 C 端用户，采用 h5 方式开发。

h5 套壳？参考：小程序『套壳』指南

### 小程序

小程序 API

```js
const { Ali } = window;
const { isAlipay } = Ali;
window.AlipayJSBridge;
document.addEventListener('AlipayJSBridgeReady', callback, false);
Ali.httpRequest({ url: '', method: 'POST' }, (result) => {});
Ali.rpc({ operationType: '', requestData: [] }, (result) => {});
Ali.call('imageViewer', { enablesavephoto: true, images: [], init: index });
Ali.showLoading(param);
Ali.hideLoading();
Ali.showToast({ content: '' });
Ali.showActionSheet({ content: '' }, (result) => {});
Ali.popWindow();
AlipayJSBridge.call('getSystemInfo', { }, (result) => {});
AlipayJSBridge.call('popWindow');
AlipayJSBridge.call('setTitle', { title: 'xxx' });
```

采用了虚拟 DOM 的思想。小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了 WebView 进行渲染；逻辑层采用 JsCore 线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由 Native 转发。
目的：安全可控，沙箱隔离，限制 DOM 和 BOM 能力。逻辑层和渲染层是独立的，二者不会互相阻塞，因此性能更优（小程序限制了 JS 操作 DOM 的能力，因此不用担心二者的不同步问题）在浏览器网页中，虽然 JS 执行和 UI 渲染也是处于两个线程，但是 JS 线程和 UI 线程是互斥的。


小程序采用的是混合架构，可通过 html 里的 a 标签启动新的 webview 窗口、调用 popWindow 关闭窗口。基本页面元素是 html 渲染，弹窗类 loading toast ActionSheet 和 本地存储、系统或用户信息，使用客户端原生实现。

而 react-native 只是采用 js/html 写法，背后完全是 客户端原生 渲染。



## react & redux

[useReducer callback](https://github.com/facebook/react/issues/15344)

> antd-mobile 旧 demo 备份
> - antd_custom_ui move from https://github.com/warmhug/__/tree/master/_react/antd_custom_ui to > https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui
> - antd-mobile + TypeScript move from https://github.com/warmhug/__/tree/master/_react/antd-ts > to https://github.com/ant-design/antd-mobile-samples/tree/master/web-typescript

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



## 文档 & 图

输入是信息，输出才是知识。由管理工具演化为知识生产。

[活文档](https://mp.weixin.qq.com/s/Tkc_eisDB3SFwWLaWktB2Q)、2020-11 孟方(游圣) [aliyun/cadt](https://www.aliyun.com/product/developerservices/cadt)

Roam Research [介绍](https://www.zhihu.com/question/384453977)、[介绍1](https://baijiahao.baidu.com/s?id=1669749949965240303)、[foam](https://foambubble.github.io/foam/)

> 在 Notion 中可以，但是仅限于那些易于分割的材料；比如技术文档、技术教程，里面的内容以功能或概念为界，方便打碎放到 Notion 的 Database block 里，然后通「Relation」进行相互链接。不过读起来连贯性较差，也不支持可视化一览 block 之间的联系。到底网状的知识还是线性的知识更利于传播。看得出roam吸取了notion的块的思想，吸取了bear的笔记链接语法，吸取了WorkFlowy的层级组织方式。但我觉得有了双向链接和网状图，笔记多起来以后的管理仍然是个问题，我也用bear做链接，但是链接多了，自己对整个网的结构也有点不太清楚了，不能一下子知道这些笔记之间的关系，有图也不行。

​[Notion 编辑器原理](https://zhuanlan.zhihu.com/p/359122473)、[腾讯在线 Excel 技术](https://mp.weixin.qq.com/s/f1vwzuPryc8ag6nd5Ngr5A)
[语雀 实时保存 方案](https://klab.yuque.com/docs/share/0e3ee249-d977-492b-82f2-6b44d26bd4af) (平侠/遇春 2021-01)、[语雀后端技术](https://mp.weixin.qq.com/s/VM61gkZuYYqE4pVhpba3nQ)、[隆昊《富文本编辑器的技术演进》](https://myslide.cn/slides/21863)、[有道云笔记富文本编辑器技术演进](https://mp.weixin.qq.com/s/9gDI1r9aAu6dHJhXg34eIg)。

[飞书在线文档协同](https://mp.weixin.qq.com/s?__biz=MzkzNTIwNTAwOA==&mid=2247496795&idx=1&sn=5edf65ebf8609ada7981a9a804b072d3)、
实时协作技术 [ot-vs-crdt](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/) / [xi-editor-CRDTs](https://xi-editor.io/docs/rope_science_08.html) / [are-crdts-suitable](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/)、[vs code 多人协作](https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/connectivity)、[CKEditor 多人协作](https://ckeditor.com/collaborative-editing/)、[automerge](https://github.com/automerge/automerge)、[crdt](https://wiki.nikitavoloboev.xyz/distributed-systems/crdt)。

[文档协同的三元结构-浩初](https://www.yuque.com/docs/share/92faca9c-2162-4fe2-974d-193164650b11)、[resume生成](https://github.com/visiky/resume)

#### 在线 office / 文档

- 阿里云[媒体管理](https://help.aliyun.com/document_detail/63273.html)、[微软](https://support.microsoft.com/en-us/office/embed-a-presentation-in-a-web-page-or-blog-19668a1d-2299-4af3-91e1-ae57af723a60)、[Google/微软](https://gist.github.com/tzmartin/1cf85dc3d975f94cfddc04bc0dd399be)、Google [示例](https://docs.google.com/viewer?embedded=true&url=http%3A%2F%2Fhomepages.inf.ed.ac.uk%2Fneilb%2FTestWordDoc.doc)、转换 [sheetson](https://sheetson.com/)
- 生成/查看 PPT: [PptxGenJS](https://github.com/gitbrent/PptxGenJS)、[apache_poi_ppt](https://www.w3cschool.cn/apache_poi_ppt/apache_poi_ppt_presentation.html)(java)、[nodeppt](https://github.com/ksky521/nodeppt)。[ViewerJS](https://github.com/webodf/ViewerJS)、[office sdk](https://www.pdftron.com/office-sdk/office-document-viewer/)。


微软: [office](https://products.office.com/zh-cn/home) ([task](https://techcommunity.microsoft.com/t5/microsoft-365-blog/connecting-tasks-experiences-across-microsoft-365/ba-p/1522069))、[teams](https://teams.microsoft.com/)

Google: [gsuite](https://gsuite.google.com/) ([google-forms](https://docs.google.com/forms/u/0/)/[教程](https://youtu.be/RoA65-vLV_0)) [alerts](https://www.google.com/alerts) [classroom](https://classroom.google.com/h)

[notion](https://www.notion.so/)、[craft.do](https://www.craft.do/)、[airtable](https://airtable.com/)、[quip](https://quip.com/about/product)、[coda.io](https://coda.io/t/Welcome-to-Coda_tvbBdpE72Lq#)、slack。 [wolai](https://www.wolai.com/) ([介绍](https://www.zhihu.com/question/407132273/answer/1352638849))。 [mathigon](https://mathigon.org/)(互动教程)。

腾讯文档 [docs.qq.com](https://docs.qq.com/desktop/)、头条 [larksuite](https://www.larksuite.com/) ([lark 出海](https://zhuanlan.zhihu.com/p/58585005))、[teambition](https://www.teambition.com/)、[wps](https://www.wps.cn/) (稻壳模板[docer](http://www.docer.com/))、[xiezuocat](https://xiezuocat.com/#/)(AI纠错)、[sheetui](https://sheetui.com/)(表格转网页)、[Luckysheet](https://github.com/mengshukeji/Luckysheet)、[handsontable](https://handsontable.com/)、[prezi](https://prezi.com/dashboard/next/#/presentations)、[milanote](https://app.milanote.com/1KeUXu1ElqNVrw/home)、[logseq](https://github.com/logseq/logseq)、


产品设计工具: 白板([mural](https://mural.co/)、[miro](https://miro.com/))、原型([xiaopiu](https://www.xiaopiu.com)、[xiaopiu/prd](https://www.xiaopiu.com/prd)、[justinmind](https://www.justinmind.com/))、[知乎](https://www.zhihu.com/question/23004570)([invision](https://www.invisionapp.com/)、[modao](https://modao.cc/)、[蓝湖](https://lanhuapp.com/)、[mockplus](https://www.mockplus.cn/)、[会议桌](https://www.huiyizhuo.com/))、[流程图和图表](https://zhuanlan.zhihu.com/p/111990866)、[figma](https://www.figma.com/) ([FigmaToCode](https://github.com/bernaferrari/FigmaToCode))、在线[培训工具](https://segmentfault.com/a/1190000021793283)。

其他: [mubu](https://mubu.com/)、[slides.com](https://slides.com/)、[ppt.baomitu](https://ppt.baomitu.com/)、[zoho](https://www.zoho.com/)、[visme](https://www.visme.co/templates/)、[deckdeckgo](https://deckdeckgo.com/)、[witeboard](https://witeboard.com/)、[wireflow](https://wireflow.co/)、[presenta](https://play.presenta.cc/#s0)。
[batnoter](https://github.com/batnoter/batnoter)

#### 画图(在线/客户端)

[drawio](https://github.com/jgraph/drawio)([mxgraph](https://github.com/jgraph/mxgraph))、[cloudskew](https://www.cloudskew.com/)、[diagram-js](https://github.com/bpmn-io/diagram-js)、[excalidraw](https://github.com/excalidraw/excalidraw)、[draw2d](https://github.com/freegroup/draw2d)([demo](http://freegroup.github.io/draw2d_js.app.shape_designer/))、[plantuml](https://plantuml.com/zh/)、[planttext](https://www.planttext.com/)、[diagram.codes](https://www.diagram.codes/)、[jsplumb](https://github.com/jsplumb/jsplumb)([jsplumb-vs-mxgraph](https://www.npmtrends.com/jsplumb-vs-mxgraph))、[mermaid-js](https://github.com/mermaid-js/mermaid)、[nomnoml](https://github.com/skanaar/nomnoml)、[visjs](https://github.com/visjs)([timeline](https://visjs.github.io/vis-timeline/examples/timeline/))、[react-diagrams](https://github.com/projectstorm/react-diagrams)、[roughjs](https://roughjs.com/)、[rete.js/](https://rete.js.org/#/)[flume](https://flume.dev/)/[nodered](https://nodered.org/)(可视化节点)、[diagrams](https://github.com/mingrammer/diagrams)([graphviz](https://www.graphviz.org/))、[vscode-drawio](https://github.com/hediet/vscode-drawio)、[text-to-diagram](https://smusamashah.github.io/text-to-diagram)、[isoflow](https://isoflow.io/)、[reactflow](https://reactflow.dev/)、[diagram-maker](https://github.com/awslabs/diagram-maker)。

平台/端: [processon](https://www.processon.com/)、visio、mindnode lite、[visual-paradigm](https://online.visual-paradigm.com/diagrams/features/aws-architecture-diagram-tool/)、[ithoughts](https://www.toketaware.com/ithoughts-osx)、[gliffy](https://www.gliffy.com/)、[terrastruct](https://terrastruct.com/)、[edrawsoft](https://www.edrawsoft.cn/)、[freedgo](https://www.freedgo.com/)、[websequencediagrams](https://www.websequencediagrams.com/)、[chartmage](http://chartmage.com/intro.html)、[thebrain](https://www.thebrain.com/)、[asciiflow](https://asciiflow.com/#/)([textik](https://textik.com/#9fe9a0bacdcf4a9a))、[omnigraffle](https://www.omnigroup.com/omnigraffle/)、[flowchart](https://flowchart.fun/)、[photopea](https://www.photopea.com/)​、[PPTist](https://github.com/pipipi-pikachu/PPTist)

收费: [gojs](https://gojs.net/latest/samples/index.html)、[jointjs](https://www.jointjs.com/)、[jsplumbtoolkit](https://jsplumbtoolkit.com/)、[yworks](https://www.yworks.com/products/yfiles/demos)、[mindfusion-diagram](https://mindfusion.eu/javascript-diagram.html)

系统: [drawio-aws-cloudcraft](https://www.diagrams.net/blog/drawio-aws-cloudcraft)、([placeholder](https://www.diagrams.net/blog/placeholder-scope)、[mermaid](https://www.diagrams.net/blog/mermaid-diagrams)、[network](https://www.diagrams.net/blog/network-diagrams)、[org](https://www.diagrams.net/blog/org-charts))


## 安全

[a 标签中 target="_blank" 的安全漏洞](https://www.tutorialdocs.com/article/html-opener-blank.html) 详细地解释了该漏洞的攻击方法和原理。并在文末给出了防范该漏洞的解决办法：给 a 标签增加 rel="noopener noreferrer nofollow"。

cors跨域：http头可以伪造，所以跨域的时候记得带上sessionId做身份验证；防止允许跨域的站点被入侵；不要对 Access–Control-Allow-Origin 使用`*`

[csrf 详解](https://tech.meituan.com/fe_security_csrf.html)、[csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转帐和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。
为防止csrf漏洞，传统表单里默认有生成了随机token的隐藏input，同步提交表单时能自动提交上去，同步提交后刷新页面会再次更新token。
但使用Ajax异步提交时，提交时要从Cookie里(或页面上)获得token值（这里假设攻击者不能获得第三方的Cookie，但用户的Cookie很容易由于网站的XSS漏洞而被盗取），另外要考虑在提交后是否需要手动更新Cookie里(或页面上)的token。
> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。

jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表。
ajax 方式的 csrf token 放到 post 提交的 body 里、随其他数据一起提交。


反爬虫 https://segmentfault.com/a/1190000017899193
循序渐进学加密 https://segmentfault.com/a/1190000019437132

蚂蚁内容风险识别接口服务 https://docs.alipay.com/pre-open/api_pre/alipay.security.risk.content.analyze
撞库 https://baike.baidu.com/item/%E6%92%9E%E5%BA%93/16480882?fr=aladdin
人机识别服务接口 RDS https://apires.alipay.com/isp/previewDetail.htm?apiId=4967
IFAA 生物认证 https://tech.antfin.com/products/IFAA

安全资讯网站博客
- 先知社区 https://xz.aliyun.com
- freebuf https://www.freebuf.com/articles/web
- 安全客 https://www.anquanke.com/vul
- 台湾217战队 http://blog.orange.tw/
- 腾讯云牵头制定首个IEEE业务安全风控全球标准 https://www.toutiao.com/i6681138895255503374
- 蚂蚁研发者门户 安全&风控 专题
- 2019 RSAC 对安全技术领域发展的思考
- RSA原理浅析
- OTP动态付款码(仟墨)、数字证书(万佛)、支付盾、安全控件(文同)
- 反洗钱、欺诈/盗用、信息窃取篡改、病毒/木马/钓鱼/防火墙、安全意识、负面舆情治理
