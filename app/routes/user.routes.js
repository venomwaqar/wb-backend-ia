const schemas = require('../helper/schemas.js');
const middleware = require('../helper/middleware.js');

module.exports = app => {

  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/", middleware.validateModel(schemas.userPOST, 'body'), users.register);
  router.post("/login", middleware.validateModel(schemas.userLogin, 'body'), users.login);

  app.use('/api/users', router);
};
