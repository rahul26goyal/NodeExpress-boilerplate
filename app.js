const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const Routes = require('./routes/routes')
const MorganLogger = require('./lib/morgan-logger')

function webapp() {
  const app = express();
  //set env variables
  let mode = process.env.NODE_ENV
  dotenv.load({path : './config/.env.' + mode})
  //console.log("Environment var:::", process.env.AWS_ACCESS_KEY)

  //app setup
  app.set('host', process.env.QUBOLE_LOGINHOST || '0.0.0.0');
  app.set('port', normalizePort(process.env.PORT || process.env.QUBOLE_LOGINHPOST || '3000'));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(MorganLogger(mode));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  //console.log("Routes:::", Routes)
  //app.get('/', )
  let routes = new Routes(app, {})
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
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

  //returnt the app object
  return app;
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = webapp;
