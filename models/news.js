var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    content: String,
    author: String,
    date: Date
});

var dbModel = mongoose.model('news', newsSchema, 'news');
var model = dbModel;

module.exports = {

    model: model,
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

            model.findOne({ 'title': title }, function (err, articles) {
                if (err) throw err;
                done(articles);
            });

        } else if (count) {

            model.find().sort({ 'date': 1 }).limit(count).exec(function (err, articles) {
                if (err) throw err;
                done(articles);
            });

        } else {

            model.find().sort({ 'date': 1 }).exec(function (err, articles) {
                if (err) throw err;
                done(articles);
            });

        }

    }

};
