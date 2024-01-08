// Local imports
import { issueKeyForKeyClaim } from './issueKeyForKeyClaim.js'
import { logger } from './logger.js'
import { supabase } from './supabase.js'






export async function handleKeyCreated(message) {
	const key = message.new

	if (!key.claimID) {
		const result = await supabase
			.from('keyClaims')
			.select('id,ownerID')
			.eq('appID', key.appID)
			.is('keyID', null)
			.limit(1)

		const firstUnfulfiledKeyClaim = result.data[0]

		if (firstUnfulfiledKeyClaim) {
			await issueKeyForKeyClaim(firstUnfulfiledKeyClaim.id, key.id, firstUnfulfiledKeyClaim.ownerID)
		}
	}
}
