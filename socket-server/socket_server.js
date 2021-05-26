const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const PORT = 3005;
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`New Socket with id: ${socket.id}`)
    socket.on('hook:init', (data) => {
        console.log(`Receieved Init: ${socket.id}, ${data.type}`)
    })
});


app.get('/', (req, res) => {
    res.json({
        state: true,
        message: "Server is UP"
    })
});


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});