import { createReadStream } from 'node:fs';

import express from 'express';
import multer from 'multer';
import csv from 'fast-csv';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { config } from '../config.js';

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
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
  (req, res) => {
    const filePath = req.file.path;
    let data = [];

    createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (row) => data.push(row))
      .on('end', () => {
        // TODO: Process the data depending on the table type
        console.log(data);

        res.send('File has been uploaded and processed');
      });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

export default router;
