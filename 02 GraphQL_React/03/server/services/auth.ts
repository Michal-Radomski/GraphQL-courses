import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import User, { IUser } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

interface CustomUser extends Express.User {
  id?: string;
}

passport.serializeUser((user: CustomUser, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: Error, user: IUser) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: Error, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Invalid Credentials" });
      }
      bcrypt.compare(password, user.password, (err, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid Credentials" });
      });
    });
  })
);

export function signup({ email, password, req }: { email: string; password: string; req: Express.Request }) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error("You must provide an email and password.");
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email in use");
      }
      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err: Error) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

export function login({ email, password, req }: { email: string; password: string; req: Express.Request }) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (_err: Error, user: IUser) => {
      if (!user) {
        reject("Invalid credentials.");
      }
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}
