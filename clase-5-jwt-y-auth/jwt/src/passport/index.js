import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { PRIVATE_KEY } from "../utils.js";

export const initializedPassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        secretOrKey: PRIVATE_KEY,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      },
      (payload, done) => {
        done(null, payload)
      },
    ),
  );


  // passport.use("login", loginStrategy)
  // passport.use("register", registerStrategy)
};

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
}
