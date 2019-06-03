import getenv = require("getenv");
import moment = require("moment");
import NewsAPI = require("newsapi");
import { IArticle, IProvider } from "./provider";

import Debugger = require("debug");
const debug = Debugger("bot:newsapi");

const MAX_NEWS = 3;

const NEWSAPI_KEY = getenv("NEWSAPI_KEY");
const newsapi = new NewsAPI(NEWSAPI_KEY);

export function getLatestNews(): IProvider {
  return () => {
    return new Promise<IArticle>((done, error) => {
      debug("Grabbing latest top news from NewsAPI");
      if (NEWSAPI_KEY !== "") {
        newsapi.v2.topHeadlines({
          country: "fr",
          category: "technology",
        }).then(((response: any) => {
          if (response.status === "ok") {
            const data = response.articles;

            let content = "";
            for (let i = 0; i < MAX_NEWS && i < data.length; i++) {
              const date = moment(data[i].publishedAt).format("DD/MM/YYYY HH:mm");
              content += `[${data[i].title}](${data[i].url})\n${date}\n\n`;
            }

            done({title: "Newspaper", content} as IArticle);
          } else {
            error("Cannot get NewsAPI data");
          }
        })).catch((err: any) => error(err));
      } else {
        error("NewsAPI key is not given.");
      }
    });
  };
}
