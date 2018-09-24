const MAX_NEWS = 3

import getenv = require("getenv")
const STEAM_API_KEY = getenv("STEAM_API_KEY")

import SteamAPI = require("steamapi")
let steam = new SteamAPI(STEAM_API_KEY)

const debug = require("debug")("steamapi")
import * as moment from "moment"

import { Provider, Article } from "./provider";

export function steamProvider(name: string, id: number): Provider {
    debug(`Creating provider for ${name} (${id})`)
    return () => {
        return new Promise<Article>((done, error) => {
            debug(`Fetching news for ${name} through Steam`)

            steam.getGameNews(id).then((data) =>
            {
                let content = ''
                for (let i = 0; i < MAX_NEWS && i < data.length; i++)
                {
                    let date = moment.unix(data[i].date).format("DD/MM/YYYY HH:mm")
                    content += `[${data[i].title}](${data[i].url})\n${date}\n\n`
                }

                done({title: name, content})
            })
            .catch((err) => {
                error(err)
            })
        })
    }
}
