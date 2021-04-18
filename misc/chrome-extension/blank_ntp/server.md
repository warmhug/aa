
## 1、Python 服务器 (无逻辑)

```sh
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs
python -m http.server 9998  or  python -m SimpleHTTPServer 9998
```


## 2、制作 NPM 服务器 (有逻辑)

```sh
npm i
npm start
```

访问 http://localhost:9998/?joke=1/2


```sh
# 使用 forever 背景线程启动
npm install forever -g
forever start server.js
forever stopall
forever list
```
