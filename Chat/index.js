const express = require('express');
const { path } = require('express/lib/application');
const res = require('express/lib/response');
const app = express();
const http = require('http');
const { dirname } = require('path');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);



app.set('view engine', '.ejs');


// Chat İçin Username 
app.get('/', (req, res) => {
  res.render('login');
});

io.on('login', (socket) => {
  console.log('login');

 
  socket.on('login',() => {
    io.emit('login' );
  });


});



// Chat Odası

app.get('/chat', (req, res) => {
  res.render('chat');
});
var online = 0;

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
  console.log('Bağlandı');
  online += 1;
  console.log('Online Kullanıcı Sayısı: '+online);


  socket.on('typing',data => {
    io.emit('typing',data)
  }); 

  socket.on('mesaj ',(msg) => {
    io.emit('mesaj ', msg); 
  }); 
  
 
  socket.on('disconnect', () => {
    console.log("Kullanıcı Ayrıldı");
    online -= 1;
    console.log('Kalan Kullanıcı Sayısı: '+online);
  });
  
  
  
});



// Port Dinleme
server.listen(3000, () => {
  console.log('Port Dinlemede :3000');
});
