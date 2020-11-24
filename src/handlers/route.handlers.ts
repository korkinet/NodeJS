import { NextFunction, Request, Response } from "express";

export type RouteHandler<T = void> = (req: Request, res: Response, next: NextFunction) => T;
