import { Router } from 'express';
import * as uuid from 'uuid';

import { products } from '../db';
import { checkId, checkName, getByIdHandler, getProductById } from '../utils/utils';

const productsRouter = Router();

const innerRouter = Router({mergeParams: true});

// Get all
innerRouter.get('/', (_, res) => {
  console.log('Getting all products');
  res.send(products);
});

// Get one
innerRouter.get('/:id', checkId, getByIdHandler(id => getProductById(id)), (req, res) => {
  console.log('Getting product by id', req.params.id);
  res.send(res.locals.entity);
});

// Create one
innerRouter.post('', checkName, (req, res) => {
  const newProduct = req.body;
  newProduct.id = uuid.v4();
  products.push(newProduct);
  console.log('New product was created', newProduct);
  res.send(newProduct);
});

// Update one
innerRouter.put('/:id', checkId, checkName, getByIdHandler(id => getProductById(id)), (req, res) => {
  const updatedProduct = Object.assign(res.locals.entity, req.body);
  console.log('Product was updated', updatedProduct);
  res.send(updatedProduct);
});

// Delete one
innerRouter.delete('/:id', checkId, getByIdHandler(id => getProductById(id)), (req, res) => {
  products.splice(res.locals.index, 1);
  console.log('Product', req.params.id, 'was deleted');
  res.sendStatus(204);
});

productsRouter.use('/products', innerRouter);

export default productsRouter;