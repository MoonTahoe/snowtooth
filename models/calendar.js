var mongoose = require('mongoose');

var calendarSchema = mongoose.Schema({
    id: String,
    title: String,
    img: String,
    start: Date,
    end: Date,
    description: String,
    html: String
});

module.exports.calendar = mongoose.model('calendar', calendarSchema, 'calendar');
