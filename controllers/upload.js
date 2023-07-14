import { createReadStream } from 'node:fs';

import csv from 'fast-csv';

import { config } from '../config.js';
import { getTableConfig } from '../utils/getTableConfig.js';

export const uploadController = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file attached' });
  }

  const filePath = req.file.path;
  let headers = null;
  let rows = [];

  createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('headers', (receivedHeaders) => {
      headers = receivedHeaders;
    })
    .on('data', (row) => {
      rows.push(row);
    })
    .on('error', (error) =>
      res.status(400).send({ error: 'Failed to parse CSV file' + error })
    )
    .on('end', () => {
      const tableConfig = getTableConfig(headers, config.tables);

      if (!tableConfig) {
        return res.status(400).send({ error: 'Invalid table type' });
      }

      tableConfig.process(rows, filePath, tableConfig.type, res);

      res.send({
        message: tableConfig.message,
      });
    });
};
