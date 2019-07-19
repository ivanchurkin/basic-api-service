const controller = require('../controllers/projects');

module.exports = function(Router) {
  const router = new Router({
    prefix: '/projects'
  });
  
  router.get('/create', controller.create);
  router.get('/', controller.read);
  router.get('/edit/:id', controller.update);
  router.get('/remove/:id', controller.remove);
  router.post('/store', controller.store);
  
  const {routes, allowedMethods} = router;
  
  return {
    routes: routes.bind(router),
    allowedMethods: allowedMethods.bind(router)
  };
};
