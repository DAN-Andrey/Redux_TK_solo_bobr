const ArticleService = require("../services/article.service");
const formatResponse = require("../utils/formatResponse");
const { Article } = require("../../db/models");

class ArticleController {
  static async getArticles(req, res) {
    try {
      const articles = await ArticleService.getAllArticles();
      if (articles.length === 0)
        return res.json(formatResponse(200, "Статей нет"));
      return res.status(200).json(formatResponse(200, "Успешно", articles));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async getOneArticle(req, res) {
    try {
      const { id } = req.params;
      const oneArticle = await ArticleService.getArticleById(id);
      if (!oneArticle) return res.json(formatResponse(200, "Статей нет"));
      return res.status(200).json(formatResponse(200, "Успешно", oneArticle));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async addArticle(req, res) {
    try {
      const { user } = res.locals; // потому что использую на роуте мидлвару verifyAccessToken
      if (!req.body)
        return res.status(400).json(formatResponse(400, "Заполни данные"));
      const { title, content } = req.body;
      const { isValid, err } = Article.validate({ title, content });
      if (!isValid)
        return res
          .status(400)
          .json(formatResponse(400, "Валидация не прошла", null, err));
      const newArticle = await ArticleService.createArticle({
        title,
        content,
        userId: user.id, // передаем id юзера, который сейчас на сайте
      });
      return res
        .status(201)
        .json(formatResponse(201, "Статья создана", newArticle));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async editArticle(req, res) {
    try {
      const { id } = req.params;
      const oneArticle = await ArticleService.getArticleById(id);
      if (!oneArticle) return res.json(formatResponse(200, "Статьи нет"));
      if (!req.body)
        return res.status(400).json(formatResponse(400, "Заполни данные"));
      const { title, content } = req.body;
      const { isValid, err } = Article.validate({ title, content });
      if (!isValid)
        return res
          .status(400)
          .json(formatResponse(400, "Валидация не прошла", null, err));
      const updatedArticle = await ArticleService.updateArticle(id, {
        title,
        content,
      });
      return res
        .status(200)
        .json(formatResponse(200, "Статья обновлена", updatedArticle));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { user } = res.locals; // потому что использую на роуте мидлвару verifyAccessToken
      const { id } = req.params;
      const oneArticle = await ArticleService.getArticleById(id);
      if (!oneArticle) return res.json(formatResponse(200, "Статьи нет"));
      // проверка на авторство
      if (user.id !== oneArticle.userId)
        return res
          .status(403)
          .json(formatResponse(403, "Нет прав на удаление"));
      const result = await ArticleService.deleteArticle(id);
      if (!result) return res.json(formatResponse(200, "Статья не удалена"));
      return res.status(204).json(formatResponse(204, "Статья удалена"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }
  static async getMyArticles(req, res) {
    try {
      const { user } = res.locals;
      if (!user) {
        return res
          .status(401)
          .json(
            formatResponse(
              401,
              "Авторизуйтесь, пожалуйста",
              null,
              "Необходима авторизация",
            ),
          );
      }

      const articles = await ArticleService.getArticlesByUserId(user.id);
      if (articles.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "У Вас пока нет статей", [], null));
      }
      res
        .status(200)
        .json(formatResponse(200, "Ваши статьи получены", articles, null));
    } catch (error) {
      console.log("==== ArticleController.getMyArticles ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = ArticleController;
