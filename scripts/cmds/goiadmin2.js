module.exports = {
    config: {
        name: "goiadmin2",
        author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
        role: 0,
        shortDescription: " ",
        longDescription: "",
        category: "contact admin",
        guide: "{pn}"
    },

    onChat: function({ api, event }) {
        const adminIDs = ["61565488987561", "61567145660497", "61562150393366"]; 

        if (!adminIDs.includes(event.senderID)) {
            for (const id of adminIDs) {
                if (Object.keys(event.mentions).includes(id)) {
                 const msg = [
    "খালি ডাকে র ডাকে..!😞",
    "আমি বিজি র, ডাকিও না..!😼",
    "বলো, তোমাকে কিভাবে সাহায্য করতে পারি..?",
    "তুই আবার মেনশন করলি? সময় নাই রে ভাই..!🤦‍♂️",
    " মন দিয়ে বলো কি সমস্যা..?🙂",
    "ডিস্টার্ব করলে আমি রাগ করবো..!!🙂🫶",
    "তুই কি জানোস, বট রে বারবার ডাকলে বট হ্যাং করে.!🐸",
    "আবার মেনশন? একটু তো শান্তি দে.!🤦‍♂️",
    "আমি তো আর প্রেম করি না, 😼 শুধু সার্ভিস দেই..!😦 সো আমার রানা বস কে ম্যানশন দেও 🎀",
    "তুই কি জানোস, বটদেরও বিশ্রাম করার সময় দিতে হয় 😒?",
    "কি হইছে রে ভাই, আবার কেন ডাক..? 🙄",
    ];
                    return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
                }
            }
        }
    },

    onStart: async function({}) {}
};
