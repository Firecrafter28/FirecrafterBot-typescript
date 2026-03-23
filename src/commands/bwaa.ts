import { Message } from "discord.js";
import * as config from "../config.js";
import * as utils from "../utils.js";

export default async function bwaa(message: Message, args: string[]): Promise<void> {
    const bwaa =  (): string => {
        const bwaaArray = [
            config.emotes.NEURO_BWAA,
            config.emotes.EVIL_BWAA
        ]

        return utils.getRandomItem(bwaaArray);
    }

    if (args.length > 0 && typeof args[0] == "string")
    {
        if (parseInt(args[0]) > 0 && (parseInt(args[0]) <= config.BWAA_LIMIT || message.author.id == config.OWNER)) {
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
}