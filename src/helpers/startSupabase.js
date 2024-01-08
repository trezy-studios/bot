// Local imports
import { handleKeyClaimCreated } from './handleKeyClaimCreated.js'
import { handleKeyCreated } from './handleKeyCreated.js'
import { logger } from './logger.js'
import { supabase } from './supabase.js'





export function startSupabase() {
	supabase
		.channel('api')
		.on('postgres_changes', {
			event: 'INSERT',
			schema: 'public',
			table: 'keys',
		}, handleKeyCreated)
		.on('postgres_changes', {
			event: 'INSERT',
			schema: 'public',
			table: 'keyClaims',
		}, handleKeyClaimCreated)
		.subscribe()

	logger.log('info', 'Subscribed to Supabase!')
}
