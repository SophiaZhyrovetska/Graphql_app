const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    id: String,
    name:  String,
    surname: String
});

module.exports = mongoose.model('User', User);