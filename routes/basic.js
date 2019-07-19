function getRoutePageHome(ctx, next) {
  ctx.render('index.pug');
}

module.exports = (Router) => {
  const router = new Router();
  
  router.get('/', getRoutePageHome);
  
  const {routes, allowedMethods} = router;
  
  return {
    routes: routes.bind(router),
    allowedMethods: allowedMethods.bind(router)
  };
};
