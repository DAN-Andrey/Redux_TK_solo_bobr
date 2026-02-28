"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Dan",
          email: "dan@mail.ru",
          password: await bcrypt.hash("Qwerty1!", 10),
          isAdmin: true,
        },
        {
          name: "User",
          email: "user@mail.ru",
          password: await bcrypt.hash("Qwerty1!", 10),
          isAdmin: false,
        },
      ],
      {},
    );
    const articles = [
      {
        userId: 1,
        title: "НОЧЬ, КОГДА ДРОЖАЛА ЗЕМЛЯ",
        content:
          "Как 50 000 человек одновременно потеряли голову под Master of Puppets. Репортаж с первого ряда.",
      },
      {
        userId: 1,
        title: "ПЕРВЫЙ РАЗ В МОШ-ПИТЕ",
        content:
          "Что надеть, куда встать и как не сломать нос. Инструкция по выживанию для зеленых хедбэнгеров.",
      },
      {
        userId: 2,
        title: "ТУШИНО-1991: КАК ЭТО БЫЛО",
        content:
          "1.6 миллиона человек, вертолеты и Metallica. История легендарного концерта в Москве.",
      },
      {
        userId: 2,
        title: "5 МИНУТ С ДЖЕЙМСОМ ХЕТФИЛДОМ",
        content:
          "Что чувствуешь, когда стоишь рядом с человеком, чьи риффы ты играл 20 лет.",
      },
    ];

    await queryInterface.bulkInsert("Articles", articles, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
