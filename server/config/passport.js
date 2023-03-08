dotenv.config();
import * as dotenv from "dotenv";

import passport from "passport-jwt";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../model/usersModel.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
      console.log("err in passport", err);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
