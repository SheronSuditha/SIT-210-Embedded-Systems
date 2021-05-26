const e = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const PORT = 3005;
const {
    Server
} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


var sensors = new Array();
var clients = new Array();

io.on('connection', (socket) => {
    console.log(`New Socket with id: ${socket.id}`)
    socket.on('sensor:init', (data) => {
        sensors.push(socket);
        logToConsole(`New connection: ${socket.id}#sensor`);
    })

    socket.on('client:init', (data) => {
        clients.push(socket);
        logToConsole(`New connection: ${socket.id}#client`);
    })

    socket.on('disconnect', () => {
        if (sensors.find(socket) === undefined)
            return;
        else
            sensors = sensors.filter(sensor => sensor != socket)
        if (clients.find(socket) === undefined)
            return;
        else
            clients == clients.filter(client => client != socket)
    })
});


function logToConsole(message) {
    console.log("[SOCKET SERVER] " + message);
}




app.get('/', (req, res) => {
    res.json({
        state: true,
        message: "Server is UP"
    })
});

app.get('/connection-stats', async (req, res) => {
    res.json({
        clients,
        sensors
    })
})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});