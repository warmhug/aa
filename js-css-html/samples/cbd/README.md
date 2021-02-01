# compile & build & deploy

- [gulp 手册1](http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C1.pdf) / [gulp 手册2](http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C2.pdf)

[lerna](https://github.com/lerna/lerna)：适合多个 package 有互相引用、代码规范一致、统一管理 issue 的项目。示例 [practices](https://github.com/LittleBreak/lerna-best-practices) / [dva](https://github.com/dvajs/dva)

[webpack 配置文件生成工具](https://webpack.jakoblind.no/)

## 示例一

webpack 检测 node_modules 里某个包的 实际路径，并拷贝文件到项目 src 里

```js
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs')
const path = require('path')
const mxgraph = path.resolve(__dirname, 'node_modules/mxgraph')
// console.log('xxx1', mxgraph);
let mxReal
try {
  mxReal = fs.realpathSync(mxgraph)
} catch (error) {
}

// webpack 里 plugin 设置增加 copy 插件
new CopyPlugin(
  // [{ from: mxReal + '/javascript/src/', to: 'dest' }]
  [
    mxReal + '/javascript/src/',
    { from: __dirname + '/src/routes/Designer/Editor/images', to: 'images' },
    { from: __dirname + '/src/routes/Designer/Editor/resources', to: 'resources' }
  ]
)
```
