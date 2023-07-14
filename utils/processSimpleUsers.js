import User from '../models/User.js';

export function processSimpleUsers(rows) {
  const parsedRows = rows.map((row) => {
    const [username, identifier, firstName, lastName] =
      Object.values(row)[0].split(';');

    return {
      username,
      identifier,
      firstName,
      lastName,
    };
  });

  User.bulkCreate(parsedRows);
}
