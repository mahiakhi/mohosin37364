!cmd install 878.js const axios = require("axios");

module.exports = {
  config: {
    name: "result",
    version: "1.0",
    author: "RANA",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Check SSC/HSC Result"
    },
    longDescription: {
      en: "Check your SSC/HSC Result via eboardresults"
    },
    category: "info",
    guide: {
      en: "{pn} [exam] | [board] | [year] | [roll] | [reg]\nExample: {pn} ssc | dhaka | 2024 | 123456 | 789012"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      if (args.length < 5) {
        return api.sendMessage("❌ Please provide full information:\nFormat:\neboard [exam] | [board] | [year] | [roll] | [reg]\nExample:\neboard ssc | dhaka | 2024 | 123456 | 789012", event.threadID, event.messageID);
      }

      const input = args.join(" ").split("|").map(i => i.trim().toLowerCase());
      if (input.length < 5) {
        return api.sendMessage("❌ Missing parameters. Please use the format correctly.", event.threadID, event.messageID);
      }

      const [exam, board, year, roll, reg] = input;

      const res = await axios.get(`https://nayan-eboard-result.vercel.app/result?exam=${exam}&roll=${roll}&reg=${reg}&board=${board}&year=${year}`);
      const data = res.data;

      if (!data.student) {
        return api.sendMessage("❌ No result found or invalid information.", event.threadID, event.messageID);
      }

      const student = data.student;
      const grades = data.grades || [];

      // Student info
      let msg = "🎓🎓 𝗦𝘁𝘂𝗱𝗲𝗻𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 🎓🎓\n ‎◆━━━━━━━━━━━━━━━◆\n";
      for (let [key, value] of Object.entries(student)) {
        let emoji = "ℹ️";
        if (key.toLowerCase().includes("name")) emoji = "👤|";
        else if (key.toLowerCase().includes("roll")) emoji = "🆔|";
        else if (key.toLowerCase().includes("board")) emoji = "🏛|️";
        else if (key.toLowerCase().includes("group")) emoji = "📚|";
        else if (key.toLowerCase().includes("type")) emoji = "🎓|";
        else if (key.toLowerCase().includes("birth")) emoji = "🎂|";
        else if (key.toLowerCase().includes("result")) emoji = "✅|";
        else if (key.toLowerCase().includes("institute")) emoji = "🏫|";
        else if (key.toLowerCase().includes("gpa")) emoji = "⭐|";
        msg += `${emoji} ${key}: ${value || "N/A"}\n`;
      }

      // Grade Sheet
      msg += `\n📄📄 𝗚𝗿𝗮𝗱𝗲 𝗦𝗵𝗲𝗲𝘁 📄📄\n‎◆━━━━━━━━━━━━━━━◆\n`;
      for (let subject of grades) {
        msg += `📘| ${subject.code} - ${subject.subject}: ⭐ ${subject.grade} ⭐\n`;
      }

      return api.sendMessage(msg.trim(), event.threadID, event.messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ An error occurred while fetching result.", event.threadID, event.messageID);
    }
  }
};
