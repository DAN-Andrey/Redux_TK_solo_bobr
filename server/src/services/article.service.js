const { Article } = require("../../db/models");
class ArticleService {
  static async getAllArticles() {
    return Article.findAll({ order: [["createdAt", "DESC"]] });
  }

  static async getArticleById(id) {
    return Article.findByPk(id);
  }

  static async createArticle({ title, content, userId }) {
    return Article.create({ title, content, userId });
  }

  static async updateArticle(id, { title, content }) {
    await Article.update({ title, content }, { where: { id } });
    return Article.findByPk(id);
  }

  static async deleteArticle(id) {
    await Article.destroy({ where: { id } });
    return true;
  }
  static async getArticlesByUserId(userId) {
    return await Article.findAll({
      where: { userId: userId },
    });
  }
}

module.exports = ArticleService;
