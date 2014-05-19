var express = require('express');
var router = express.Router();
var calendarModel = require('../models/calendar');

var dataModel = calendarModel;

function getCalendar(req, res) {
    dataModel.fetch(function(events) {
        res.render('calendar', {
            title: 'Events at Snowtooth',
            description: 'When the skiing is over the fun begins, check out these awesome events',
            events: events
        });
    });
}

function getEvent(req, res) {
    dataModel.fetch(req.params.title.replace(/-/g,' '), function(event) {
        res.render('event', event);
    });
}

router.get('/', getCalendar);
router.get('/:title', getEvent);

module.exports = {
    router: router,
    get: {
        calendar: getCalendar,
        event: getEvent
    },
    setModel: function(m) {
        dataModel = m;
    },
    resetModel: function() {
        dataModel = calendarModel;
    }
};
