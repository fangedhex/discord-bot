export interface User {
    name: string;
}

export interface DiscordUser extends User {
    discord_id: string;
}
