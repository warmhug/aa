var fs = require('fs')
var path = require('path')

var _dir = path.join(__dirname, '../src');

module.exports = fs.readdirSync(_dir).reduce(function (entries, dir) {
  if (fs.statSync(path.join(_dir, dir)).isDirectory()) {
    entries[dir] = path.join(_dir, dir, 'index.js')
  }
  return entries
}, {})