var express = require('express');
var router = express.Router();
var news = require('../models/news').news;

/* GET users listing. */
router.get('/', function(req, res) {

    news.find().sort({ 'date': 1 }).exec(function (err, articles) {

        if (err) throw err;
        res.render('news', {
            title: 'Snowtooth News',
            description: 'Check out what is happening around the mountian',
            news: articles
        });

    });

});

router.get('/:title', function(req, res) {

    news.findOne({ title: req.params.title.replace(/-/g, ' ') }, function(err, article) {
        if (err) throw err;
        res.render('article', article);
    })

});

module.exports = router;
