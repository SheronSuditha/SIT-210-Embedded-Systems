const mongoose = require('mongoose');
module.exports = mongoose.model('user', new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    pass: String,
    permLevel: String,
}))