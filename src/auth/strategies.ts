import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';

import { User } from '../models';
import { users } from '../db';

export function initStrategies() {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'), null);
      }
    }
  ));

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  }, (user: User, done) => {
    done(null, user);
  }));
}
