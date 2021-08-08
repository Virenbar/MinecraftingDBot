import { Client } from "discord.js";
import _ from "lodash"

import { logger } from '../index'
import { sleep } from '../utils';
import { max, online, players } from '../modules/playercountA';
import { IModule } from ".";

const n = 2
let i = 0
let Bot: Client

function Load(BotClient: Client): void {
    Bot = BotClient
}

async function ActivityLoop() {
    for (; ;) {
        try {
            await changeActivity()
        } catch (err) {
            logger.error('Activity - Unknown error')
            logger.error(err)
            await sleep(10 * 1000)
        }
    }
}

async function changeActivity() {
    switch (i++) {
        case 0: {
            Bot.user.setActivity(`${online} из ${max} игроков`, { "type": "LISTENING" })
            await sleep(10 * 1000)
            break
        }
        case 1: {
            const o = (players.length == 0) ? " в пустоту" : ` на ${_.sample(players)}`
            Bot.user.setActivity(o, { "type": "WATCHING" })
            //await BotClient.user.setActivity(`на часы(${BotClient.uptime})`, { "type": "WATCHING" })
            await sleep(5 * 1000)
            break
        }
        default:
            break
    }
    i = i % n
}

export default { Load: Load, Run: ActivityLoop } as IModule