import { Router } from 'express';
import * as uuid from 'uuid';

import { categories, products } from '../db';
import { checkId, checkName, getByIdHandler, getCategoryById } from '../utils/utils';

const categoriesRouter = Router();

const innerRouter = Router({mergeParams: true});

// Get all
innerRouter.get('/', (_, res) => {
  console.log('Getting all categories');
  res.send(categories);
});

// Get one
innerRouter.get('/:id', checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  console.log('Getting category by id', req.params.id);
  res.send(res.locals.entity);
});

// Get one
innerRouter.get('/:id/products', checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  console.log('Getting category products', req.params.id);
  res.send(products.filter(p => p.categoryId === req.params.id));
});

// Create one
innerRouter.post('', checkName, (req, res) => {
  const newCategory = req.body;
  newCategory.id = uuid.v4();
  categories.push(newCategory);
  console.log('New category was created', newCategory);
  res.send(newCategory);
});

// Update one
innerRouter.put('/:id', checkId, checkName, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  const updatedCategory = Object.assign(res.locals.entity, req.body);
  console.log('Category was updated', updatedCategory);
  res.send(updatedCategory);
});

// Delete one
innerRouter.delete('/:id', checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  categories.splice(res.locals.index, 1);
  console.log('Category', req.params.id, 'was deleted');
  res.sendStatus(204);
});

categoriesRouter.use('/categories', innerRouter);

export default categoriesRouter;