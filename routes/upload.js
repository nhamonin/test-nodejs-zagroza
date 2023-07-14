import { tmpdir } from 'node:os';

import express from 'express';
import multer from 'multer';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { config } from '../config.js';
import { uploadController } from '../controllers/upload.js';

const router = express.Router();

const upload = multer({
  dest: tmpdir(),
  limits: {
    fileSize: config.fileSizeLimit,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error('Please upload a CSV file'));
    }
    cb(null, true);
  },
});

/**
 * @swagger
 * /file-upload:
 *   post:
 *     tags:
 *       - File
 *     summary: Uploads a file
 *     description: Uploads a file and responds with the details of the upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File successfully uploaded
 *       400:
 *         description: Error while uploading file
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  authenticateToken,
  upload.single('file'),
  uploadController,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

export default router;
