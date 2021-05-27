const express = require('express');
const app = express();
const http = require('http');
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

let sensors = new Array();
let clients = new Array();
let mainApiEndpoint = new Array();

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
        mainApiEndpoint.push(socket)
        logToConsole(`New connection: ${socket.id}#server`);
    })

    socket.on('disconnect', () => {
        console.log(`Socket Disconnected: ${socket.id}`)
        let soc_id = socket.id;
        setTimeout(() => {
            sensors.forEach((element, index, obj) => {
                let id = element.id;
                if (id === soc_id) {
                    sensors.splice(index, 1);

                } else {

                }
            });

            clients.forEach((element, index, obj) => {
                let id = element.id;
                if (id === soc_id) {
                    mainApiEndpoint.splice(index, 1);
                } else {
                }
            });
            mainApiEndpoint.forEach((element, index, obj) => {
                let id = element.id;
                if (id === soc_id) {
                    mainApiEndpoint.splice(index, 1);

                } else {

                }
            });
        }, 1000);

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
        server: mainApiEndpoint.map(a => a.id)
    })
})

server.listen(3005, () => {
    console.log(`listening on :${3005}`);
});