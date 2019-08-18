/** Middlewares */
const IsAuthenticated = require('../middlewares/isAuthenticated');

/** Controllers */
const TestController = require('../controllers/test');
const AuthController = require('../controllers/auth');

module.exports = (router) => {

  router.post('/login', AuthController.login);
  router.get('/test', [IsAuthenticated], TestController.index);

  return router;
}