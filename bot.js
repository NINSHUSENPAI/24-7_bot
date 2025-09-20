const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: "lunarsmp-ub2P.aternos.me", // Aternos server IP
    port: 39396,                      // Aternos port
    username: "AFK_bot",              // Cracked username
    version: "1.21.4"                 // Match server version
  });

  bot.on('spawn', () => {
    console.log("✅ AFK_bot has spawned and is online!");

    // Teleport to prison coords (requires OP)
    bot.chat("/tp AFK_bot 100 64 100"); // <-- change these coords to your prison
  });

  bot.on('kicked', (reason) => {
    console.log("❌ Kicked:", reason);
    reconnect();
  });

  bot.on('end', () => {
    console.log("🔄 Bot disconnected, trying to reconnect...");
    reconnect();
  });

  bot.on('error', (err) => console.log("⚠️ Error:", err));

  // Anti-AFK jump every 10 seconds
  setInterval(() => {
    if (bot.entity) {
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);
    }
  }, 10000);

  // Reconnect function
  function reconnect() {
    setTimeout(() => {
      createBot();
    }, 5000); // retry after 5 seconds
  }
}

createBot();
