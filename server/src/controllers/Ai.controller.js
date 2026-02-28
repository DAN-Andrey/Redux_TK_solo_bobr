const formatResponse = require("../utils/formatResponse");
const AiService = require("../services/Ai.service");

class AiController {
  static async getAiResponse(req, res) {
    const { band } = req.body;

    if (!band) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Заполните поле поиска",
            null,
            "Заполните поле поиска",
          ),
        );
    }

    try {
      const result = await AiService.generateText({ band });

      if (!result) {
        return res
          .status(500)
          .json(
            formatResponse(
              500,
              "Ошибка при генерации текста",
              null,
              "Ошибка при генерации текста",
            ),
          );
      }

      return res
        .status(200)
        .json(formatResponse(200, "Ответ получен", result, null));
    } catch (error) {
      console.log("==== AiController.getAiResponse ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = AiController;

