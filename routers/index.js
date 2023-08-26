import { Router } from 'express';
import { routerUser } from './user.js';
import { authentication } from '../middlewares/authentication.js';
import { routerWidget } from './widget.js';

export const router = Router()
	.get('/health-check', (_req, res, _next) => {
		res.set('content-type', 'text/plain').status(200).send('OK');
	})
	.use('/', routerUser)
	.use(authentication)
	.use('/tokens', routerWidget);
