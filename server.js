const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('/client/index.html');
});

const server = app.listen(8000, () => {
  console.log('Server started on port 8000');
});
const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('login', (login) => {
    users.push({name: login.name, id: socket.id});
    socket.emit('login');
    socket.broadcast.emit('join', {name: login.name})
    console.log(`Server added user: ${login.name} with id: ${socket.id}`);
  })
  socket.on('message', (message) => { 
    console.log('Oh, I\'ve got message from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    const index = users.findIndex(u => u.id === socket.id);
    if (index >= 0) {
      const name = users[index].name    
      users.splice(index, 1);
      io.emit('leave', { name: name });
      console.log(`Server removed user with id: ${socket.id}`);
    }
  });

});
