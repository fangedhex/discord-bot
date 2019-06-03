/*
* Discord BOT that show Steam news for games
*/

import "@abraham/reflection";

// Loading .env
import DiscordBot from "./DiscordBot";
require("dotenv").config();

const bot = new DiscordBot();
bot.run();

/*function tick() {
  const creator = client.channels.find((c) => c.id === "581791533397704706") as VoiceChannel;

  creator.members.forEach(async (member) => {
    await creator.guild.createChannel("tmp", {
      parent: creator.parent,
      type: "voice",
      permissionOverwrites: [
        {
          allowed: "KICK_MEMBERS",
          id: member.id,
        },
      ],
    }).then((c) => {
      c.setName(`Salon de ${member.displayName}`);
      return member.setVoiceChannel(c);
    });
  });

  const category = client.channels.find((c) => c.id === "581790861696827392") as CategoryChannel;
  category.children.forEach(async (channel) => {
    if (channel.id !== "581791533397704706" && channel.name !== "tmp") {
      if ((channel as VoiceChannel).members.size === 0) {
        await channel.delete().catch(() => debug("Cannot delete temporary channel !"));
      }
    }
  });

  setTimeout(tick, 1000);
}*/
