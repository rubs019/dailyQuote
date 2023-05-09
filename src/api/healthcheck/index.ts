import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	return res.json({ status: 'OK' }).status(200);
});

export default router;
