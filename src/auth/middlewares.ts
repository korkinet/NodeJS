import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

import { Role, User } from '../models';

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', {session: false}, (err: Error, user: User) => {
    if (err || !user) {
      res.status(400).send('Failed to authenticate user');
      return;
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
        return;
      }

      jwt.sign(user, process.env.SECRET as string, (err, token) => {
        if (err) {
          res.send(err);
          return;
        }

        res.locals.token = token;
        next();
      });
    });
  })(req, res, next);
}

export function auth() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (process.env.AUTH === 'false') {
      next();
      return;
    }

    passport.authenticate('jwt', { session: false })(req, res, next);
  };
}

export function autorize(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (process.env.AUTH === 'false' || user?.roles.some(r => roles.includes(r))) {
      next();
      return;
    }

    res.sendStatus(403);
  }
}
