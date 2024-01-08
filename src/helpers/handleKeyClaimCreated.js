// Local imports
import { issueKeyForKeyClaim } from './issueKeyForKeyClaim.js'
import { supabase } from './supabase.js'





export async function handleKeyClaimCreated(message) {
	const keyClaim = message.new

	if (!keyClaim.keyID) {
		const result = await supabase
			.from('keys')
			.select('id')
			.eq('appID', keyClaim.appID)
			.is('claimID', null)
			.limit(1)

		const firstUnclaimedKey = result.data[0]

		if (firstUnclaimedKey) {
			await issueKeyForKeyClaim(keyClaim.id, firstUnclaimedKey.id, keyClaim.ownerID)
		}
	}
}
