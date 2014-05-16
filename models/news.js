var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    content: String,
    author: String,
    date: Date
});

module.exports.news = mongoose.model('news', newsSchema, 'news');
