"use strict";

var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var port = 8088;

process.env.PWD = process.cwd()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

// res.locals is an object passed to engine
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.set('view engine', 'ejs');

app.use(express.static(process.env.PWD + '/app/public'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app/views/pages'));

app.use('/', require('./app/routers'));

app.use('/carts', require('./app/routers/cartRouter'));

app.use('/products', require('./app/routers/productRouter'));

app.use('/users', require('./app/routers/userRouter'));


// app.use('/login', require('./app/routers/loginRoutes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('err',{title: 'Page error'});
});

app.listen(port);
