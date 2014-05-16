var express = require('express');
var router = express.Router();
var home = require('../models/home').home;
var calendar = require('../models/calendar').calendar;

router.get('/', function (req, res) {

    home.find(function (err, imgs) {

        if (err) throw err;
        calendar.find().sort({ 'start': 1 }).limit(4).exec(function (err, events) {

            if (err) throw err;
            res.render('index', {
                title: 'Snowtooth Mountain',
                description: 'The official website for the snowtooth ski resort',
                imgs: imgs,
                calendar: events
            });

        });

    });

});

module.exports = router;
