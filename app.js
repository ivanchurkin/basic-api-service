const Koa = require('koa');
const app = new Koa();

async function handler(ctx) {
  ctx.body = 'Hello World';
}

app.use(handler);

app.listen(3000);