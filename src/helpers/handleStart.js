// Module imports
import { collectDefaultMetrics } from 'prom-client'





/**
 * Starts metrics collection.
 */
export function handleStart() {
	collectDefaultMetrics({ prefix: process.env.METRICS_PREFIX })
}
