
if(process.env.NODE_ENV === 'production' && !process.env.IGNORE_NEWRELIC) {
  require('newrelic');
}

var fs = require('fs');
try {
    fs.accessSync('./.env', fs.F_OK);
} catch (e) {
    console.log('Can\'t find the .env file. Please place one in the current dir');
    process.exit();
}

process.on('uncaughtException', e => console.error(e));
process.on('unhandledRejection', reason => console.error(reason));

require('dotenv').config({ silent: true });

require('babel-register');
require('babel-polyfill');

require('./primus/server');

require('./src/core/event-loop');