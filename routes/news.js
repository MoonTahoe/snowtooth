var express = require('express');
var router = express.Router();
var newsModel = require('../models/news');

var dataModel = newsModel
var model = dataModel;

function getNews(req, res) {
    model.fetch(function(articles) {
        res.render('news', {
            title: 'Snowtooth News',
            description: 'Check out what is happening around the mountian',
            news: articles
        });
    });
}

function getArticle(req, res) {
    model.fetch(req.params.title.replace(/-/g, ' '), function(article) {
        res.render('article', article);
    });
}

router.get('/', getNews);
router.get('/:title', getArticle);

module.exports = {
    router: router,
    get: {
        news: getNews,
        article: getArticle
    },
    setModel: function(m) {
        model = m;
    },
    resetModel: function() {
        model = dataModel;
    }
}
