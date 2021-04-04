var express = require('express');
var router = express.Router();

router.get('/calc', function(req, res, next) {
    res.render('common/calc', {price : req.query.price});
});

router.get('/topNav', function(req, res, next) {
    res.render('common/topNav');
});

router.get('/sidebar', function(req, res, next) {
    res.render('common/sidebar');
});

router.get('/bottomNav', function(req, res, next) {
    res.render('common/bottomNav');
});


module.exports = router;
