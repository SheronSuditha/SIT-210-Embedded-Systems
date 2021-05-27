const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const PORT = 3005;
const server = http.createServer(app);
const { Server } = require("socket.io");

/*
INFO: Socket server will act as the main reply and the entry point for sensors. 
    Sensors -> Socket Server -> Express Server -> (Mongodb) -> FrontEnd
        Front end will also be replayed to the Socketserver, IF view live feed is ticked. 
*/

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


var sensors = new Array();
var clients = new Array();
var mainApiEndpoint;

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

    socket.on('server:init', (data) => {
        mainApiEndpoint = socket;
        logToConsole(`New connection: ${socket.id}#server`);
    })

    socket.on('disconnect', () => {
        console.log(`Socket Disconnected: ${socket.id}`)
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
        message: "Relay server is online"
    })
});

app.get('/connection-stats', async (req, res) => {
    res.json({
        clients,
        sensors,
        server
    })
})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});