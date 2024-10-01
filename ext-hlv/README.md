# ext-hlv

https://code.visualstudio.com/api

[configuration](https://code.visualstudio.com/api/references/contribution-points#Configuration-property-schema)
[schema](http://json-schema.org/draft-07/schema#)

- https://dev.azure.com/warmhug
- https://marketplace.visualstudio.com/manage/publishers/warmhug

```sh
# 使用 node@16 和 pnpm 会报错，使用 node@18 npm
sudo npm install -g @vscode/vsce
npm i
# 先进入到 扩展目录 打包，生成 vsix 文件
vsce package
# 安装扩展
code --install-extension ext-hlv-0.0.1.vsix
```
