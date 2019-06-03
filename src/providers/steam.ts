const MAX_NEWS = 3;

import getenv = require("getenv");
const STEAM_API_KEY = getenv("STEAM_API_KEY");

import SteamAPI = require("steamapi");
const steam = new SteamAPI(STEAM_API_KEY);

import Debugger = require("debug");
const debug = Debugger("bot:steamapi");

import * as moment from "moment";

import { IArticle, IProvider } from "./provider";

export function steamProvider(name: string, id: number): IProvider {
  debug(`Creating provider for ${name} (${id})`);
  return () => {
    return new Promise<IArticle>((done, error) => {
      debug(`Fetching news for ${name} through Steam`);

      steam.getGameNews(id).then((data: any) => {
        let content = "";
        for (let i = 0; i < MAX_NEWS && i < data.length; i++) {
          const date = moment.unix(data[i].date).format("DD/MM/YYYY HH:mm");
          content += `[${data[i].title}](${data[i].url})\n${date}\n\n`;
        }

        done({title: name, content});
      })
      .catch((err: any) => {
        error(err);
      });
    });
  };
}
