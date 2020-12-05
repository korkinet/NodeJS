import express from 'express';
import cors from 'cors';
import expressWinston from 'express-winston';
import { join } from 'path';

import categoriesRouter from './routes/categories-route';
import productsRoute from './routes/products-route';
import { errorHandler } from './handlers';
import { createLogger } from './utils/logger';
import { initDB } from './db';
import { initStrategies, login } from './auth';

initStrategies();

const app = express();

app.use(express.json());
app.use(cors());

if (!process.env.APP_PORT) {
  throw new Error('No app port defined');
}

app.listen(process.env.APP_PORT, async () => {
  const mainLogger = createLogger('Main');
  // Log all requests
  app.use(expressWinston.logger({
    winstonInstance: mainLogger
  }));
  
  if (!process.env.STATIC_PATH) {
    throw new Error('No static files root url defined');
  }

  app.use(process.env.STATIC_PATH, express.static(join(__dirname, '../public')));

  app.get('/', (_, res) => res.send({
    name: 'Coolest API ever',
    version: '1.0'
  }));

  const err = await initDB();
  if (err) {
    process.exit(1);
    return;
  }

  app.post('/login', login, (req, res, next) => {
    if (req.isAuthenticated()) {
      res.send({
        user: req.user,
        token: res.locals.token
      })
    } else {
      next(new Error('Missing login data'));
    }
  });

  app.use('/api', categoriesRouter);
  app.use('/api', productsRoute);

  // Log all errors
  app.use(expressWinston.errorLogger({
    winstonInstance: mainLogger
  }));
  app.use(errorHandler);
});
