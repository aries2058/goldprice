var express = require('express');
var router = express.Router();

router.get('/basket', function(req, res, next) {
    res.render('shopping/basket');
});


module.exports = router;
