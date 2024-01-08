// Local imports
import { logger } from './logger.js'
import { supabase } from './supabase.js'





/**
 * Starts the Discord bot.
 *
 * @param {import('discord.js').GuildMember} oldMember The old guild member data.
 * @param {import('discord.js').GuildMember} newMember The new guild member data.
 */
export async function handleGuildMemberUpdate(oldMember, newMember) {
	logger.log('info', 'Guild Member Update:')

	const addedRoles = newMember
		.roles
		.cache
		.filter(role => !oldMember.roles.cache.has(role.id))
	const removedRoles = oldMember
		.roles
		.cache
		.filter(role => !newMember.roles.cache.has(role.id))

	if (!addedRoles.get(process.env.DISCORD_ARTISAN_ROLE_ID) && !addedRoles.get(process.env.DISCORD_BLACKSMITH_ROLE_ID)) {
		return
	}

	const { data: userID } = await supabase.rpc('get_user_from_external_id', { external_id: newMember.user.id })

	if (!userID) {
		return
	}

	const { data: eligibleApplications } = await supabase
		.from('applications')
		.select('id')
		.is('isReleased', false)

	if (!eligibleApplications.length) {
		return
	}

	const eligibleApplicationIDs = eligibleApplications.map(application => application.id)

	const unclaimedKeyRequests = eligibleApplicationIDs.map(applicationID => {
		return supabase
			.from('keys')
			.select('id, appID')
			.eq('appID', applicationID)
			.is('claimID', null)
			.limit(1)
	})

	const unclaimedKeyResults = await Promise.all(unclaimedKeyRequests)
	const unclaimedKeys = unclaimedKeyResults
		.map(result => result.data?.[0])
		.filter(Boolean)

	if (!unclaimedKeys.length) {
		return
	}

	const keyClaimInserts = eligibleApplicationIDs.map(applicationID => {
		const insertData = {
			appID: applicationID,
			ownerID: userID,
		}

		const key = unclaimedKeys.find(key => key.appID === applicationID)

		if (key) {
			insertData.keyID = key.id
		}

		return supabase
			.from('keyClaims')
			.insert(insertData)
			.select()
	})

	const keyClaimInsertResults = await Promise.all(keyClaimInserts)

	const keyUpdates = keyClaimInsertResults
		.map(keyClaimInsertResult => keyClaimInsertResult.data?.[0])
		.filter(keyClaim => Boolean(keyClaim.keyID))
		.map(keyClaim => {
			return supabase
				.from('keys')
				.update({
					claimID: keyClaim.id,
					ownerID: keyClaim.ownerID,
				})
				.eq('id', keyClaim.keyID)
		})

	await Promise.all(keyUpdates)
}
