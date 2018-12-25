/*eslint-disable no-console */
var fs = require('fs')
var path = require('path')
var express = require('express')
var rewrite = require('express-urlrewrite')
var directory = require('serve-index');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpack = require('webpack')
var WebpackConfig = require('./webpack.config')
var ens = require('./scripts/getEntry');

// 给每个 entry 添加 babel-polyfill 支持
for (var key in ens) {
  if (ens.hasOwnProperty(key)) {
    ens[key] = ['babel-polyfill', ens[key]];
  }
}
WebpackConfig.entry = ens;

var app = express()
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/dist/',
  stats: {
    colors: true
  }
}))

var fs = require('fs')
var path = require('path')

function makeTpl(file, isMobile) {
  return `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${file}</title>
    <link rel="stylesheet" href="/dist/${file}.css" />
    ${isMobile ?
    `<!-- 高清方案脚本 -->
    <script src="https://os.alipayobjects.com/rmsportal/lvEQQbNgHsIxVfXLkmuX.js"></script>
    `
    : '<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width"/>'}
  </head>
  <body>
    <div id="example"/>
    <script src="https://as.alipayobjects.com/g/component/react/15.3.2/react.js"></script>
    <script src="https://as.alipayobjects.com/g/component/react/15.3.2/react-dom.js"></script>
    <script src="/dist/shared.js"></script>
    <script src="/dist/${file}.js"></script>
    <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
    <script>
    if ('addEventListener' in document) {
      window.addEventListener('load', function() {
        FastClick.attach(document.body);
      }, false);
    }
    </script>
  </body>
  </html>
  `
}

var _dir = path.join(__dirname, './src');

fs.readdirSync(_dir).forEach(function (file) {
  var st = fs.statSync(path.join(_dir, file))
  if (st.isDirectory()) {
    app.get('/' + file, function(req, res) {
      file === 'antdm' ? res.send(makeTpl(file, true)) : res.send(makeTpl(file));
    })
  }
})

app.use(express.static(_dir))
app.use(directory(_dir));

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
