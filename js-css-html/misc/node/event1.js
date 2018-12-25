var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

function inputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
        flags: 'a',
        encoding: 'utf8',
        mode: 0666
    });
}

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function (input) {
    var command = input.toString().trim().substr(0, 3);
    switch (command) {
        case 'wr:':
            return this.emit('write', input.substr(3, input.length));
        case 'en:':
            return this.emit('end');
        default:
            return this.emit('echo', input);
    }
};

var ic = new inputChecker('Shelley', 'output');

ic.on('write', function (data) {
    return this.writeStream.write(data, 'utf8');
});

ic.on('echo', function (data) {
    return console.log(this.name + ' wrote ' + data);
});

ic.on('end', function () {
    return process.exit();
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (input) {
    return ic.check(input);
});
