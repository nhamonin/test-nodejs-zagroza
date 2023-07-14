import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import { testEnvVariables } from './utils/checkEnvVariables.js';

testEnvVariables();

const app = express();

app.use('/login', authRoutes);
app.use('/file-upload', uploadRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
