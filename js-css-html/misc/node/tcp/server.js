
var net = require('net');

var server = net.createServer(function (socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
    socket.on('data', function (data) {
        console.log( data + ' from ' + socket.remoteAddress + ' ' + socket.remotePort );
        socket.write('repeating: ' + data);
    });
    socket.on('close', function () {
        console.log( 'client closed connection' );
    })
});

server.listen(1337, '127.0.0.1');