// Module imports
import { collectDefaultMetrics } from 'prom-client'





// Local imports
import { startDiscordBot } from './startDiscordBot.js'
import { startSupabase } from './startSupabase.js'





/**
 * Starts metrics collection.
 */
export function handleStart(api) {
	collectDefaultMetrics({ prefix: process.env.METRICS_PREFIX })
	startDiscordBot()
	startSupabase()
}
