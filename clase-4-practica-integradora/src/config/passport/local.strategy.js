import { Strategy } from "passport-local";
import userModel from "../../models/user.model.js";

async function verifyRegister(req, username, password, done) {
  const { first_name, last_name, age, role } = req.body;
  try {
    const userFound = await userModel.findOne({ email: username });
    if (userFound) return done(null, false, { message: "User already exists" });
    const newUser = {
      first_name,
      last_name,
      age,
      role,
      password,
      email: username,
    };
    const newDoc = await userModel.create(newUser);
    return done(null, newDoc)
  } catch (error) {
    console.error(error);
    return done("Internal server error (view console)");
  }

}

async function verifyLogin(username, password, done) {
  try {
    const user = await userModel.findOne({ email: username });
    if(!user || user.password !== password) {
      return done(null, false, { message: "Invalid credentials" })
    }
    return done(null, user)
  } catch (error) {
    console.error(error);
    return done("Internal server error (view console)");
  }
}

export const registerLocal = new Strategy({ usernameField: "email", passReqToCallback: true }, verifyRegister);
export const loginLocal = new Strategy({ usernameField: "email" }, verifyLogin);
