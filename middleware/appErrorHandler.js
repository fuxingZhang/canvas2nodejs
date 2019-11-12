'use strict';

const logger = require('../utils/logger');

async function appErrorHandler(err, ctx) {
  if (ctx.url == '/favicon.ico') return;

  const meta = {};

  if (ctx) {
    meta.headers = JSON.stringify(ctx.headers);
    meta.method = ctx.method;
    meta.path = ctx.path;
    meta.query = JSON.stringify(ctx.request.query);
    meta.ip = ctx.ip;
    meta.ips = JSON.stringify(ctx.ips);
    meta.status = ctx.status;
    meta.state = ctx.state;
    meta.body = JSON.stringify(ctx.request.body);
    meta.error = err.stack ? err.stack : err;
  }

  logger.error(meta).catch(console.log);
}

module.exports = appErrorHandler