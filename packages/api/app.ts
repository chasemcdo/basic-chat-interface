import { NextFunction, Request, Response } from "express";
import env from "./utils/env";
import User from "./models/user";
import { ObjectId } from "mongodb";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var usersRouter = require('./routes/users');

var app = express();

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS: Set to correct origin in production ie http://localhost:3000 for dev
// Would be best handle via an environment variable
app.use(cors({origin: '*'}));

// Connect to MongoDB
mongoose.connect(env.MONGODB_URI).then(() => {
  // Create default user if it doesn't exist
  User.findByUsername('defaultuser', false).then((user) => {
    if (user) {
      console.log('Default user already exists');
      return;
    } else {
      new User({
        username: 'defaultuser',
        firstName: 'John',
        lastName: 'Doe',
        chatId: new ObjectId().toString(),
      }).save();
      console.log('Default user created');
    }
  })
});

app.use('/api/chats', usersRouter);

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

app.listen(env.PORT);

module.exports = app;
