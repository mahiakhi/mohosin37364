const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "toilet",
 aliases: ["toilet"],
 version: "1.0",
 author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
 countDown: 5,
 role: 0,
 shortDescription: "face on toilet",
 longDescription: "",
 category: "fun",
 guide: "{pn}"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply("Please mention someone");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "𝗬𝗼𝘂 𝗗𝗲𝘀𝗲𝗿𝘃𝗲 𝗧𝗵𝗶𝘀 𝗣𝗹𝗮𝗰𝗲 🤣", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "𝗬𝗼𝘂 𝗗𝗲𝘀𝗲𝗿𝘃𝗲 𝗧𝗵𝗶𝘀 𝗣𝗹𝗮𝗰𝗲 🤣", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let pth = "toilet.png"
 let img = await jimp.read("https://i.imgur.com/8WQo9xt.jpeg")

 img.resize(1050, 1300)
   .composite(avtwo.resize(240, 240), 380, 660); 

 await img.writeAsync(pth)
 return pth
   }
