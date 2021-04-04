var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/join', function(req, res, next) {
  res.render('auth/join');
});

router.get('/findid', function(req, res, next) {
  res.render('auth/findId');
});

router.get('/changepw', function(req, res, next) {
  res.render('auth/changepw');
});


module.exports = router;
