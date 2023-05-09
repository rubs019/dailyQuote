import * as express from 'express';
import {
	errorStatus
} from '../errors';
import { DTO } from '../dto';

const router = express.Router();

router.post('/save', (req, res) => {
	const args = {
		date: req.body.date,
		msg: req.body.msg || undefined,
		name: req.body.name || undefined
	};

	if (!args.msg || !args.name) {
		return res.json(
			DTO.error.errorServer(
				'Message / Name cannot be empty',
				errorStatus.INTERNAL_SERVER_ERROR
			)
		);
	}
});

export default router;
