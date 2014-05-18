var express = require('express');
var router = express.Router();
var calendar = require('../models/calendar');

router.get('/', function (req, res) {

    calendar.fetch(function(events) {
        res.render('calendar', {
            title: 'Events at Snowtooth',
            description: 'When the skiing is over the fun begins, check out these awesome events',
            events: events
        });
    });

});

router.get('/:title', function(req, res) {

    calendar.fetch(req.params.title.replace(/-/g,' '), function(event) {
        res.render('event', event);
    });

});

module.exports = router;
