// Local imports
import { logger } from './logger.js'
import { supabase } from './supabase.js'





/**
 * Issues a key for a key claim.
 *
 * @param {string} keyClaimID The ID of the key claim to be fulfilled.
 * @param {string} keyID The ID of the key being issued.
 * @param {string} userID The ID of the user that owns the key claim.
 */
export async function issueKeyForKeyClaim(keyClaimID, keyID, userID) {
	logger.log('info', `Fulfilling key claim ${keyClaimID}`)

	const fulfilmentResults = await Promise.all([
		supabase
			.from('keyClaims')
			.update({
				keyID,
				ownerID: userID,
			})
			.eq('id', keyClaimID),
		supabase
			.from('keys')
			.update({
				claimID: keyClaimID,
				ownerID: userID,
			})
			.eq('id', keyID),
	])

	const fulfilmentErrors = fulfilmentResults
		.map(item => item.error)
		.filter(Boolean)

	if (fulfilmentErrors.length) {
		logger.log('error', `Error fulfilling key claim ${keyClaimID}`, fulfilmentErrors)
	} else {
		logger.log('info', `Key claim ${keyClaimID} has been fulfilled`)
	}
}
