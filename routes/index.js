var express = require('express');
var router = express.Router();
var home = require('../models/home');
var calendar = require('../models/calendar');

var dataModels = {
    home: home,
    calendar: calendar
};

var models = dataModels;

function getIndex(req, res) {

    models.home.fetch(function (imgs) {

        if (req.ajax) {
            res.status = 200;
            res.send(imgs);
        } else {
            models.calendar.fetch(4, function (events) {
                res.render('index', {
                    title: 'Snowtooth Mountain',
                    description: 'The official website for the snowtooth ski resort',
                    imgs: imgs,
                    calendar: events
                });
            });
        }

    });
}

router.get('/', getIndex);

module.exports = {
    router: router,
    get: {
        index: getIndex
    },
    setModel: function (m) {
        models = m;
    },
    resetModel: function () {
        models = dataModels;
    }
}
