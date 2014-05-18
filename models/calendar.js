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

var model = mongoose.model('calendar', calendarSchema, 'calendar');

module.exports = {

    model: model,
    fetch: function (done) {

        var count,
            title,
            done;

        if (typeof arguments[0] == "string") {
            title = arguments[0];
            done = arguments[1]
        } else if (typeof arguments[0] == "number") {
            count = arguments[0];
            done = arguments[1];
        } else if (typeof arguments[0] == "function") {
            done = arguments[0];
        }

        if (title) {

            model.findOne({ 'title': title }, function (err, event) {
                if (err) throw err;
                done(event);
            });

        } else if (count) {

            model.find().sort({ 'start': 1 }).limit(count).exec(function (err, events) {
                if (err) throw err;
                done(events);
            });

        } else {

            model.find().sort({ 'start': 1 }).exec(function (err, events) {
                if (err) throw err;
                done(events);
            });

        }

    }

};
