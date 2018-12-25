
var util = require('util');

// util.inspect()
function Person() {
  this.name = 'byvoid';
  
  this.toString = function() {
    return this.name;
  };
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj, true));


// util.inherits()
function base() {
    this.name = 'base';
    this.say = function () {
        console.log('say ' + this.name);
    }
}
base.prototype.show = function () {
    console.log(this.name);
}

function sub() {
    this.name = 'sub';
}
util.inherits(sub, base);

var baseobj = new base();
baseobj.say();
baseobj.show();
console.log(baseobj);

var subobj = new sub();
subobj.show();
console.log(subobj);