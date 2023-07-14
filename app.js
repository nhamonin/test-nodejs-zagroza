import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import { errorHandler } from './middleware/errorHandler.js';
import { testEnvVariables } from './utils/checkEnvVariables.js';
import { specs } from './swaggerDefinition.js';

testEnvVariables();

const app = express();

app.use('/login', authRoutes);
app.use('/file-upload', uploadRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
