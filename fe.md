# fe suffer


## 2024-07~09 组件 pro-components


### 流水线(pipeline/ci/cd)

流水线问题
- 自定义问题
  - 不能像是 GitHub action 一样，能完全自定义流水线。
  - 默认运行 npm i，没考虑 pnpm 等工具，node 版本可选的少。
- 比如 test 分支是由 feat1 2 3 合并而成，没有提供 合并进来 分支名等信息。
- 使用 lerna 时、需要人工 配置模板，迁移或新建项目 不了解这个。
- 内置的 扫描过时风险依赖、安全检查 等任务不支持 loglevel 设置，影响查日志效率。
  - 不支持 内置任务 与 用户任务 的 log 文件拆分。
  - 成功时就提示个成功 就行、失败了再显示具体日志，不要一直都是显示一大堆。
  - 或者能 支持统一或单独配置 loglevel (silly verbose silent)。
  - 自定义的关键 log 信息，全被其他无用的 log 淹没了。协作同学、对这个流水线不熟悉，根本看不懂哪里是对的 哪里是错的。
- 不支持给 gitlab 打 annotated tags, 不支持 灵活调用 打 tag 的脚本。
  - 容器内不注入git的ssh key 。拉代码容器的key不会暴露给其他容器。
- 推送代码和权限
  - 安全要求、不能推送代码到 gitlab，也不支持在 feature 流水线里 推代码。
  - 使用者对 gitlab 代码只有 读权限、没有 写权限。

项管平台 brok 问题
- 各 feature 分支合并代码到 test 或 release，不支持检测是否 rebase 和 squash 代码。
- release 构建或发布成功的节点，不支持配置 通知人和群。
- 某个服务只能在某个brok项目使用。
- 右上角新建按钮、只能建项目 不能建任务直接，希望能基于 已有的项目、直接能 新建任务。
- [已解决] packman节点在 feature 流水线的 NPM_TAG 环境变量不支持设置。

