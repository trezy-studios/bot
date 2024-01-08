// Local imports
import { logger } from './logger.js'





/**
 * Starts the Discord bot.
 *
 * @param {import('discord.js').Client} readyClient The Discord client.
 */
export async function handleDiscordBotReady(readyClient) {
	logger.log('info', `Connected to Discord! Logged in as ${readyClient.user.tag}`)
	await readyClient.guilds.fetch()

	for (const guild of readyClient.guilds.cache.values()) {
		await guild.members.fetch()
	}
}
