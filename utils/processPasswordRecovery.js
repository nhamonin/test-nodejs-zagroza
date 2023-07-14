import { rename } from 'node:fs';
import path from 'node:path';

export function processPasswordRecovery(filePath, type, res) {
  const newFilePath = path.join('uploads', `${type}-${Date.now()}.csv`);

  rename(filePath, newFilePath, (error) => {
    if (error) {
      return res.status(400).send({ error: 'Failed to save file' });
    }
  });
}
