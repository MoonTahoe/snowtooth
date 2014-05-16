var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('news', { title: 'News' });
});

module.exports = router;
