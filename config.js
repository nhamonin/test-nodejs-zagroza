import { processSimpleUsers } from './utils/processSimpleUsers.js';
import { processPasswordRecovery } from './utils/processPasswordRecovery.js';

export const config = {
  fileSizeLimit: 1000000, // 1MB
  tables: [
    {
      type: 'simpleUsers',
      headers: ['Username', 'Identifier', 'First name', 'Last name'],
      process: processSimpleUsers,
      message: 'Successfully saved in DB simpleUsers data',
    },
    {
      type: 'passwordRecovery',
      headers: [
        'Username',
        'Identifier',
        'One-time password',
        'Recovery code',
        'First name',
        'Last name',
        'Department',
        'Location',
      ],
      process: (rows, filePath, type, res) =>
        processPasswordRecovery(filePath, type, res),
      message: 'Successfully saved locally passwordRecovery data',
    },
  ],
};
