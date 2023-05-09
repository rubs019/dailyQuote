import 'dotenv/config';

import * as express from 'express';
import * as path from 'path';
import { DTO } from './api/dto';
import { errorMsg, errorStatus } from './api/errors';

export const app = express();

import api from './api';
import { Logger, turnOnTheLogs } from './helpers/logHelpers';

app.use(turnOnTheLogs);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	Logger.info(`The current environment is : ${process.env.NODE_ENV}`);
	next();
});

app.use('/', api);

// catch 404
app.use((req, res) => {
	return res
		.status(errorStatus.NOT_FOUND)
		.json(
			DTO.error.errorServer(
				errorMsg.NOT_FOUND,
				errorStatus.NOT_FOUND
			)
		);
});
