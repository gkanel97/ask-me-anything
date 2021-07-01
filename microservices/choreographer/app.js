const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');

const redis = require("./redis");
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

redis.init();

app.use('/', indexRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

// log errors
app.use(function(err, req, res, next) {
    const status = err.status || 500;
    if (status >= 500 || req.app.get('env') === 'development') {
        console.error(err.stack);
    }
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    const status = err.status || 500;
    res.status(status);
    // don't expose internal errors
    const message = status >= 500 ? "Something's wrong!" : err.message;
    // only expose the error stack for internal errors in development
    const expose = status >= 500 && req.app.get('env') === 'development';
    res.end(expose ? message + "\n\n" + err.stack : message);
});

module.exports = app;
