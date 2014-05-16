var mongoose = require('mongoose');

var homeSchema = mongoose.Schema({
    id: String,
    url: String,
    text: String
});

module.exports.home = mongoose.model('home', homeSchema, 'home');
