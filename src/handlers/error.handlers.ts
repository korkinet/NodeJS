import { NextFunction, Request, Response } from "express";
import { InputValidationError } from "../models";

export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction) {
  if (err instanceof InputValidationError) {
    res.status(400).send(err.message);
    return;
  }
  next(err);
}
