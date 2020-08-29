import env from "env-var";

export const DISCORD_API_KEY = env
  .get("DISCORD_API_KEY")
  .required(true)
  .asString();

/*export const NEWSAPI_KEY = env.get("NEWSAPI_KEY")
    .required(true)
    .asString();

export const STEAM_API_KEY = env.get("STEAM_API_KEY")
    .required(true)
    .asString();*/
