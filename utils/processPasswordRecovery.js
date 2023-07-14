import { rename } from 'node:fs';
import path from 'node:path';

export function processPasswordRecovery(filePath, type, res) {
  const newFilePath = path.join('uploads', `${type}-${Date.now()}.csv`);

  rename(filePath, newFilePath, () => {});
}
