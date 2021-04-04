var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('company/retail');
});

router.get('/', function(req, res, next) {
    res.render('company/whole', {wholeidx: req.query.wholeidx});
});

router.get('/', function(req, res, next) {
    res.render('company/sole');
});

router.get('/', function(req, res, next) {
    res.render('company/factory');
});

router.get('/', function(req, res, next) {
    res.render('company/sales');
});

router.get('/', function(req, res, next) {
    res.render('company/etc');
});



module.exports = router;
