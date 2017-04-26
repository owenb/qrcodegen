const SlackBot = require("slackbots");
const detect = require("./detect");

const token = "xoxb-175530941063-W6Xw6EcZjgRyErIro2lfV7cp";
const channel = "find-friends";

const bot = new SlackBot({
  token: token,
  name: "Find Friends Bot"
});

async function postReply(bot, username, key) {
  let user = await bot.getUserById(username);
  let payload = qrMessagePayload(key, user);
  bot.postMessageToChannel(channel, ``, payload);
}

function qrMessagePayload(key, user) {
  return {
    icon_emoji: ":key:",
    attachments: [
      {
        fallback: "QR Code generated",
        pretext: `Scan to add @${user.name} to your contacts`,
        image_url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${key}`
      }
    ]
  };
}

// On startup...
bot.on("start", () => {
  console.log("Find Friends QR Bot listening....");

  bot.postMessageToChannel(channel, "Listening for public keys...", {
    icon_emoji: ":robot_face:"
  });
});

// On each new message...
bot.on("message", data => {
  if (!data.text) return; // ignore non-text messages
  if (data.event_ts) return; // skip old messages on re-connect (for now)

  let key = detect(data.text);
  if (!key) return; // drop if message does not contain a key

  postReply(bot, data.user, key);
});
