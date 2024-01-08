// Module imports
import { Events } from 'discord.js'





// Local imports
import { discord } from './discord.js'
import { handleDiscordBotReady } from './handleDiscordBotReady.js'
import { handleGuildMemberUpdate } from './handleGuildMemberUpdate.js'





/**
 * Starts the Discord bot.
 */
export function startDiscordBot() {
	discord.once(Events.ClientReady, handleDiscordBotReady)
	discord.on(Events.GuildMemberUpdate, handleGuildMemberUpdate)

	discord.login(process.env.DISCORD_BOT_TOKEN)
}
