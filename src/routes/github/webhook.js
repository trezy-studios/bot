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
		const { request } = context

		console.log(request.body)

		context.data = {
			status: 'healthy',
		}
	},
	methods: ['post'],
	middlewares: [bodyBuilderMiddleware()],
	path: '/github/webhook',
})
