// Module imports
import {
	Client,
	GatewayIntentBits,
} from 'discord.js'





export const discord = new Client({
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.Guilds,
	],
})
