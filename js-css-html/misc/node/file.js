
var util = require('util');
var fs = require('fs');

//var data = fs.readFileSync('./test.txt', 'utf8'); // ͬ����ȡ
//console.log(data);

//fs.readFile('./test.txt', 'utf8', function (err, data) {
//    console.log(data);
//});
//fs.writeFile('./test.txt', 'Hello World', function (err) {
//    if (err) throw err;
//    console.log('File write completed');
//});

//fs.open('./test.txt', 'w', function (err, fd) {
//    if (err) throw err;
//    var buf = new Buffer('bbbbb\n');
//    fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
//        if (err) throw err;
//        console.log(err, written, buffer);
//        fs.close(fd, function () {
//            console.log('Done');
//        });
//    });
//});

//fs.open('./test.txt', 'r', function (err, fd) {
//    if (err) throw err;
//    var buf = new Buffer(5);
//    fs.read(fd, buf, 0, buf.length, null, function (err, bytesRead, buffer) {
//        if (err) throw err;
//        console.log(err, bytesRead, buffer);
//        fs.close(fd, function () {
//            console.log('Done');
//        });
//    });
//});

//var path = './';
//fs.readdir(path, function (err, files) {
//    if (err) throw err;
//    files.forEach(function (file) {
//        console.log(path + file);
//        fs.stat(path + file, function (err, stats) {
//            console.log(stats);
//        });
//    });
//});

//fs.mkdir('./newdir', 0666, function (err) {
//    if (err) throw err;
//    console.log('Created newdir');
//    fs.rmdir('./newdir', function (err) {
//        if (err) throw err;
//        console.log('Removed newdir');
//    });
//});

//var file = fs.createReadStream('./test1.txt', { flags: 'r' });
//var out = fs.createWriteStream('./test.txt', { flags: 'w' });
//file.on('data', function (data) {
//    console.log('data', data);
//    out.write(data);
//});
//file.on('end', function () {
//    console.log('end');
//    out.end(function () {
//        console.log('Finished writing to file');
//        //out.done();
//    });
//});

// fs.unlinkSync('./a/b.txt');
// console.log('successfully deleted ');

// var file = fs.createReadStream('./test.txt', { flags: 'r' });
// var out = fs.createWriteStream('./test1.txt', { flags: 'w' });
// file.pipe(out);


console.log('Current directory: ', process.cwd(), __dirname);

const glob = require('glob');
glob(__dirname + '/**/*.html', {}, (err, files)=>{
  console.log(files)
})

fs.realpath('./etc/passwd', function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
});

fs.exists('./etc/passwd', function (exists) {
  util.debug(exists ? "it's there" : "no passwd!");
});
