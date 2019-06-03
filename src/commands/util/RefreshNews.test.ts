import { Substitute } from "@fluffy-spoon/substitute";
import { CommandMessage, CommandoClient } from "discord.js-commando";
import { suite, test } from "mocha-typescript";
import RefreshNews from "./RefreshNews";

@suite class RefreshNewsTest {
  @test public async shouldReplyWithAnError() {
    const msg = Substitute.for<CommandMessage>();
    const client = Substitute.for<CommandoClient>();

    const refreshNews = new RefreshNews(client);
    await refreshNews.run(msg);
    msg.received().reply("Le rafraichissement des infos n'a pas fonctionné comme prévu :(");
  }
}
