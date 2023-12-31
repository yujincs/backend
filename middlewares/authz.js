'use strict';

import { HttpError } from '../helpers/error.js';

export const isCustomer = (req, _res, next) => {
	try {
		const {
			app_metadata: { type },
		} = req.auth;

		if (type !== 'ticket') throw new HttpError(403, 'You are not authorized');

		const { id } = req.auth;

		const { data: ticket } = req.db
			.from('Tickets')
			.select('id')
			.eq('id', id)
			.limit(1)
			.single();
		req.ticket = ticket;

		next();
	} catch (err) {
		next(err);
	}
};

export const isWidget = (req, _res, next) => {
	try {
		const {
			app_metadata: { type },
		} = req.auth;

		if (type !== 'widget') throw new HttpError(403, 'You are not authorized');

		next();
	} catch (err) {
		next(err);
	}
};

export const isUser = async (req, _res, next) => {
	try {
		const {
			app_metadata: { type },
		} = req.auth;

		if (type !== 'user') throw new HttpError(403, 'You are not authorized');

		const { id } = req.auth;

		const { data: user } = await req.db
			.from('Users')
			.select('id,email,name,role,createdAt,updatedAt')
			.eq('id', id)
			.limit(1)
			.single();

		if (!user) {
			throw new HttpError(401, 'Invalid access token');
		}

		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
};

export const isUserAdmin = (req, _res, next) => {
	try {
		if (req.user.role !== 'admin')
			throw new HttpError(403, 'You are not authorized');

		next();
	} catch (err) {
		next(err);
	}
};
