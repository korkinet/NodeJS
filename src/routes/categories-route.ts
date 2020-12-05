import { Router } from 'express';
import { createLogger } from '../utils/logger';
import * as uuid from 'uuid';

import { categories, products } from '../db';
import { checkId, checkName, getByIdHandler, getCategoryById } from '../utils/utils';
import { auth, autorize } from '../auth';
import { Role } from '../models';

const logger = createLogger('Categories');

const categoriesRouter = Router();

const innerRouter = Router({ mergeParams: true });

// Get all
innerRouter.get('/', (_, res) => {
  logger.info('Getting all categories');
  res.send(categories);
});

// Get one
innerRouter.get('/:id', checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  logger.info(`Getting category by id ${req.params.id}`);
  res.send(res.locals.entity);
});

// Get one
innerRouter.get('/:id/products', auth(), checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  logger.info(`Getting category products ${req.params.id}`);
  res.send(products.filter(p => p.categoryId === req.params.id));
});

// Create one
innerRouter.post('', auth(), autorize([Role.Admin]), checkName, (req, res) => {
  const newCategory = req.body;
  newCategory.id = uuid.v4();
  categories.push(newCategory);
  logger.info('New category was created', { newCategory });
  res.send(newCategory);
});

// Update one
innerRouter.put('/:id', auth(), autorize([Role.Admin]), checkId, checkName, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  const updatedCategory = Object.assign(res.locals.entity, req.body);
  logger.info('Category was updated', { updatedCategory });
  res.send(updatedCategory);
});

// Delete one
innerRouter.delete('/:id', auth(), autorize([Role.Admin]), checkId, getByIdHandler(id => getCategoryById(id)), (req, res) => {
  categories.splice(res.locals.index, 1);
  logger.info(`Category ${req.params.id} was deleted`);
  res.sendStatus(204);
});

categoriesRouter.use('/categories', innerRouter);

export default categoriesRouter;