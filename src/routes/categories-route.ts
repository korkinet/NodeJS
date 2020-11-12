import { NextFunction, Request, Response, Router } from 'express';
import * as uuid from 'uuid';

import { categories, products } from '../db';
import { checkId, checkName, getCategoryById } from '../utils/utils';

function getById(req: Request, res: Response, next: NextFunction) {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (~index) {
    res.locals.categoryIndex = index
    res.locals.category = categories[index];
    next();
    return;
  }

  res.sendStatus(404);
}

const router = Router();

// Get all
router.get('/categories', (req, res) => res.send(categories));

// Get one
router.get('/categories/:id', checkId, getCategoryById, (req, res) => {
  res.send(res.locals.entity);
});

// Get one
router.get('/categories/:id/products', checkId, getCategoryById, (req, res) => {
  res.send(products.filter(p => p.categoryId === req.params.id));
});

// Create one
router.post('/categories', checkName, (req, res) => {
  const newCategory = req.body;
  newCategory.id = uuid.v4();
  categories.push(newCategory);
  res.send(res.locals.entity);
});

// Update one
router.put('/categories/:id', checkId, checkName, getCategoryById, (req, res) => {
  const updatedCategory = Object.assign(res.locals.entity, req.body);
  res.send(updatedCategory);
});

// Delete one
router.delete('/categories/:id', checkId, getCategoryById, (req, res) => {
  categories.splice(res.locals.index, 1);
  res.sendStatus(204);
});

export default router;