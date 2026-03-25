import {Client, GatewayIntentBits, Message, type Channel, TextChannel, type EmbedBuilder} from "discord.js";
import * as dotenv from "dotenv";
import * as c from "./config.js";
import bwaa from "./commands/bwaa.js";
import * as fish from "./commands/fish.js"
import { buildLeaderboardEmbed } from "./commands/fish.js";
import { type CommandCallArgs, type CommandHandler, CommandManager } from "./commandManager.js";
import { registerAll } from "./commands/commands.js";

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

const commands = new CommandManager();
registerAll(commands);

client.once("clientReady", async (): Promise<void> => {
    console.log(`Logged in as ${client.user?.tag}`);

    const channel = <Channel>client.channels.cache.get(process.env.ONLINE_ALERT_CHANNEL as string);
    if (channel instanceof TextChannel) {
        await channel.send(`${c.config.emotes.online} Online`);
    }
});

client.on("messageCreate", async (message: Message): Promise<void> => {
    // Ignore bots & and messages without prefix
    if (message.author.bot || !message.content.startsWith(c.getGlobalGuildOverridableOption("prefix", message.guild))) return;

    const isOwner = c.config.globalOwners.includes(message.author.id);

    const args = message.content.slice(c.getGlobalGuildOverridableOption("prefix", message.guild).length).trim().split(/ +/);
    const command = args.shift();

    let embed: EmbedBuilder;
    
    if (!await commands.handle(command || "", { commandManager: commands, client, args, message, isOwner })) {
        await message.reply(`Unknown command \`${c.getGlobalGuildOverridableOption("prefix", message.guild)}${command}\``);
        console.log("An invalid command was sent: " + message.content);
    }
});

await client.login(process.env.TOKEN);
