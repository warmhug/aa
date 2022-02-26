# 前端工程化

- [蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85)、oneconsole

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


-------



# 系分&模板
> 2019-11 - 内部

系分(系统设计+业务分析)的本质其实就是将技术推演的过程前置，所带来的好处就是：问题可以在第一时间发现，第一时间解决，从而最大化的降低了需求变更、方案变更 所带来的沉没成本。

## 模板

### 修订历史
| 版本号 | 作者 | 内容提要 | 发布日期 |
|  ----  | ----  | ---- | ---- |
| V1.0 | XX | 初稿 | 2020-10-24 |

### 需求背景
xxxx
### 需求目标
xxxx
### 相关资源
- prd(@xx): XXX  交互稿(@xx): XXX  视觉稿(@xx): XXX
- 后端系分: XXX、API 列表

### 功能分析
> 1.模块交互截图 2.展示要素分析 3.时序图（包含系统交互、用户行为交互）

#### 模块A
xxxx
#### 模块B
xxxx

特殊模块分析(可选)
1.特殊功能描述
2.实现思路流程图？依赖的框架、类库？
3.性能表现，是否需要降级？降级的维度：钱包版本、系统版本、小程序版本?
4.兼容性，稳定性方案

### 监控设计
核心业务数据监控。异常监控告警。

### 灰度方案
服务端、客户端、配置项灰度方案。

### 应急方案
写操作熔断方案、核心模块熔断、应急提示（小黄条）

### 埋点方案
1.页面访问埋点 2.链路行动点曝光+点击 3.特殊业务埋点

### 技术沉淀
1.沉淀一个组件？ 2.沉淀一个模板？ 3.沉淀一套解决方案？

### 项目管理

#### 工作量评估

| 功能点 | 工作量 | 需求优先级 | 责任人 |
|  ----  | ----  | ---- | ---- |
| 模块A | X天 | P0 | 小马 |
| 模块B | X天 | P0 | 小马 |
| 模块C | X天 | P1 | 小马 |

#### 项目风险点
#### 项目详细计划表
#### 发布checkList


