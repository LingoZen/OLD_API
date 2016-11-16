#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../dist/app');
// var app = require('../dist-prod/app');
var debug = require('debug')('LingoZen-2:server');
var https = require('https');
var http = require('http');
var tls = require('tls');
var fs = require("fs");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Set Server Credentials
 */
var privateKey = fs.readFileSync('./x509/prod-key.pem').toString();
var certificate = fs.readFileSync('./x509/prod-cert-public.pem').toString();
var credentials = tls.createSecureContext({
  key: privateKey,
  cert: certificate,
  passphrase: 'fuckmylife'
});

/**
 * Create HTTP server.
 */
// var server = https.createServer(credentials, app);
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
