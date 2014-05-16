var express = require('express');
var router = express.Router();
var home = require('../models/home').home;

router.get('/', function (req, res) {


    home.find(function (err, docs) {

        var model;

        if (err) {
            throw err;
        } else {

            res.render('index', {
                title: 'Snowtooth Mountain',
                description: 'The official website for the snowtooth ski resort',
                imgs: docs
            });

        }

    });


});

module.exports = router;
