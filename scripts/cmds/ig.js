module.exports.config = {
  name: "{p}",
  version: "1.0.0",
  hasPermssion: 0,
  credits: (() => {
    const credit = "RANA";
    if (credit !== "RANA") {
      throw new Error("Fuck You Credit Chor 😾. Real Owner Mr. Rana..👑");
    }
    return credit;
  })(),
  description: "Sends random quotes with an image",
  Category: "image",
  usages: "image",
  cooldowns: 11,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.onStart = async function ({ api, event }) {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs-extra");

  const quotes = [
"⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n─❝– কোনো নেতার পিছনে নয়.!!🤸‍♂️\n– মসজিদের ইমামের পিছনে দাড়াও জীবন বদলে যাবে ইনশাআল্লাহ...!!🖤🕋\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝__আল্লাহর রহমত থেকে নিরাশ হওয়া যাবে না!”\n-আল্লাহ অবশ্যই তোমাকে ক্ষমা করে দিবেন ☺️🌻\nসুরা যুমাহ্ আয়াত ৫২..৫৩...!!🥀🖤\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝ ইসলাম অহংকার করতে শেখায় না!🌸\n- ইসলাম শুকরিয়া আদায় করতে শেখায়...!!🤲🕋\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\𝗻𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝বেপর্দা নারী যদি নায়িকা হতে পারে 😑\n __🤗🥀 -তবে পর্দাশীল নারী গুলো সব ইসলামের শাহ্জাদি.🥰\n  __মাশাল্লাহ...!!🖤🥀\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝স্মার্ট নয় ইসলামিক ﷽🥰\n🖤﷽ জীবন সঙ্গি খুঁজুন ﷽🥰\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝যখন বান্দার জ্বর হয়,😇\n🖤তখন গুনাহ গুলো ঝড়ে পড়তে থাকে☺️\n– হযরত মুহাম্মদ(সাঃ)●...!!🕋🖤 \n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝~🍂🦋\n              ━𝐇𝐚𝐩𝐩𝐢𝐧𝐞𝐬𝐬 𝐈𝐬 𝐄𝐧𝐣𝐨𝐲𝐢𝐧𝐠 𝐓𝐡𝐞 𝐋𝐢𝐭𝐭𝐥𝐞\n                          ━𝐓𝐡𝐢𝐧𝐠𝐬 𝐈𝐧 𝐋𝐢𝐟𝐞..♡🌸\n           ━𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡 𝐅𝐨𝐫 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠...!!💭🖤\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝___💜🌈___•\n°___:))-তুমি আসক্ত হও-||-🖤🌸✨\n°___:))-তবে নেশায় নয় আল্লাহর ইবাদতে-||-🖤🌸✨\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n ─❝হাসতে❜❜ হাসতে❜❜ একদিন❜❜😊😊\n ━❥❝সবাইকে❜❜ ─❝কাদিয়ে ❜❜বিদায়❜❜ নিবো❞...!!🙂💔\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n ─❝🦋🥀࿐\nლ_༎হাজারো༎স্বপ্নের༎শেষ༎স্থান༎••༊🙂🤲🥀\n♡_༎কবরস্থান༎_♡...!!🦋🥀࿐\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n ─❝প্রসঙ্গ যখন ধর্ম নিয়ে•🥰😊\nতখন আমাদের ইসলামই সেরা•❤️\n𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥i𝐥𝐥𝐚...!!💭🖤\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n ─❝🥀😒 কেউ পছন্দ না করলে,,,,\n        কি যায় আসে,,🙂\n                😇আল্লাহ তো,,\n        পছন্দ করেই বানিয়েছে,,♥️🥀\n         🥰  Alhamdulillah 💭🕋\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝🌼 এত অহংকার করে লাভ নেই! 🌺 \n  মৃত্যুটা নিশ্চিত,, শুধু সময়টা\n   অ'নিশ্চিত।...!!🤍🗯️ \n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗜𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝_🌻••ছিঁড়ে ফেলুন অতীতের\nসকল পাপের\n                 অধ্যায় ।\n_ফিরে আসুন রবের ভালোবাসায়••!!🖤🥀\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n─❝_বুকে হাজারো কষ্ট নিয়ে\n                  আলহামদুলিল্লাহ বলাটা••!☺️\n_আল্লাহর প্রতি অগাধ বিশ্বাসের নমুনা...!!🗯️🕋\n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞  ",
             "⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱\n\n ─❝_আল্লাহর ভালোবাসা পেতে চাও•••!🤗\n\n_তবে রাসুল (সা:)কে অনুসরণ করো••!!💭🖤  \n\n ⊰᯽⊱┈────╌❊╌────┈⊰᯽⊱ \n\n𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡\n╰┈➤ ❝ [𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰] ❞ "
        ];

  const images = [
  "https://i.imgur.com/gn573Ah.jpeg",
  "https://i.imgur.com/IRb6kJU.jpeg",
"https://i.imgur.com/KCDJe1z.jpeg",
"https://i.imgur.com/sdoOl4m.jpeg",
"https://i.imgur.com/iIqVl52.jpeg",
"https://i.imgur.com/10OaqVv.jpeg",
"https://i.imgur.com/UTtdBoL.jpeg",
"https://i.imgur.com/tCZELSG.jpeg",
"https://i.imgur.com/kfYe391.jpeg",
"https://i.imgur.com/1pHNIFh.jpeg",
"https://i.imgur.com/RS0ApB8.jpeg",
"https://i.imgur.com/JBZwuKj.jpeg",
"https://i.imgur.com/rwU5W4G.jpeg",
"https://i.imgur.com/2YKBUbi.jpeg",
"https://i.imgur.com/jRmaZ3b.jpeg",
"https://i.imgur.com/6EmxGgs.jpeg",
"https://i.imgur.com/29KaPKw.jpeg",
"https://i.imgur.com/RoI0E1C.jpeg",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const callback = () => {
    api.sendMessage(
      {
        body: ` ${randomQuote} `,
        attachment: fs.createReadStream(__dirname + "/cache/ig_image.jpg")
      },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/ig_image.jpg")
    );
  };

  return request(encodeURI(randomImage))
    .pipe(fs.createWriteStream(__dirname + "/cache/ig_image.jpg"))
    .on("close", () => callback());
};
