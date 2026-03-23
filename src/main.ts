import { Client, GatewayIntentBits, Message } from "discord.js";
import * as dotenv from "dotenv";

import * as config from "./config.js";

dotenv.config({
    quiet: true
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", (): void => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async (message: Message): Promise<void> => {
    // Ignore bots & and messages without prefix
    if (message.author.bot || !message.content.startsWith(config.PREFIX)) {
        return
    }

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === "restart") {
        if (message.author.id !== config.OWNER)
            return;

        await message.reply("Restarting...");
        process.exit(0);
    } else if (command === "bwaa") {
        const bwaa =  (): string => {
            if (Math.random() < 0.5) {
                return config.emotes.NEURO_BWAA;

            } else {
                return config.emotes.EVIL_BWAA;
            }
        }

        if (args.length > 0 && typeof args[0] == "string")
        {
            if (parseInt(args[0]) > 0 && parseInt(args[0]) <= config.BWAA_LIMIT) {
                let bwaaString = "";
                for (let i = 0; i < parseInt(args[0]); i++) {
                    bwaaString += (bwaa() + " ");
                }

                await message.reply(bwaaString);
            } else if (parseInt(args[0]) > config.BWAA_LIMIT) {
                await message.reply(`${config.emotes.NO} Too many ${bwaa()}s`)
            } else {
                await message.reply(bwaa());
            }
        } else {
            await message.reply(bwaa());
        }

    } else {
        await message.reply(`Unknown command \`${config.PREFIX}${command}\``);
    }
});

await client.login(process.env.TOKEN);