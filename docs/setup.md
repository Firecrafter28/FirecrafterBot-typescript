# Setup

## Create an env file
Create a file called `.env` in the root of the project

## Setting an online alert channel

This is the channel the bot will send a message in whenever it comes online. You set it
with the `ONLINE_ALERT_CHANNEL` variable in the `.env` file.

## Setting the bot token
Create a bot in the [Discord Developer Portal](https://discord.com/developers/applications)
and use it's token to set the `BOT_TOKEN` variable in the `.env` file.

## Setting the bot owner
Set the `OWNER` variable in the `src/config.ts` file to your Discord ID as a string.

## Running the bot
1. Install dependencies with `bun install`, if you don't have bun installed, install it by
    following the instructions [here](https://bun.sh/docs/installation).
2. Build the project with `bun run build`
3. Run the bot with `bun run start`
