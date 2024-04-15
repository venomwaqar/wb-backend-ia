const middleware = require('../helper/middleware.js');

module.exports = app => {
    const book = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", book.findAll);
    router.post("/bookmark/:id", middleware.authenticateRequest(), book.bookmark);
    router.delete("/bookmark/:id", middleware.authenticateRequest(), book.deleteBookmark);
    router.get("/bookmarks", middleware.authenticateRequest(), book.listBookmark);
  
    app.use('/api/books', router);
  };
  