import { createReadStream } from 'node:fs';
import path from 'node:path';

import express from 'express';
import multer from 'multer';
import csv from 'fast-csv';

import { authenticateToken } from '../middleware/authenticateToken.js';
import { config } from '../config.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
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
    if (!req.file) {
      return res.status(400).send({ error: 'No file attached' });
    }

    const filePath = req.file.path;
    let data = [];

    createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) =>
        res.status(400).send({ error: 'Failed to parse CSV file: ' + error })
      )
      .on('data', (row) => data.push(row))
      .on('end', () => {
        // TODO: Process the data depending on the table type

        res.send('File has been uploaded and processed');
      });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

export default router;
