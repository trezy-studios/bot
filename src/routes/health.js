// Module imports
import {
	bodyBuilderMiddleware,
	Route,
} from '@trezy-studios/koa-api'





export const route = new Route({
	/**
	 * Handles this route when it's accessed.
	 *
	 * @param {import('koa').Context} context The request context.
	 */
	handler(context) {
		context.data = {
			status: 'healthy',
		}
	},
	middlewares: [bodyBuilderMiddleware()],
	path: '/health',
})
