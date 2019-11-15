'use strict';

const Koa = require('koa');
const app = new Koa();
const logger = require('./utils/logger');
const routes = require('./routes');
const serve = require('koa-static');
const koaBody = require('koa-body');
// const cors = require('koa2-cors');
const responseTime = require('./middleware/x-response-time');
const errorHandler = require('./middleware/errorHandler');
const appErrorHandler = require('./middleware/appErrorHandler');
const { port } = require('./config');

app.use(responseTime);
app.use(errorHandler)
app.use(koaBody());

for (let router of routes) {
  if (typeof router.routes === 'function') app.use(router.routes());
  if (typeof router.allowedMethods === 'function') app.use(router.allowedMethods());
}

app.use(serve('./public'));

app.on('error', appErrorHandler);

process.on('uncaughtException', async err => {
  await logger.error(err);
  process.exit();
});

process.on('unhandledRejection', async (err, reason) => {
  await logger.error(err, reason);
  process.exit();
});

app.listen(port, '0.0.0.0', () => {
  logger.info(`listening on localhost:`, port);
});