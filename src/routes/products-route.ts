import { Router } from 'express';
import { createLogger } from '../utils/logger';
import * as uuid from 'uuid';

import { products } from '../db';
import { checkId, checkName, getByIdHandler, getProductById } from '../utils/utils';

const logger = createLogger('Products');

const productsRouter = Router();

const innerRouter = Router({ mergeParams: true });

// Get all
innerRouter.get('/', (_, res) => {
  logger.info('Getting all products');
  res.send(products);
});

// Get one
innerRouter.get('/:id', checkId, getByIdHandler(id => getProductById(id)), (req, res) => {
  logger.info(`Getting product by id - ${req.params.id}`);
  res.send(res.locals.entity);
});

// Create one
innerRouter.post('', checkName, (req, res) => {
  const newProduct = req.body;
  newProduct.id = uuid.v4();
  products.push(newProduct);
  logger.info('New product was created', { newProduct });
  res.send(newProduct);
});

// Update one
innerRouter.put('/:id', checkId, checkName, getByIdHandler(id => getProductById(id)), (req, res) => {
  const updatedProduct = Object.assign(res.locals.entity, req.body);
  logger.info('Product was updated', { updatedProduct });
  res.send(updatedProduct);
});

// Delete one
innerRouter.delete('/:id', checkId, getByIdHandler(id => getProductById(id)), (req, res) => {
  products.splice(res.locals.index, 1);
  logger.info(`Product ${req.params.id} was deleted`);
  res.sendStatus(204);
});

productsRouter.use('/products', innerRouter);

export default productsRouter;