var express = require('express');
var router = express.Router();

router.get('/splash', function(req, res, next) {
    res.render('home/splash');
});

router.get('/', function(req, res, next) {
    res.render('home/intro');
});

router.get('/main', function(req, res, next) {
    res.render('home/main', {price : req.query.price});
});

module.exports = router;
