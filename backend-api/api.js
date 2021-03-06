const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const { io } = require('socket.io-client');
var socket = io(`${process.env.SOCKET_URI}`)

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        await next();
    }
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("[SERVER] DB connected."))
    .catch(error => console.log(error));


const connectRoute = require('./routes/connect/connect')
const publicRoute_sensorData = require('./routes/public/sensors');
const SensorData = require('./models/SensorData');


app.use('/api/connect', connectRoute)
app.use('/api/public', publicRoute_sensorData);

app.get('/', async (req, res) => {
    res.json({
        message: "Backend api is live."
    })
})

app.listen(process.env.PORT, () => {
    console.log(`[SERVER] Server started on: ${process.env.PORT}`);
})

socket.emit("server:init")
socket.on('disconnect', () => {
    socket = io(`${process.env.SOCKET_URI}`);
    socket.emit("server:init")
})

socket.on('reconnect', () => {
    socket.emit("server:init")
})

socket.on('server:get:ifchanged', async ({ sensor_id, data_result }) => {
    console.log("got evenr")
    const sensor = await SensorData.findOne({ bay_id: sensor_id });
    if (sensor.status === data_result.ultrasonic) {
        console.log("Same")
        const allLocations = await SensorData.find({});
        socket.emit('server:data:relay', ({ data: allLocations }))
    } else {
        console.log("updating")
        const sensor = await SensorData.findOne({ bay_id: sensor_id });
        sensor.status = data_result.ultrasonic;
        sensor.save();
        const allsensorsAfterUpdate = await SensorData.find({});
        socket.emit('server:data:relay', { data: allsensorsAfterUpdate })
    }
})




