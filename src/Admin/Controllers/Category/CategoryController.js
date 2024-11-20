const categories = require("../../../Model/Categories");

module.exports = async function (bot, message, category_id) {
  try {
    const userId = message.from.id;
    let categoryList = [];

    if (category_id) {
      categoryList = await categories.find({ category_id: category_id });
    } else {
      categoryList = await categories.find({
        category_id: { $eq: null },
      });
    }

    let keyboard = {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: "➕ Qo'shish",
          },
        ],
      ],
    };

    for (let i = 0; i < categoryList.length; i += 2) {
      const row = [];

      row.push({
        text: categoryList[i].name,
      });

      if (i + 1 < categoryList.length) {
        row.push({
          text: categoryList[i + 1].name,
        });
      }

      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([
      {
        text: "⬅️ Ortga",
      },
    ]);

    if (category_id) {
      keyboard.keyboard[keyboard.keyboard.length - 1].push({
        text: "🗑 O'chirish",
      });
    }

    if (categoryList.length > 0) {
      await bot.sendMessage(
        userId,
        `Quydagi kategoriyalardan birini tanlang!`,
        {
          reply_markup: keyboard,
        }
      );
    } else {
      await bot.sendMessage(userId, `Malumot topilmadi`, {
        reply_markup: keyboard,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
