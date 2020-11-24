import { NextFunction, Request, Response } from 'express';
import { RouteHandler } from '../handlers';
import { products, categories } from '../db';
import { Category, InputValidationError, Product } from '../models';

export function checkId(req: Request, _: Response, next: NextFunction) {
  if (req.params.id?.length !== 36) {
    next(new InputValidationError('Invalid id'));
    return;
  }
  next();
}

export function checkName(req: Request, _: Response, next: NextFunction) {
  if ((req.body.name || '')?.length < 3) {
    next(new InputValidationError('Name is too short'));
    return;
  }
  next();
}

function getById<T extends Product | Category>(entities: T[], id: string) {
  const index = entities.findIndex(e => e.id === id);
  if (~index) {
    return Promise.resolve({
      entity: entities[index],
      index
    });
  }
  return Promise.reject(new Error('Not Found'));
}

export function getByIdHandler(fn: (id: string) => Promise<{entity: Product | Category, index: number}>) {
  const handler: RouteHandler = (req, res, next) => {
    fn(req.params.id)
      .then(result => {
        Object.assign(res.locals, result);
        next();
      })
      .catch(next);
  }
  return handler;
}

export function getProductById(id: string) {
  return getById(products, id);
}

export function getCategoryById(id: string) {
  return getById(categories, id);
}
