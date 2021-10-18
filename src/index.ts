import * as dotenv from 'dotenv';
import express from 'express';
import usersRouter from './user/user.router';
import {validationErrorHandler} from './utils/validation';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.json());
app.use(validationErrorHandler);
app.use('/api/users', usersRouter);
