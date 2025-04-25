module.exports = {
	config: {
		name: "edit",
		version: "1.2",
		author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		role: 2,
		shortDescription: "Rewrite a bot's message",
		longDescription: "Rewrite a bot's message by replying to it with 'edit <message>'.",
		category: "owner",
		guide: {
			en: "{p}{n} <message>",
		},
	},

	onStart: async function ({ api, event, args }) {
		if (!event.messageReply || !event.messageReply.messageID) {
			api.sendMessage("♻️| 𝘗𝘭𝘦𝘢𝘴𝘦 𝘙𝘦𝘱𝘭𝘺 𝘛𝘰 𝘈 𝘉𝘰𝘵'𝘴 𝘔𝘢𝘴𝘴𝘢𝘨𝘦 𝘛𝘰 𝘌𝘥𝘪𝘵 𝘐𝘵.", event.threadID, event.messageID);
			return;
		}

		const newMessage = args.join(" ");
		if (!newMessage) {
			api.sendMessage("🤦‍♂️| 𝘗𝘭𝘦𝘢𝘴𝘦 𝘗𝘳𝘰𝘷𝘪𝘥𝘦 𝘛𝘩𝘦 𝘕𝘦𝘸 𝘔𝘢𝘴𝘴𝘢𝘨𝘦.", event.threadID, event.messageID);
			return;
		}

		try {
			await api.unsendMessage(event.messageReply.messageID);

			
			api.sendMessage(newMessage, event.threadID, (err, messageInfo) => {
				if (err) console.error("Error sending new message:", err);
			});
		} catch (error) {
			console.error("Error editing message:", error);
			api.sendMessage("Failed to edit this message. Sorry Boss 😞.", event.threadID, event.messageID);
		}
	},
};
