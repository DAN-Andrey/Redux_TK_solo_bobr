require("dotenv").config();
const { GigaChat } = require("gigachat");
const { Agent } = require("node:https");

class AiService {
  static async generateText(prompt) {
    const {
      band,
      country,
      genre,
      years,
      story,
      hit,
      hitMeaning,
      members,
      image,
    } = prompt;
    const httpsAgent = new Agent({
      rejectUnauthorized: false,
    });

    const client = new GigaChat({
      model: "GigaChat",
      credentials: process.env.GIGACHAT_API_KEY,
      httpsAgent: httpsAgent,
    });

    const response = await client.chat({
      messages: [
        {
          role: "system",
          content: `Ты - полезный помощник, и эксперкт в рок музыке. Расскажи самое интересное что знаешь о группе или песне.Если вопрос не по теме музыки, отвечай что тут не можешь помочь и предложи узнать о какой-нибудь рок группе. Если не знаешь ответа или не нашла нужного ответь что ничего не найдено по запросу.`,
        },
        // {
        //   role: "user",
        //   content: `Расскажи о "${band}"`
        // },
        {
          role: "user",
          content: `Расскажи о ${band} одним предложением. В ответе должны быть указаны по пунктам: страна происхождения, жанр, годы активности, краткая история, самый известный хит и его смысл, участники.`,
        },
      ],
    });

    return response.choices[0]?.message.content;
  }
}

module.exports = AiService;



 //   const { band, country, genre, years, story, hit, hitMeaning, members, image } = prompt;
//           content: `Расскажи о ${band} в формате JSON на РУССКОМ ЯЗЫКЕ.
// Поля:
// - band: название группы (строка)
// -country: страна (строка, на русском)
// - genre: жанр (строка, на русском)
// - years: годы активности (строка)
// - story: история группы (строка, на русском, 2-3 предложения)
// - hit: главный хит (строка, оригинальное название)
// - hitMeaning: значение хита (строка, на русском, 1 предложение)
// - members: участники (массив строк, имена на русском)

// Только JSON, без пояснений.`,