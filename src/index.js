// Module imports
import {
	API,
	loggerMiddleware,
	metricsMiddleware,
	statusCodeGeneratorMiddleware,
} from '@trezy-studios/koa-api'
import compress from 'koa-compress'
import cors from '@koa/cors'
import { koaBody } from 'koa-body'
import noTrailingSlash from 'koa-no-trailing-slash'





// Local imports
import { route as githubWebhookRoute } from './routes/github/webhook.js'
import { handleStart } from './helpers/handleStart.js'
import { route as healthCheckRoute } from './routes/health.js'
import { logger } from './helpers/logger.js'
import { route as metricsRoute } from './routes/metrics.js'





// Start the web server
const api = new API({
	logger,
	middleware: [
		metricsMiddleware(),
		noTrailingSlash(),
		compress(),
		loggerMiddleware(logger),
		cors(),
		koaBody(),
		statusCodeGeneratorMiddleware(),
	],
	onStart: handleStart,
	routes: [
		healthCheckRoute,
		metricsRoute,
		githubWebhookRoute,
	],
})

api.start()
