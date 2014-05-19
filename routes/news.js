var express = require('express');
var router = express.Router();
var news = require('../models/news');

/* GET users listing. */
router.get('/', function(req, res) {

    news.fetch(function(articles) {

        res.render('news', {
            title: 'Snowtooth News',
            description: 'Check out what is happening around the mountian',
            news: articles
        });

    });

});

router.get('/:title', function(req, res) {

    news.fetch(req.params.title.replace(/-/g, ' '), function(article) {
        res.render('article', article);
    });

});

module.exports = router;
