var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

//Database configuration and connection
var dbConfig = require('./config/database.js');
mongoose.connect(dbConfig.url);

// Requiring our routes
var routes = require('./routes/index').router;
var users = require('./routes/users').router;
var news = require('./routes/news').router;
var calendar = require('./routes/calendar').router;

var app = express();

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'rippersgonnaripsnowtoothusa' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Adding JSON for CORS Request
app.use(function(req, res, next) {

    if (req.headers.accept.indexOf('application/json') != -1 || req.headers.accept.indexOf('text/javascript') != -1) {

        req.ajax = true;

        res.header('Content-Type', 'application/json')
            .header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
            .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            .header('Access-Control-Allow-Origin', '*');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }

    } else {
        next();
    }

});

// Our Main Routes
app.use('/', routes);
//app.use('/users', users)(app, passport);
app.use('/calendar', calendar);
app.use('/news', news);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
