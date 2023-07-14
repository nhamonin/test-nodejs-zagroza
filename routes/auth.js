import express from 'express';

import { loginController } from '../controllers/auth.js';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Get auth token
 *     description: Logs in the user and returns an authentication token
 *     responses:
 *       201:
 *         description: Token was successfully generated
 */
router.post('/', loginController);

export default router;
