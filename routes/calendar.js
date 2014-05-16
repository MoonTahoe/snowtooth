var express = require('express');
var router = express.Router();
var calendar = require('../models/calendar').calendar;

/* GET users listing. */
router.get('/', function (req, res) {

    calendar.find().sort({ 'start': 1 }).exec(function (err, events) {

        if (err) throw err;
        res.render('calendar', {
            title: 'Events at Snowtooth',
            description: 'When the skiing is over the fun begins, check out these awesome events',
            events: events
        });

    });

});

router.get('/:title', function(req, res) {

    calendar.findOne({ 'title': req.params.title.replace(/-/g,' ') }, function(err, event) {
        res.render('event', event);
    });

});

module.exports = router;
