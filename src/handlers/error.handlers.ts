import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
  if (err instanceof Joi.ValidationError) {
    res.status(400).send(err.message);
    return;
  }
  next(err);
}
