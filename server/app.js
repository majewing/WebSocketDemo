const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let clientSocket = null;

app.get('/getMessage', (req, res) => {
    res.send({
        data: 'hello world'
    });
});

app.post('/sendMessage', (req, res) => {
    if (clientSocket) {
        clientSocket.emit('message', new Date().toLocaleString());
    }
    res.send({
        data: 'done'
    });
});

server.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`listen host: ${host} port: ${port}`)
});

io.on('connection', (socket) => {
    console.log('socket connection');
    clientSocket = socket;

    socket.on('reply', (data) => {
        console.log('reply:', data);
    });
});