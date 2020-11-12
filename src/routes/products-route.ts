import { NextFunction, Request, Response, Router } from 'express';
import * as uuid from 'uuid';

import { products } from '../db';
import { checkId, checkName, getProductById } from '../utils/utils';

const router = Router();

// Get all
router.get('/products', (req, res) => res.send(products));

// Get one
router.get('/products/:id', checkId, getProductById, (req, res) => {
  res.send(res.locals.entity);
});

// Create one
router.post('/products', checkName, (req, res) => {
  const newProduct = req.body;
  newProduct.id = uuid.v4();
  products.push(newProduct);
  res.send(res.locals.entity);
});

// Update one
router.put('/products/:id', checkId, checkName, getProductById, (req, res) => {
  const updatedProduct = Object.assign(res.locals.entity, req.body);
  res.send(updatedProduct);
});

// Delete one
router.delete('/products/:id', checkId, getProductById, (req, res) => {
  products.splice(res.locals.index, 1);
  res.sendStatus(204);
});

export default router;