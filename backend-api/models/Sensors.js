const mongoose = require('mongoose');
module.exports = mongoose.model('Sensor', new mongoose.Schema({
    id: String,
    name: String,
    location: {
        lat: Number,
        lon: Number
    }
}))