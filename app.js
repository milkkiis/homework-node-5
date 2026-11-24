var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Подключаем cors и body-parser
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Роутер с CRUD-операциями для items
var itemsRouter = require('./routes/items');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// Разрешаем кросс-доменные запросы (например, с React на другом порту)
app.use(cors());
// Разбираем JSON из тела запроса в req.body
app.use(bodyParser.json());
// Разбираем данные HTML-форм (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Все маршруты CRUD доступны по префиксу /api/items
app.use('/api/items', itemsRouter);

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