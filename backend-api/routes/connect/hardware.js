const router = require('express').Router();
const Sensor = require('../../models/Sensors');

router.get('/', async (req, res) => {
    res.json({
        state: true,
        message: "Add Sensors, to the platform.",
        methods: "POST",
        access: "Admins"
    })
})


router.post('/register-sensor', async (req, res) => {
    const { sensor_name, sensor_lat, sensor_lon } = req.body;
    const sensor = new Sensor({
        name: sensor_name,
        location: {
            lat: sensor_lat,
            lon: sensor_lon
        }
    })
    try {
        const savedSensor = await sensor.save()
        res.status(200).json({
            message: "Sensor added to the platform",
            details: savedSensor
        })
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})

router.post('/remove-sensor', async (req, res) => {
    const { sensor_id } = req.body;
    try {
        const sensor_ = await Sensor.findOneAndDelete({
            _id: sensor_id
        })
        if (!sensor_) return res.status(403).json({
            message: "Unable to find sensor"
        })

        res.status(200).json({
            message: "Sensor removed from the platform",
            details: sensor_
        })
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})




