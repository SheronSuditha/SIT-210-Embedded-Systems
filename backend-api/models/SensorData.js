const mongoose = require('mongoose');
module.exports = mongoose.model('sensordata', new mongoose.Schema({
    id: String,
    bay_id: String,
    st_marker_id: String,
    status: String,
    location: String,
    lat: String,
    lon: String
}))