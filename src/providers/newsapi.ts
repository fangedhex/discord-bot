import { Provider, Article } from "./provider"
import NewsAPI = require("newsapi")
import getenv = require("getenv")
const debug = require("debug")("bot:newsapi")
import * as moment from "moment"

let MAX_NEWS = 3

let NEWSAPI_KEY = getenv("NEWSAPI_KEY")
let newsapi = new NewsAPI(NEWSAPI_KEY)

export function getLatestNews(): Provider {
    return () => {        
        return new Promise<Article>((done, error) => {
            debug("Grabbing latest top news from NewsAPI")
            if(NEWSAPI_KEY != "") {
                newsapi.v2.topHeadlines({
                    country: "fr",
                    category: "technology"
                }).then((response => {
                    if(response.status === "ok") {
                        let data = response.articles
    
                        let content = ''
                        for (let i = 0; i < MAX_NEWS && i < data.length; i++)
                        {
                            let date = moment(data[i].publishedAt).format("DD/MM/YYYY HH:mm")
                            content += `[${data[i].title}](${data[i].url})\n${date}\n\n`
                        }
    
                        done({title: "Newspaper", content})
                    }else{
                        error("Cannot get NewsAPI data")
                    }                
                })).catch(err => error(err))
            }else{
                error("NewsAPI key is not given.")
            }            
        }) 
    }     
}
