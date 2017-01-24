const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');

const config = require('./config/config.default');

const app = new Koa();
const router = new Router();

// start port
const port = config.port || 3000;

// log
app.use(logger());

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port);
