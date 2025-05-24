const axios = require("axios");

module.exports = {
  config: {
    name: "meta",
    aliases: ["m"],
    version: "1.0",
    author: "RANA",
    description: "Ask anything to Meta AI",
    usage: "[question]",
    commandCategory: "ai",
    cooldowns: 3,
  },

  onStart: async function ({ message, args }) {
    const question = args.join(" ").trim();

    if (!question) {
      return message.reply("[❕] Pleass Type Somthing..\nExample: `.meta What is AI?`");
    }

    const apiUrl = `https://meta-ai-api.vercel.app/meta-ai?q=${encodeURIComponent(question)}`;

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      // রেসপন্স ফর্ম্যাট যাচাই
      if (!data || typeof data !== "object") {
        return message.reply("⚠️ API থেকে অপ্রত্যাশিত রেসপন্স পাওয়া গেছে।");
      }

      const replyMsg = data.message?.trim() || "[❕] No Answer..";
      const sources = Array.isArray(data.sources) ? data.sources : [];
      const media = Array.isArray(data.media) ? data.media : [];

      let replyText = replyMsg;

      const validSources = sources.filter(src => src.link && src.title);

      if (validSources.length > 0) {
        replyText += `\n\n🔗| Sources:\n${validSources
          .map((src, i) => `${i + 1}. [${src.title}](${src.link})`)
          .join("\n")}`;
      }

      if (media.length > 0) {
        replyText += `\n\n📎| Media:\n${media
          .map((m, i) => `${i + 1}. ${m}`)
          .join("\n")}`;
      }

      return message.reply(replyText);
    } catch (error) {
      console.error("Meta AI error:", error.message);
      return message.reply("[×] Meta AI error, Please contact admin");
    }
  },
};
