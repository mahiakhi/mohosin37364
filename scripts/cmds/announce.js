const axios = require("axios");
const { createReadStream, unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports = {
  config: {
    name: "announce",
    version: "1.4",
    author: "RANA",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "Tạo và gửi thông báo đến các nhóm",
      en: "Create and send notification to groups",
    },
    longDescription: {
      vi: "Tạo và gửi thông báo đến các nhóm do bạn quản lý",
      en: "Create and send notification to groups that you manage",
    },
    category: "box chat",
  },

  onStart: async function ({ api, event, args }) {
    if (this.config.author !== "RANA") {
      return api.sendMessage(
        `[ 𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗔𝗟𝗟𝗘𝗥𝗧 ]
        𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: 
       --সালা আবাল, ক্রেডিট চোর..!😝 
        𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
        --এই বট এর অ্যাডমিন ক্রেডিট চোর..!🤣
        𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: https://m.me/XAICO.RANA`,
        event.threadID,
        event.messageID
      );
    }

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    let sentCount = 0;
    const custom = args.join(" ");

    async function sendMessage(thread) {
      try {
        await api.sendMessage(
          `‎━━━━━━━━━━━━━━━━━━━
   ‎. ∧,,,∧         ᴀᴅᴍɪɴ
‎  (  • ·‌ •  )  ♡°        ɴᴏᴛɪᴄᴇ
‎┏━∪∪━━━━━━━━━━━━━━┓
‎┣━❯ [ 💬 ] 𝐌𝐄𝐒𝐒𝐄𝐆𝐄 [ 💬 ]
‎┗━❯ ${custom}                       
‎━━━━━━━━━━━━━━━━━━━
‎♻️ ʙᴏᴛ ᴏᴡɴᴇʀ : ᴍʀ. ᴛᴏᴍ 👑
‎📩 ᴄᴏɴᴛᴀᴄᴛ 📩
‎m.me/100063487970328`,
          thread.threadID
        );
        sentCount++;

        const content = `${custom}`;
        const languageToSay = "bn";
        const pathFemale = resolve(
          __dirname,
          "cache",
          `${thread.threadID}_female.mp3`
        );

        await global.utils.downloadFile(
          `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
            content
          )}&bn=${languageToSay}&client=tw-ob&idx=1`,
          pathFemale
        );
        api.sendMessage(
          { attachment: createReadStream(pathFemale) },
          thread.threadID,
          () => unlinkSync(pathFemale)
        );
      } catch (error) {
        console.error("Error sending a message:", error);
      }
    }

    for (const thread of threadList) {
      if (sentCount >= 20) {
        break;
      }
      if (
        thread.isGroup &&
        thread.name !== thread.threadID &&
        thread.threadID !== event.threadID
      ) {
        await sendMessage(thread);
      }
    }

    if (sentCount > 0) {
      api.sendMessage(`›️𝘠𝘰𝘶𝘳 𝘕𝘰𝘵𝘪𝘤𝘦 𝘚𝘦𝘯𝘥 𝘋𝘰𝘯𝘦 𝘐𝘯 𝘈𝘭𝘭 𝘛𝘩𝘳𝘦𝘥𝘴.. 🔖`, event.threadID);
    } else {
      api.sendMessage(
        "› No eligible group threads found to send the message to.",
        event.threadID
      );
    }
  },
};
