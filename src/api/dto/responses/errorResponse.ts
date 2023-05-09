import { IResponse } from './definition';

export const errorServer = (
	message = 'Fatal error',
	statusCode = 500
): IResponse => {
	return {
		data: null,
		date: new Date(),
		message,
		statusCode
	};
};
