import passport from "passport";
import local from "passport-local";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStragety = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStragety(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age, avatar } = req.body;
        try {
          let userFound = await userModel.findOne({ email });

          if(userFound) {
            console.error("User already exists");
            return done(null, false)
          }
          
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            avatar,
          };

          const user = await userModel.create(newUser);
          return done(null, user)
        } catch(err) {
          done(err) 
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
 
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  })
};


export default initializePassport

