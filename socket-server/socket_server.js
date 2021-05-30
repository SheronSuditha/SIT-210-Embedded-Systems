const dotenv = require('dotenv');
dotenv.config();
var fs = require('fs')
const express = require('express');
const app = express();
var http;
var server;
if (process.env.BRANCH === "prod") {
    http = require('https');
    server = http.createServer({
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
    }, app);
} else if (process.env.BRANCH === "dev") {
    http = require('https');
    server = http.createServer(app);
}
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
        socket.emit('sensor:ack')
        socket.join('sensor');
        sensors.push(socket);
        logToConsole(`New connection: ${socket.id}#sensor`);
    })

    socket.on('client:init', (data) => {
        clients.push(socket);
        socket.emit('client:ack')
        socket.join('client');
        logToConsole(`New connection: ${socket.id}#client`);
    })

    socket.on('server:init', (data) => {
        mainApiEndpoint.push(socket)
        socket.emit('server:ack')
        socket.join('server')
        logToConsole(`New connection: ${socket.id}#server`);
    })

    socket.on('sensor:res:data', ({ sensor_id, data_result }) => {
        io.to('client').emit('client:data:relay', { id: sensor_id, ultrasonic_state: data_result.ultrasonic, photosensor_state: data_result.photosensor })
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
                    clients.splice(index, 1);
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

setInterval(() => {
    reqDataFromGroundSensors();
}, 2000);

function reqDataFromGroundSensors() {
    io.to('sensor').emit('sensor:req:data');
}


app.get('/', (req, res) => {
    res.json({
        state: true,
        message: "Relay server is online"
    })
});

app.get('/connection-stats', async (req, res) => {
    res.json({
        clients: clients.map(c => c.id),
        sensors: sensors.map(b => b.id),
        server: mainApiEndpoint.map(a => a.id)
    })
})

server.listen(process.env.BRANCH === "prod" ? process.env.PORT : process.env.DEV_PORT, () => {
    console.log(`Current Branch: ${process.env.BRANCH}\nlistening on :${process.env.BRANCH === "dev" ? process.env.DEV_PORT : process.env.PORT}`);
});