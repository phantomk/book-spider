const redis = require('redis');

const config = require('../config/config.default')().redis;

const client = redis.createClient(config.port, config.host);

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

client.set('string key', 'string val', redis.print);
