const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});
let users = [];

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('user name', function(msg) {
    users.push(msg);
    io.emit('message', `Welcome to the chat ${msg}!!`);
  });
  console.log(users);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});