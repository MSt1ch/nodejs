import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';

import {validationErrorHandler} from './utils/validation';
import {logger} from './utils/customLogger';
import {loggerMiddleware} from './utils/logger';
import {errorHandlerMiddleware, handleUncaughtError} from './error-hander/errorHandlers';
import sq from './utils/sequelize';

import usersRouter from './routes/user.router';
import groupsRouter from './routes/group.router';
import authenticateRouter from './routes/authenticate.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

sq.sync().then(() => {
  logger('ok');
});

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.listen(PORT, () => {
  logger(`Listening on port ${PORT}`);
});

app.set('case sensitive routing', false);

app.use(cors());
app.use(bodyParser.json());
// app.use(loggerHandler); // used to task 5.1
app.use(loggerMiddleware); // used to task 5.3
app.use(errorHandlerMiddleware); // used to task 5.2

app.use(validationErrorHandler);

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/login', authenticateRouter);


process.on('uncaughtException', handleUncaughtError);
process.on('unhandledRejection', handleUncaughtError);
