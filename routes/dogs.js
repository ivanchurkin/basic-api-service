const request = require('superagent');

module.exports = (router) => {
  async function getRoutePageDogs(ctx, next) {
    function onResponseSuccess(res) {
      ctx.body = res.body;
    }

    function onResponseFail(err) {
      console.log(err);
    }

    await request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(onResponseSuccess)
      .catch(onResponseFail);
  }
  
  router.get('/', getRoutePageDogs);
};
