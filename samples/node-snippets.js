
const { resolve, extname } = require('path');
const { readdir, writeFile } = require('fs').promises;

/**
对 某个目录下 的文件进行索引， 并生成文件名的 html a 标签
*/
async function createFileIndex(dirPath) {
  async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
  }
  getFiles(dirPath).then(results => {
    const html = `<ul>` +
    results.filter(item => extname(item) === '.html').map(fileOrDirectory =>
      `<li style="margin: 5px 0;">
        <a href="https://warmhug.github.io/${fileOrDirectory.replace(__dirname, '')}" target="_top">
          https://warmhug.github.io/${fileOrDirectory.replace(__dirname, '')}
        </a>
      </li>
      `).join('\n') + `</ul>`;

    writeFile('index.html', `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samples</title>
  </head>
  <body>
    <div style="margin: 5px;">
      GitHub 地址 <a href="https://github.com/warmhug/" target="_top">https://github.com/warmhug/</a>
    </div>
    ${html}
  </body>
  </html>`, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
}
createFileIndex('./samples/');


/*
node server

package.json
{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "start": "node ./server-my.js"
  },
  "dependencies": {
    "fs-extra": "^0.30.0",
    "node-static": "~0.7.9",
    "probe-image-size": "~2.1.1",
    "through2": "^2.0.3"
  }
}

访问 http://localhost:9998/?joke=1/2

```sh
# 使用 forever 背景线程启动
npm install forever -g
forever start server.js
forever stopall
forever list
```
*/

var http = require('http');
var url = require('url');
var fs = require('fs-extra');
var path = require('path');
var static = require('node-static');
var probe = require('probe-image-size');
var through2 = require('through2')

var excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) this.push(item)
  next()
})

var port = 9998;
var jsonContentType = 'application/json; charset=utf-8';

var enumExts = ['jpg', 'jpeg', 'gif', 'png'];
var local1 = '/Users/hua/Downloads/Test\ Dir/test.txt';
var local2 = '/Users/hua/Downloads/Test\ Dir/subdir';

function handleJoke2(res) {
  var items = [];
  var dirName;
  // fs.walk(local2).pipe(excludeDirFilter).on('data', function (item) {
  fs.walk(local2).on('data', function (item) {
    // 过滤掉 子目录 内容
    if (item.stats.isDirectory() && item.path !== local2) {
      dirName = item.path;
      // console.log(item.path)
    }
    if (item.path.indexOf(dirName) === 0) {
      return;
    }
    var fileDir = item.path;
    var extname = path.extname(fileDir);
    var ext = extname && extname.substr(1);
    if (ext && enumExts.indexOf(ext) > -1) {
      items.push({ url: 'http://localhost:' + (port - 1) + '/' + path.basename(fileDir),
        width: probe.sync(fs.readFileSync(fileDir)).width });
    }
  }).on('end', function () {
    // console.log(items)
    if (items.length) {
      res.writeHead(200, {'Content-Type': jsonContentType});
      res.end(JSON.stringify(items));
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
  })
}

http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var query = parsedUrl.query;

  if (query.joke == '1') {
    // 设置 json 类型
    // var content = fs.readFileSync(local1).toString().split('\n\n');
    // response.writeHead(200, {'Content-Type': jsonContentType});
    // response.end(JSON.stringify(content));
    response.end(fs.readFileSync(local1).toString());
  }
  if (query.joke == '2') {
    handleJoke2(response);
  }
}).listen(port);

// Server Specific picture, e.g. http://localhost:9997/_bizhi5.jpg
var file = new static.Server(local2, { cache: 72, headers: {'X-Hello':'World!'} });
http.createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response, function (err, res) {
      if (err) { // An error as occured
        console.error("> Error serving " + request.url + " - " + err.message);
        response.writeHead(err.status, err.headers);
        response.end();
      } else {
        console.log("> " + request.url + " - " + res.message);
      }
    });
  }).resume();
}).listen(port - 1);

console.log('> main server running on port ' + port);
console.log('> static server running on port ' + (port - 1));


/**
 * 2021
 * webpack 检测 node_modules 里某个包的 实际路径，并拷贝文件到项目 src 里
 */
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
);





var fs = require('fs');
var http = require('http');
// const glob = require('glob');
const os = require('os');
const path = require('path');

console.log(os.homedir());
console.log(process.env.HOME, process.env.HOMEPATH, process.env.USERPROFILE);
console.log(process.argv, process.execPath, process.version, process.uptime());
console.log('Current directory: ', process.cwd(), __dirname);

const cwd = process.cwd();
// node node-test.js
// node ./misc/node-test.js
console.log('cwd: ', cwd, __dirname);
console.log('join: ', path.join(cwd, 'packages', 'aa'));
console.log('resolve: ', path.resolve(__dirname, './package.json'));


function walk(dir, filter) {
  var results = []
  fs.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file, filter))
    } else {
      filter(file) && results.push(file)
    }
  });
  return results
}

var arr = [];
[os.homedir() + '/Downloads'].forEach(function (appPath) {
  var temp = walk(appPath, function(file) {
    return /\.html$/.test(file)
  });
  arr = arr.concat(temp)
});
console.log('arr: ', arr);

fs.readFile('./node.js', 'utf8', function (err, data) {
  console.log('读取成功');
});

process.nextTick(function () {
  // 在事件循环的下次循环中执行callback.这不是一个简单的setTimeout(fn,0)的别名.它的效率要高很多.
  console.log('nextTick callback');
});

process.on('cleanup', function noOp() {});

// do app specific cleaning before exiting
process.on('exit', function () {
  process.emit('cleanup');
});

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  process.exit(2);
});

//
http.createServer(function (req, res) {
  var query = require('url').parse(req.url).query;
  var parm1 = require('querystring').parse(query).parm1 || './node.js';
  console.log(req.url, query);

  function run1 () {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //模拟一个长计算
    for (var i = 0; i < 10; i++) {
      res.write(i.toString() + '...');
    }
    //模拟一个超时
    setTimeout(function () {
      fs.readFile(parm1, 'utf-8', function (err, data) {
        if (err) {
          // res.write('error');
          res.end(err.toString());
        } else {
          res.end(data);
        }
      })
    }, 2000);
  }
  // return run1();

  return fs.stat(parm1, function (err, stats) {
    console.log('stat: ', err, stats);
    if (err) {
      res.writeHead(404);
      res.write('Bad request 404\n');
      return res.end();
    } else if (stats.isFile()) {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;

      // 创建文件流读取，替代fs.readFile方法
      var file = fs.createReadStream(parm1);
      file.on('open', function () {
        return file.pipe(res);
      });
      return file.on('error', function (err) {
        return console.log(err);
      });
    } else {
      res.writeHead(403);
      res.write('Directory access is forbidden');
      return res.end();
    }
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337?file=node.js');
