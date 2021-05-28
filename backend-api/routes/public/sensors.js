const router = require('express').Router()
const SensorData = require('../../models/SensorData');

router.get('/get-sensors', async (req, res) => {
    const sensors = await SensorData.find({})
    res.json({
        sensors
    })
})

router.get('/get-sensors/:max', async (req, res) => {
    const { max } = req.params;
    const sensors = await SensorData.find({}).limit(parseInt(max))
    res.json({
        sensors
    })
})

router.put('/put-sensors/:bayid/:streetmarker/:status/:location/:lat/:lon', async (req, res) => {
    try {
        const { bayid, streetmarker, status, location, lat, lon } = req.params;
        const sensor_ = new SensorData({
            bay_id: bayid !== undefined ? bayid : "err:490",
            st_marker_id: streetmarker !== undefined ? streetmarker : "err:490",
            status: status !== undefined ? status : "err:490",
            location: location !== undefined ? location : "err:490",
            lat: lat !== undefined ? lat : "err:490",
            lon: lon !== undefined ? lon : "err:490",
        })
        const sensors = await sensor_.save();
        console.log(sensors)
        res.json({
            sensors
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})



module.exports = router;