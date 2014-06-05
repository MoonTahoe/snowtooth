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

var dbModel = mongoose.model('calendar', calendarSchema, 'calendar');
var model = dbModel;

module.exports = {

    injectModel: function (m) {
        model = m;
    },
    resetModel: function() {
        model = dbModel;
    },
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