流水线运行 lerna publish 问题
- lerna ERR! ENOGIT Detached git HEAD
  - 使用 `git checkout $PACKMAN_PUBLISH_BRANCH` 重新 tach 上
  - 如果没有 git ssh key 则没有对 remote 的操作权限，需要加上 `--no-push --no-git-tag-version` 参数，不然会报错。
  - [参考](https://github.com/lerna/lerna/issues/2443)
- lerna ERR! EUNCOMMIT Working tree has uncommitted changes
  - 如果是 M pnpm-lock.yaml 则确保开发阶段使用的 pnpm 版本一致
  - 如果是其他文件，使用 from-git 或 git commit https://github.com/lerna/lerna/issues/1591


### lerna

[lerna commands](https://lerna.js.org/docs/api-reference/commands)
[lerna实践](https://warmhug.github.io/2024/08/06/lerna-usage.html)

问 AI
- npm version 怎么自动升级 monorepo 的 子包依赖版本号
- pnpm 只检查并保持 workspaces 内部包 的最新版本，写成 bash 脚本

总结
- lerna 子包之间互相依赖
  - 配置文件 lerna.json 的 `"version": "independent"` 模式，不强制同步所有子包的版本:比如 A子包依赖B子包 B没有更新 A有更新，A子包的 package.json 不会修改 它依赖的B子包的版本号。
  - 利用了 pnpm 的 `--link-workspace-packages=true` 设置，比如 A子包依赖B子包 B子包本地版本号为1.1.1(npm上不存在此版本号) 如果A子包dep里的B子包版本号也写死为1.1.1，则B子包如果有变更、使用 `lerna changed` 就会显示 B A 子包都会有变化，默认都会升级版本号。
  - 在 lerna publish / version / changed 设置 `--include-merged-tags` 会检测 master 外的其他分支发布的 release tags。公司通常为 feature / test / pre-release / release 研发模式、在分支上发布很常见，建议加上。
  - 在 lerna publish / version / changed 设置 `--scope`  不起作用 https://github.com/lerna/lerna/issues/1556
  - 子包怎么更新自身依赖 https://github.com/lerna/lerna/issues/2142
- lerna 根据什么检测变更
  - 如果你的项目使用了规范化的提交信息（例如，使用 commitizen 和 cz-lerna-changelog），Lerna 可以更准确地检测变更，因为它会根据提交信息中的标签来识别影响的包。
  - `lerna ls --since master` [since文档](https://lerna.js.org/docs/api-reference/commands#--since-ref) changed 不支持 since 参数
  - 如果 lerna publish 失败，使用 lerna publish from-git 重新发布，不用改版本号。
  - [lerna 发包原理浅析](https://zhuanlan.zhihu.com/p/392438222) lerna changed 判断如果没有 tag，则认为全部的包都需要发布。
- lerna 仅支持 git annotated tags:
  - [tag问题](https://juejin.cn/post/7114538970339344420)
  - 如果 lerna publish 打 tag 的 commit 被 squash，但 tag 仍然存在，会导致 lerna changed 检测错误。 pro-components commit/f3900b2e89dda3186223fbd09330d8306dd46576
  - https://lerna.js.org/docs/troubleshooting#publish-command
  - https://github.com/lerna/lerna/issues/1357#issuecomment-438162152
  - 如果是 annotated 使用 git show tag_name 会看到包含 tagger 标记
  - 或者使用 git tag -v tag_name 不出现 error: cannot verify a non-tag object
- lerna version 不支持 dry-run、lerna lite 支持 https://github.com/lerna/lerna/issues/51#issuecomment-2293358836



### 版本问题

确保依赖版本始终同步的一种常用方法是，在 package.json 中为工作区包的依赖项指定严格的版本号，而不是 ^ 或 ~ 这样的语义版本号范围。这样做可以避免依赖更新时出现的意外问题。

lockfile 出现合并冲突，主流的包管理工具都支持运行依赖安装命令（npm install/yarn/pnpm install）来自动解决冲突。
在 主分支 上合入 开发分支（git merge feat-branch），theirs 指的就是开发分支，ours 指的是主分支，如果两个分支同时更新同一模块的版本号、对 lockfile 进行合并的策略:
- npm：深合并，并以当前分支（ ours ）的为准
- yarn：浅合并，并以目标分支（theirs）的为准
- pnpm：深合并，以版本号大的为准 (认为 新版本出现的问题会比旧版本更少)
  - 关注直接依赖 搜素 specifiers 的版本变更，对于直接依赖引入的间接依赖，自动升级出错的概率较小（一旦出错影响的不只一个项目），且 review 成本太高，选择信任社区。
  - 支持在每个分支中生成锁文件 https://github.com/pnpm/pnpm/pull/4475 。
  - [@types/react 18.3.5 bug](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70418) 在 package.json 设置 resolutions 锁定版本。

对于应用项目来说，可以直接使用固定版本；但是对于类库项目，不推荐固定版本，有以下原因：
- 依赖该类库的应用项目无法充分复用依赖：比如 ^1.0.0 和 ^1.1.0 可以合并成 ^1.1.0）
- 类库项目的间接依赖出现安全漏洞时，无法通过重新安装依赖直接修复
- 锁定直接依赖的版本也不完全有效，丢失 lock 后，直接依赖的间接依赖还是会进行升级，进而导致 BREAKING CHANGE
- 锁版本 就得信任其他依赖不会出现问题（听天由命）
- 尽量由开发流程保证，有冲突就复测，并做好充足的人工 review

在开发一个 npm包 时，你的 npm包 是需要被其他仓库依赖的，由于扁平安装机制，如果你锁定了依赖包版本，你的依赖包就不能和其他依赖包共享同一 semver 范围内的依赖包，这样会造成不必要的冗余。所以我们不应该把package-lock.json 文件发布出去（ npm 默认也不会把 package-lock.json 文件发布出去）。

npm 包的主版本号为 0 时，会被认为是一个不稳定版本，主版本号和次版本号都为 0: ^0.0.z、~0.0.z 都被当作固定版本，主版本号为 0: ^0.y.z 表现和 ~0.y.z 相同，只保持修订号为最新版本。
1.0.0 的版本号用于界定公共 API，对外部发布一个正式版本的npm包时，把它的版本标为1.0.0。

pre-release 预发布版本号的排序规则是：
不同预发布版本类型之间 alpha < beta < rc < release（即稳定版本，没有预发布标识符）。
同一预发布版本类型下，数字越大，版本越新，例如 1.0.0-alpha.1 < 1.0.0-alpha.2。
比如 rc-0..n > beta-0..n > alpha-2..


### 业务配置

[plugin 和 tree-shaking](https://github.com/ant-design/ant-design/issues/23988)

### iframe 内页面操作父页面dom (不同域名)

问题：文档网站域名是 https://pro.xx.net 使用 iframe 引用了 https://cdn.xx.com/dist/index.html 这个放在cdn上的静态html页面（css/js也是放在cdn上）也就是文档的实际内容。
页面里的链接需要改变 URL 的 hash 地址，但这两个域名 完全不同、无法直接改变 pro.xx.net 这个 URL 的参数。几种方案:
- [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
  - 注意收发消息的时机，比如需要等页面 onload
- [html proxy](https://juejin.cn/post/7174065483014995981) 会有 csp 等问题，不建议使用。
- 微前端 更复杂的方案。

跨域和同源政策:
> https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
- 同源: 协议、域名、端口都要相同；如果不同源，则 dom 和 storage 无法读取、Ajax 不能发送。
- 使用 document.domain (已被废弃)，要求“一级域名”必须要一样、否则不行，设置后端口变为null。
  - 能规避同源政策，两个网页可以共享Cookie、能够**互相获取和操作**对方的 dom 元素。
  - 但是 LocalStorage 和 IndexDB 无法通过这种方法共享。
- 设置 cors headers 解决的是 Ajax 问题，不能解决跨域 iframe 和父页面之间 dom 操作问题。

```js
// dumi 设置为 history: { type: 'hash' } 模式, 应用内链接改变 URL 的 hash:
// 但不会触发 window 自己绑定的 hashchange 事件, dumi 提供的 钩子函数 onRouteChange 会被触发, 为什么?
window.addEventListener('hashchange', (evt) => {
  console.log('evt ifr: ', evt.newURL, evt.oldURL, location.hash);
});
```

### antd

antd5 [发布日志](https://www.yuque.com/ant-design/ant-design/cy5nfvdo8oidvwmz)
- less到cssvar和design-token，不需要按需加载插件，使用day.js
- [releases/tag/5.0.0](https://github.com/ant-design/ant-design/releases/tag/5.0.0)
- [迁移 less 到 cssinjs](https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-codemod)

antd4 [发布日志](https://github.com/ant-design/ant-design/issues/21656)
- 暗色主题 无边框组件 图标按需加载 form/table重做 内置虚拟滚动
- [antd 3.x-stable](https://github.com/ant-design/ant-design/tree/3.x-stable)

### less/css

组件开发 不建议使用 css modules 因为会生成 hash 样式名、不容易覆盖。

[less Playground](https://lesscss.org/less-preview)
[analyze-css](https://www.projectwallace.com/analyze-css)
```less
// dumi dark theme
@dark-selector: ~[data-prefers-color="dark"];
.some-container {
  color: #fff;
  @{dark-selector} & {
    color: #000;
  }
}
```

### 打包构建

pnpm i 时 esbuil 报错
esbuild postinstall$ node install.js
Expected ${JSON.stringify(versionFromPackageJSON)
node-sass postinstall$ node scripts/build.js

设置 pnpm resolutions/overrides 都没用 https://github.com/evanw/esbuild/issues/3800

```sh
# 解决方法 ignore-scripts
pnpm i --ignore-scripts esbuild@0.21.4
pnpm i --ignore-scripts node-sass@4.14.1
```

- dumi 设置非根目录 [publicPath](https://github.com/umijs/dumi/issues/849)

- father 4 打包成 umd 产物时，lessLoader 设置 `math: 'always'` 配置项 https://github.com/umijs/father/issues/514#issuecomment-2222842879
  - [webpack chain 用法](https://juejin.cn/post/6947851867422621733)
- [father 2.x](https://github.com/umijs/father/tree/v2.9.0) 基于 [rollupjs](https://rollupjs.org/) 构建，采用 babel插件 编译 js/ts、采用 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 编译 less/css (不支持less配置项)。利用 [docz](https://www.docz.site/) 生成网站。
- [postcss](https://github.com/postcss/postcss): 处在 css 预处理器 less scss 等流程之后，解析 css 为 ast，并有 Autoprefixer 等知名插件。

- antd-style 只能和 antd@5 配合使用 https://github.com/ant-design/antd-style/issues/156

[rollup，vite以及webpack比较与介绍](https://juejin.cn/post/7097493230572273700)
- rollup 与 webpack 都是基于JavaScript依赖系统的一个打包构建工具，他们的共同点很多。 Rollup 默认打包为 ES6 格式、依靠插件生成 CommonJS 和 AMD 代码，静态分析代码中的 import 并排除任何未实际使用的代码。 Rollup 构建速度明显快于 webpack，生成的代码量很小。
- 不过在应用开发层面讲，如果开发一个Web应用webpack要比rollup有更大的优势，因为其天然继承了devServer以及hmr，这使得开发者可以快速的对应用进行调试开发。 Rollup 更加适合插件开发，而webpack更加适合应用开发。
- vite 号称是下一代的打包构建工具，主要体现在他从开发环境到生产环境的构建速度都能比webpack提升很多倍，原因就在于基于 rollup 和 esbuild 两个基础构建工具上。利用浏览器对ESM模块的支持，通过babel解决兼容性。将应用中的模块区分为 依赖 和 源码 两类，Vite使用esbuild预构建依赖、构建速度快 10-100 倍。在浏览器请求源码时、根据 router 按需以 原生 ESM方式提供 源码。利用 HTTP 头来加速整个页面的重新加载，源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
- esbuild 使用 go 编写，发挥多线程多核优势，不使用 AST。所以一些通过 AST 处理代码的 babel插件没有很好的方法过渡到 esbuild 中。


## 2024-06 pintu

体验问题: avi 对图的大小限制、下载大图时进度提示、重复点击和并发问题、下载低质量(宽高和分辨率不变)图片。

设计稿 设计倍率:
[摹客](https://help.mockplus.cn/p/504) 插件，可以自动匹配特定的尺寸为 2x 倍率、其他尺寸为 1x 倍率，可以手动修改指定。[摹客demo](https://app.mockplus.cn/app/z1pw7JNhn/develop/design/mmHsUz9q0)
蓝湖 待调研。

相关:
- [蓝湖](https://lanhuapp.com/)、[摹客](https://www.mockplus.cn/)、[moonvy](https://moonvy.com/)
- [缩小png](https://tinypng.com/) [changeDPI](https://github.com/shutterstock/changeDPI)

### sketch 插件

https://developer.sketch.com/plugins
[Sketch 插件开发实践](https://segmentfault.com/a/1190000020920371)

Sketch 和 Figma 插件都不支持 XMLHttpRequest 导致上传图片时 无法监听上传进度
fetch 只能监听下载进度 https://juejin.cn/post/7253969759191023675
https://forum.figma.com/t/cannot-make-a-post-request-in-figma-plugin/25039

[skpm](https://github.com/skpm/skpm) 通过 polyfill 方式支持 fetch FormData 如下代码
https://github.com/skpm/skpm/blob/master/packages/builder/src/utils/webpackConfig.js
```js
new webpack.ProvidePlugin({
   fetch: require.resolve('sketch-polyfill-fetch'),
   FormData: require.resolve('sketch-polyfill-fetch/lib/form-data'),
   Promise: require.resolve('@skpm/promise'),
}),
```

浏览器/node等环境的 宿主 判断如下，但 sketch 插件的宿主跟这些都不同
```js
// https://github.com/ladjs/superagent/blob/master/src/client.js
let root;
if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = this;
} else {
  // Web Worker
  root = self;
}
```

### WebGL 图像查看器

能支持超大图 不卡顿。 https://www.photopea.com/ (Facebook [私信](https://www.facebook.com/photopea))

- [sketch demo](https://www.sketch.com/s/a00a5b36-d81a-4a55-8e78-ffac2894d292)
- [figma demo](https://www.figma.com/design/dknmxVeJpnOq5aD0K9WvUa/test?node-id=0-1&t=qfDYyfOJPjQe4SDo-0)

figma 不支持插入 大于 4096px 的图片，会被裁剪和降低清晰度，参考[文档](https://help.figma.com/hc/en-us/articles/360040028034-Add-images-and-videos-to-design-files)。

canvas 模糊问题：
[antialiasing](https://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing)
[canvas-blur](https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da)
[lines-are-blurry](https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry)
[canvas drawimage blurry](https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry)
[higher-dpi-graphics-with-html5-canvas](https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas)
[sketch points-vs-pixels](https://www.sketch.com/support/sketch-features/mac-app/points-vs-pixels/)
[Optimizing_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

查看支持度: chrome://gpu  chrome://settings/system (图形加速)  https://get.webgl.org/
注意：
- 如果电脑只有一个显卡，比如 mac mini（m系列芯片）、Windows台式机、部分低配笔记本电脑，需要在 Chrome 浏览器设置里开启“图形加速”功能。
- Chrome 图形加速开启方法：手动打开“设置-系统”、或在浏览器地址栏输入`chrome://settings/system`，勾选“使用图形加速功能”，重启浏览器。
- Intel 电脑一般都有双显卡。
- 外接显示器没有GPU。因此，图形渲染由主 CPU 完成。
- 开启图形加速，可能使 Chrome cpu 占用一直高于 100%、风扇噪音大。

参考
- https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
- https://webglfundamentals.org/webgl/lessons/webgl-2d-scale.html
- https://webgl2fundamentals.org/webgl/lessons/webgl-cross-platform-issues.html
- https://elhigu.github.io/canvas-image-tiles/
- https://fengyuanchen.github.io/cropperjs/
- https://pettor.github.io/app-pixi-image-editor
- https://github.com/pixijs/pixijs/issues/6372
- https://css-tricks.com/building-an-images-gallery-using-pixijs-and-webgl/
- https://github.com/openseadragon/openseadragon

- canvas engines 性能测试 https://benchmarks.slaylines.io/webgl.html
- WebGL vs WebGPU https://www.infoq.cn/article/QwAwharqAwdrAgtCoXQv
- 360 viewer https://github.com/y-fujii/zuho
- 360 viewer https://github.com/Experience-Monks/360-image-viewer
- 医学图像查看 https://github.com/niivue/niivue
- https://www.wenjiangs.com/docs/webgl-docs-zh
- https://stackoverflow.com/questions/21603350/is-there-any-reason-for-using-webgl-instead-of-2d-canvas-for-2d-games-apps
- https://gamedev.stackexchange.com/questions/7927/should-i-use-textures-not-sized-to-a-power-of-2

不是 webgl 实现的 https://github.com/konvajs/konva


## 2023

代码写的要优美(卷)：分块用class类、赋值用lodash set。

代码坑：代码目录结构层级深。公共组件或公共状态复杂且难找。未用到的代码没删除，后期涉及到改动也不敢轻易删。

代码以前正常、现在不正常，如果前端没有改动，那就是后端数据变更导致。比如 布尔 判断这种情况、前端这么写：
`obj.id ? update() : create()`; 后端的 id 数据变更后存在 number 0 时，前端代码逻辑即出错。这就是 js 的弱类型导致的问题。

tailwindcss 的 text-danger 等 className 使用。


## 2022-01~04

arm aem 对任何请求（包括图片）都做埋点，导致业务接口被阻塞，页面性能下降一倍。采用合并、延迟上报埋点方式，把所有打点请求都延迟推入单独的队列维护，当页面完全加载完成后再从队列中依次取出数据进行上报。下掉非必要埋点。

- 一个组件里 点击触发请求、返回成功或失败，设置 isSuccess 的布尔值。另一个组件 需要监听 成功和重新点击 的状态，即 重新点击 isSuccess 不能为 true，但上次点击后 已经把它设置为了 true 怎么解决？
- useEffect 里监听的 多个状态、互相有影响，怎么解决？分别写 useEffect。
- antd 多层弹窗嵌套需要设置 [getPopupContainer](https://img.alicdn.com/imgextra/i3/O1CN01uK3oLs1dJyW9Y1sZJ_!!6000000003716-0-tps-1234-1166.jpg)

react-big-calendar 日历组件支持自定义的 EventWrapper 子组件，业务场景中 EventWrapper 组件需要根据某个业务 prop 调用接口获取数据。但 EventWrapper 可能会被 react-big-calendar 加载卸载或重复渲染很多次(次数不可控)，而只用在“第一次加载或卸载再加载”时调用接口一次即可。此时 useEffect 的监听 该怎么写？

```js
// EventWrapper 组件
const { param1, param2, mode } = props;
useEffect(() => {
  if (mode === 'a') {
    fetchData({ param1, param2 })
  }
  // 怎么确保只请求一次，同时监听 prop 变化？
}, []);
```


## 2021-08 使用 remaxjs 开发小程序
- 导入函数不能这样 import _ from 'lodash'; 而要这样 import groupBy from 'lodash/groupBy'; (踩坑0.5h+)，遇到这类错误无法定位、调试困难。
- 样式：单位要 x2、box-sizing 要设置到相应位置，伪元素无法定位。
- 元素：span 标签有嵌套时不起作用、样式不正确，i 标签等更多 html 标签不支持。
- 组件：
   - 功能不强：Picker 不支持两列，Tabs 功能和样式不好用，类似pc上 tooltip 的 Tips 组件位置难设置，有些组件 slot 必须要用 View 不灵活。
   - 封装不完善，FlexItem 不支持设置 className、没有 Row Col 等便捷组件。
- 图表组件 g2 不起作用，antd、react-dom 等引用内容要移除。
- 迁移额外成本：很多地方都要修改，架构调整(找到pc各模块代码、删减/重新组织)。
- 小程序：picker 和 optionsSelect 的使用场景区别？mobile table design patterns 用列表代替表格。


## 2021 navigator.geolocation

> gts周日报需求，需要定位功能。

定位技术：GPS定位技术、基站定位技术、利用Wifi在小范围内定位。
GPS定位搜索卫星初次定位时间过长而略显不便。另外，卫星信号覆盖不好时，比如室内，会导致无法定位。
手机定位的原理 https://www.sohu.com/a/76257016_335896

问题：
2021-09 Chrome 浏览器在 4G 热点和家里 WiFi 环境下，不会执行 getCurrentPosition 公司 WiFi 可以。网络翻墙问题。
如图 https://gw.alicdn.com/imgextra/i4/O1CN01c6wdMl1OuPlbjec3c_!!6000000001765-2-tps-1112-518.png
最优方案、使用 高德或百度 封装的定位功能，避开 googleapis 被墙的问题。

2012-01 三星gt-i9003(安卓2.3.5)、中兴ZTE-U880(安卓2.2.2) 浏览器不执行 getCurrentPosition 也没有是否允许定位的提示框弹出。

```js
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition((position) => {
   console.log('geolocation', position);
},
(error) => {
   console.log('geolocation error', error);
   if (error.PERMISSION_DENIED) {
      console.log('未开启定位权限');
   }
   if (error.POSITION_UNAVAILABLE) {
      // 在 Chrome 浏览器里，因为被墙、会返回 Network location provider at 'https://www.googleapis.com/ :ERR_TIMED_OUT.
      console.log('至少有一个内部位置源返回一个内部错误');
   }
   if (error.TIMEOUT) {
      console.log('超时');
   }
},
{
   timeout: 1000 * 15,
   // enableHighAccuracy: true, // 设为 true 移动端通过 gps 定位、费电
   // maximumAge: 1000 * 15, // 返回 15 秒内的 缓存位置，默认为 0
}
);
} else {
/* geolocation IS NOT available */
}
```


## 2020~2021

- waterfall 瀑布流 内容顺序 难保证 https://segmentfault.com/q/1010000009117246/
- flex 顺序正确的 布局 https://jessieji.com/2019/pure-css-masonry
- 多列 https://segmentfault.com/a/1190000017866549

框架的“双向绑定”意思是 view -> state -> view 变化的绑定，而不是 state1 <-> state2 变化的绑定、同样功能的 state 只用定义一个、有多个就会导致 state 变更检测的死循环。

dashboard 数据边界细节很多。

周日报遗留问题：
复制文字+多个图片、分别上传多个图片。
保存过期、前端存。大表格崩溃、大小极限。 编辑页 id 输错、结果处理。
一次性复制进去、还是会弹出事项选择框。导入上一篇 事项匹配错误。
断网再连上、报标题不能为空。新版日志编辑器：选中报错、任务样式问题。

- beforeunload 事件里有 ajax 等不到返回、页面就会关闭，怎么解决？
- 使用 `DOMParser().parseFromString(xml, 'text/xml');`解析 xml 时、需要把 xml 里的 `&` 等特殊符号 转义为 `&amp;` 不然会解析错误；参考 解答[一](https://stackoverflow.com/questions/17423495/how-to-solve-ampersand-conversion-issue-in-xml)、[二](https://stackoverflow.com/questions/11555890/how-to-parse-xml-with-special-character-specifically-for-ampersand)。
- 使用 `https://localhost` 或 umi 报 Disconnected from the devServer, trying to reconnect... 提示、设置 `chrome://flags/#allow-insecure-localhost` 能暂时解决。
- Chrome 无法访问非受信证书页面，方法1: 在页面上手工输入 `thisisunsafe` 。方法2: 打开 `chrome://net-internals/#hsts`在 Delete domain security policies 里删除相应域名。
- blocked:mixed-content 在 HTTPS 页面上有 HTTP 的请求，会被 Chrome 阻止、统一改为 HTTPS 即可。参考 [fixing-mixed-content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content?hl=zh-cn)
- 绑定 host 访问 https 时 (`https://localhost`)、Chrome 可能会有 ERR_CERT_AUTHORITY_INVALID 证书错误，解决 [方法一](https://segmentfault.com/a/1190000021843971)、[方法二](https://blog.csdn.net/xujing19920814/article/details/53966948)。

- react 不会触发 keydown 事件，需要设置 focus 或 tabIndex="1"
- web excel 缺点：数据量大时页面死掉。
- 下载文件不能直接可点击下载，需要设置 csrf token 来避免安全问题。
- [大规格文件的上传优化](https://aotu.io/notes/2020/05/12/file-upload/index.html)

#### antd
- Table 伸缩列 [bug多](https://github.com/ant-design/ant-design/commit/84c65582c71c66df9744177d337cfd3d4ce1a713)、性能[差](https://github.com/ant-design/ant-design/issues/28214)。
- Menu 和 Modal `<Menu.Item onClick={doSth} />` 里放子组件、子组件里有 `<Modal onCancel={cancel} />` 弹窗，cancel 事件会触发 menu item 的 click 事件；弹窗里嵌套弹窗问题。
- Select 组件
   - 下拉框和选择框样式分别自定义场景：比如 `mode="multiple"`、`labelInValue`、`options` 的 label 为定制的 jsx 时，可使用 `Select.Option` 组件 + `optionLabelProp="label"` 组合来避免 `onChange` 参数里的 label 是 jsx 、也能让选择框里 选项样式 能自定义。
   - 无尽列表翻页 [issues/12406](https://github.com/ant-design/ant-design/issues/12406)
   - 搜索框和单选选择框合并 [0.12 效果](https://012x.ant.design/components/select/#demo-search)、[1.x修改](https://github.com/ant-design/ant-design/issues/1390)、1.0 [changelog](https://github.com/ant-design/ant-design/issues/1050)
   - 数据项有重复时 会乱跳，如视频：[mp4](https://gw.alipayobjects.com/os/rmsportal/GxGqYTHnIXRioQTbtkok.mp4)
- Upload 组件
   - 多文件合并到一个 xhr 里上传 [issues/8579](https://github.com/ant-design/ant-design/issues/8579)
   - 使用内部的 UploadList 来[自定义进度条显示位置](https://github.com/ant-design/ant-design/issues/8387)
   - umi-request 基于 fetch 实现、不支持显示上传文件的进度，而 axios 可以支持。
   - 使用`beforeUpload`来限制上传文件大小、`customRequest`自定义上传接口和上传进度。
- Upload 上传文件/夹 (参考 语雀 或 teambition 上传资源)
   - 上传的文件或文件夹、都会存在一个`fileList`列表里，文件属性`webkitRelativePath`的值存在时、表示上传的是文件夹里的文件。`onChange`会在上传状态(上传中、已完成、失败等)变化时调用。
   - 多次点上传按钮时、可根据`fileList`里每个条目的`uid`标记来区分新旧。两次上传同一个文件夹时、需要 分别创建不同的文件夹名，比如后缀加上(1)。
   - 需要等待 所有文件都上传后 (即状态都是 done) 并且至少有一个文件上传成功，再创建目录。
   - 前端根据每个文件的`webkitRelativePath`值，循环构造出多层 文件夹 的层级数据，传给后端。
   - 后端一般需要起“异步”的任务、创建各级文件夹，前端轮询异步任务状态、判断是否成功。
   - 大文件分片上传和断点续传[原理](https://segmentfault.com/a/1190000040309502)，需要使用 oss 提供的 sdk。
   - 文件夹里包含超过 300 个小文件，上传起始会卡顿、上传失败的文件优先显示、上传过程并发数的浏览器限制。
- Popover 和 Tooltip 组件，children 如果不是元素、而是 {props.children} 不起作用。

#### redux / dva / umi
- umi 某个 router 多处复用方案 [umi/1830](https://github.com/umijs/umi/issues/1830)、[umi/4569](https://github.com/umijs/umi/issues/4569)
- subscriptions 怎么获取到 model 中的 state [issues/1600](https://github.com/dvajs/dva/issues/1600)
- 多个请求并行发起 [redux-saga/issues/1800](https://github.com/redux-saga/redux-saga/issues/1800)、[redux-saga/pull/759](https://github.com/redux-saga/redux-saga/pull/759)、[dva/issues/1009](https://github.com/dvajs/dva/issues/1009)
- 如何请求多个数据源并渲染？如[图](https://img.alicdn.com/imgextra/i4/O1CN0150J8CS26jHFosJFF4_!!6000000007697-2-tps-476-266.png)


## 2019-02 大安全移动业务开发
- 熄屏时 JS 倒计时变慢 
- H5软键盘兼容方案 [https://segmentfault.com/a/1190000018959389](https://segmentfault.com/a/1190000018959389)
- iOS 9.1 以下系统的 WKWebView 在 302 后的 document 地址可能不变更。
   - 比如当前域 (mobileic.alipay.com) 有相对地址的 post 请求 `ajax({ url: './verify.json', method: 'post' })`，但是这个页面是由 上个域 (securitycore.alipay.com) 的页面 302 跳转过来的，最终拼接出来的 ajax url 地址是上个域的 `securitycore.alipay.com/verify.json`导致错误，所以 post url 建议换成绝对地址。
- antd-mobile Carousel 在 iPhone 7/8 上有些情况下，卡住不会滚动、斜着滑动(同时导致页面上下滑动)时卡顿。[ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel](https://github.com/ant-design/ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel)
- Input 输入框 被键盘遮挡
   - 更多 [讨论和解法](https://juejin.im/post/59d74afe5188257e8267b03f)，部分 安卓机型 比如 moto 暂时无法解决。
- Android 4 白屏: `Set``Promise``Symbol` 未定义错误
- iOS webview 里 https 页面引入 http 的 js/css 不能加载？需要统一使用 https 协议。
- iOS 9 不支持 箭头函数


## 2018-2019 G2/G6 问题

- [G2] 时间横坐标在 mac 能显示 24 小时、正常，在 win7 上只能显示 12 小时。
- [G6] 绘制每个元素，都要自己设置 大小、填充、边框？挨个绘制多个元素时：要获取前一个元素的位置 + 当前元素尺寸，手工重新定位？
- [G6] API 文档没法搜索：支持哪些属性设置、文档难查找。比如 label 的 text 居中怎么设置？
- [G6] fixView: autoZoom 和 maxZoom: 2 会有兼容性问题
   - mac chrome 71 图不会自动居中，出现在左上角。
   - win7 chrome 55 看起来正常，但此浏览器版本太旧。
- [G6] 图表疑似绘制两次？



## 2017

tree shaking es6-modules in webpack-2
```js
// module.js
export const sayHello = name => `Hello ${name}!`;
export const sayBye = name => `Bye ${name}!`;
// index.js
import { sayHello } from './module';
sayHello('World');
// 构建后 sayBye 会被删除
```

## 2013

移动端 scroll 事件只在滚动结束时触发，用 touchmove 事件代替。


## 2013-08 兼容性问题
- IE8及以下，ajax请求地址和参数相同时，会在一段事件内，读取浏览器缓存的ajax返回文件数据，而不去重新请求。-- 解决：请求参数加时间戳
- JSON.stringify 只支持IE8\9\10标准文档模式，考虑到文档设置有兼容性视图模式（IE67模式）需要对此方法做兼容（参考json2.js）
- input、textarea的blur事件中删改页面元素，会影响作用区域周围的元素事件处理。例如：点提交btn，先触发了blur事件，改变btn周围的元素，使得btn位置变动，此时btn的事件处理函数不会触发，再点才可触发。
- IE8里在某个元素上设置`background: transparent;`，给此元素添加事件，并不会触发事件，像click mousedown事件
- IE9什么原因能导致input file框点击没反应？


## 2012

[Template-Engine-Chooser!](http://garann.github.io/template-chooser/)
模板引擎一般需要：预编译，运行时两个阶段。

- [mustache](https://github.com/janl/mustache.js) --不能预编译，轻逻辑，有各种语言(eg. java)版本
- [Hogan](https://github.com/twitter/hogan.js) -- mustache的编译器，使用基本没问题
- [handlebars](http://handlebarsjs.com/) -- 有runtime版本，基本能保证高性能；有扩展支持if else等，
- [artTemplate](https://github.com/aui/artTemplate?source=c) -- 国内出品，特性比较全面；有预编译工具；但是- 模板语法不通用，没有服务端语言支持。
- [ejs](http://embeddedjs.com/) --有些古老，使用不便


## 2011
- https://www.cnblogs.com/huajs/
- http://images.cnblogs.com/cnblogs_com/bluedream2009/201609/o_mm.jpg
- https://os.alipayobjects.com/rmsportal/EylTaSCtqXQRiTK.jpg
- 2011.5.11google首页动画 - 现代舞先驱玛莎·葛兰姆 117 周年诞辰
- [html5 snooker club](http://www.codeproject.com/Articles/217626/Html-Snooker-Club)
- [粒子系统](http://spielzeugz.de/html5/liquid-particles.html)
- [simulation of a cube that rotates](http://stackoverflow.com/questions/1401311/could-someone-explain-the-math-behind-how-this-cube-rotating-script-works?tab=active#tab-top)
- [三维旋转矩阵](http://wenku.baidu.com/view/58b1f64cf7ec4afe04a1df73.html)

`$('xx').data()` 使用地方 - [jQuery.data](http://www.cnblogs.com/silin6/p/jQuery_data.html)
在实际应用中我们要给我们的 DOM 添加数据，如果我们给一个 DOM 添加的数据太多的话，会存在循环引用的风险，例如我们添加的数据恰好引用了这个 DOM 元素，就会存在内存的泄露。
jquery 使用了数据缓存的机制就解决或者说避免这一问题。在 DOM 上扩展了一个属性 expando，数据都存在了 $.cache 中，利用 expando 这个属性建立 DOM 和缓存对象之间的联系。无论我们添加多少的数据都会存储在缓存对象中，而不是直接挂在 DOM 上。
es6 WeakMap 解决类似问题。
