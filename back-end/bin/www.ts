#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';

//Enviroment Messages
//#   Menssagens
process.env.MSG_SUCCESS="Operação realizada com sucesso."
process.env.COMPANY_ADDED='Empresa cadastrada.'
process.env.COMPANY_UPDATED='Dados da empresa atualizados.'
process.env.COMPANY_DELETED='Empresa excluida.'
//#   Error MESSAGES
process.env.ERR500="Internal server error."
process.env.ERR400="Client-side input fails validation."
process.env.ERR404="Resource is not found."


var debug = require('debug')('src:server');
import { createServer } from 'http';


    /**
   * Get port from environment and store in Express.
   */

    var port = normalizePort(process.env.PORT || '3000');
    //set('port', port);

    /**
     * Create HTTP server.
     */

    var server = createServer(app);


    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val: string) {
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

    function onError(error: { syscall: string; code: any; }) {
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
      let addr = server.address();
      if (addr)
        var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
      else var bind = 'null'
      debug('Listening on ' + bind);
    }

