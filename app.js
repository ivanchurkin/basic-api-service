const Koa = require('koa');
const Router = require('@koa/router');
const logger = require('koa-logger');

const app = new Koa();

function onError(err, ctx) {
  console.log(err, ctx);
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

app.use(logger());

app.use(errorHandler);

const router = new Router();
const routerDogs = new Router({
  prefix: '/dogs'
});

require('./routes/basic')(router);
require('./routes/dogs')(routerDogs);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(routerDogs.routes());
app.use(routerDogs.allowedMethods());

const server = app.listen(3000);
module.exports = server;
