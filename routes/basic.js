module.exports = (router) => {
  function getRoutePageHome(ctx, next) {
    ctx.body = 'Hello World!';
  }
  
  router.get('/', getRoutePageHome);
};
