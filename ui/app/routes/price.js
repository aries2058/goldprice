var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('price/index', {idx : req.query.idx});
});

module.exports = router;
