var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('product/index', {idx : req.query.idx});
});

router.get('/findItem', function(req, res, next) {
    res.render('product/findItem');
});

module.exports = router;
