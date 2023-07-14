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
