import jwt from 'jsonwebtoken';

export const loginController = (req, res, next) => {
  // In a real application we will have a user system, for this test we will just return a token
  const user = { id: 1, username: 'testUser' };
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  res.status(201).json({ token });
};
