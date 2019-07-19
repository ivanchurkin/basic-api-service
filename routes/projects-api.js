const controller = require('../controllers/projects');

module.exports = function(Router) {
  const router = new Router({
    prefix: '/api/projects'
  });
  
  router.get('/', controller.apiRead);
  
  const {routes, allowedMethods} = router;
  
  return {
    routes: routes.bind(router),
    allowedMethods: allowedMethods.bind(router)
  };
};
