const express = require("express");
const ArticleController = require("../controllers/article.controller");
const isValidId = require("../middlewares/isValidId");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

const articleRouter = express.Router();

articleRouter
  .get("/", ArticleController.getArticles)
  .get("/my", verifyAccessToken, ArticleController.getMyArticles)
  .post("/", verifyAccessToken, ArticleController.addArticle)
  .get("/:id", isValidId, ArticleController.getOneArticle)
  .delete("/:id", isValidId, verifyAccessToken, ArticleController.deleteArticle)
  .put("/:id", isValidId, verifyAccessToken, ArticleController.editArticle);

module.exports = articleRouter;
