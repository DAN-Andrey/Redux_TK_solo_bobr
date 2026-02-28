"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate() {
      this.belongsTo(sequelize.models.User, { foreignKey: "userId" });
    }

    static validate({ title, content }) {
      if (!title || typeof title !== "string" || title.trim().length === 0) {
        return {
          isValid: false,
          err: "Название должно быть не пустой строкой",
        };
      }
      if (!content || typeof content !== "string" || content.trim().length === 0) {
        return {
          isValid: false,
          err: "Содержание должно быть не пустой строкой",
        };
      }
      return {
        isValid: true,
        err: null,
      };
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
