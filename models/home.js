var mongoose = require('mongoose');

var homeSchema = mongoose.Schema({
    id: String,
    url: String,
    text: String
});


var dbModel = mongoose.model('home', homeSchema, 'home');
var model = dbModel;

module.exports = {
    model: model,
    injectModel: function (m) {
        model = m;
    },
    resetModel: function () {
        model = dbModel;
    },
    fetch: function (done) {
        var count,
            id,
            done;

        if (typeof arguments[0] == "string") {
            id = arguments[0];
            done = arguments[1]
        } else if (typeof arguments[0] == "number") {
            count = arguments[0];
            done = arguments[1];
        } else if (typeof arguments[0] == "function") {
            done = arguments[0];
        }

        if (id) {

            model.findOne({ 'id': id }, function (err, img) {
                if (err) throw err;
                done(img);
            });

        } else if (count) {

            model.find().limit(count).exec(function (err, imgs) {
                if (err) throw err;
                done(imgs);
            });

        } else {

            model.find().exec(function (err, imgs) {
                if (err) throw err;
                done(imgs);
            });

        }
    }
};