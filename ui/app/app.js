var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var commonRouter = require('./routes/common');
var companyRouter = require('./routes/company');
var heplRouter = require('./routes/help');
var homelRouter = require('./routes/home');
var mapRouter = require('./routes/map');
var mypageRouter = require('./routes/mypage');
var priceRouter = require('./routes/price');
var productRouter = require('./routes/product');
var shoppingRouter = require('./routes/shopping');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var ejs = require('ejs');
ejs.delimiter = '$';
app.engine('ejs', ejs.renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.page = req.url;
  next();
});

app.use('/', homelRouter);
app.use('/auth', authRouter);
app.use('/common', commonRouter);
app.use('/company', companyRouter);
app.use('/help', heplRouter);
app.use('/map', mapRouter);
app.use('/mypage', mypageRouter);
app.use('/price', priceRouter);
app.use('/product', productRouter);
app.use('/shopping', shoppingRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// app.listen(3000, function(){
//   console.log(`App listening on port 3000!`)
// });
