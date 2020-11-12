import { NextFunction, Request, Response } from 'express';
import { products, categories } from '../db';
import { Category, Product } from '../models';

export function checkId(req: Request, res: Response, next: NextFunction) {
  if (req.params.id?.length !== 36) {
    res.sendStatus(400);
    return;
  }
  next();
}

export function checkName(req: Request, res: Response, next: NextFunction) {
  if ((req.body.name || '')?.length < 3) {
    res.sendStatus(409);
    return;
  }
  next();
}

function getById(req: Request, res: Response, next: NextFunction, entities: (Product | Category)[]) {
  const index = entities.findIndex(e => e.id === req.params.id);
  if (~index) {
    res.locals.index = index;
    res.locals.entity = entities[index];
    next();
    return;
  }

  res.sendStatus(404);
}

export function getProductById(req: Request, res: Response, next: NextFunction) {
  return getById(req, res, next, products)
}

export function getCategoryById(req: Request, res: Response, next: NextFunction) {
  return getById(req, res, next, categories)
}
