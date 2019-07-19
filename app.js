const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const KoaLogger = require('koa-logger');
const KoaPug = require('koa-pug');
const KoaBodyparser = require('koa-bodyparser');
const KoaStaticCache = require('koa-static-cache');

const db = require('./db');
const app = new Koa();
const koaPug = new KoaPug({
  viewPath: './views',
  noCache: true,
  app
});

function onError(err, ctx) {
  console.log(err);
}

app.on('error', onError);

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
}

app.use(KoaLogger());
app.use(errorHandler);
app.use(KoaBodyparser());
app.use(KoaStaticCache('public', {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true,
  usePrecompiledGzip: true,
}));

const routers = [
  require('./routes/basic')(Router),
  require('./routes/projects-api')(Router),
  require('./routes/projects')(Router)
];

for (let i = 0, size = routers.length; i < size; i++) {
  const router = routers[i];

  app.use(router.routes());
  app.use(router.allowedMethods());
}

const server = app.listen(3000);
module.exports = server;
