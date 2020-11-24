import express from 'express';
import cors from 'cors';

import categoriesRouter from './routes/categories-route';
import productsRoute from './routes/products-route';
import { errorHandler } from './handlers';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(9000, () => {
  app.get('/', (_, res) => res.send({
    name: 'Coolest API ever',
    version: '1.0'
  }));

  app.use('/api', categoriesRouter);
  app.use('/api', productsRoute);

  app.use(errorHandler);
});

