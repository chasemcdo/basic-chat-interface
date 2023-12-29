import { NextFunction, Request, Response } from "express";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var healthRouter = require('./routes/health');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS: Set to correct origin in production ie http://localhost:3000 for dev
// Would be best handle via an environment variable
app.use(cors({origin: '*'}));
app.use('/health', healthRouter);
app.use('/', indexRouter);
app.use('/users/msg', usersRouter); // omitted :id in favour of using passport auth

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
