
var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
  name: 'byvoid',
  email: 'byvoid@byvoid.com',
  address: 'Zijing 2#, Tsinghua University'
});
console.log( contents );

var options = {
    host: 'localhost',
    port: 1337,
    path: '/file=test',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contents.length
    }
};

for (var i = 0; i < 5; i++) {
    var req = http.request(options, function(res) {
        console.log( 'finished request' );
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log(data);
        });
    });
    req.write(contents);
    req.end();
}
