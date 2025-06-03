import { Router } from "express";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, avatar } = req.body;

  if (!first_name || !email || !password) {
    return res.status(400).send("Missing fields");
  }

  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    avatar,
  };

  await userModel.create(newUser)

  res.send({ status: "success", message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Missing fields");

  const user = await userModel.findOne({ email });
  if (!user) return res.status(401).send("User not found");

  if (isValidPassword(user, password)) {
    delete user.password;
    req.session.user = user;
    // return res.send({ status: "success", payload: user });
    return res.redirect("/profile")
  } else {
    return res.status(401).send("ACCESO DENEGADO")
  }
});

router.post("/logout", (req, res) => {
  req.session.user = null;
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Unexpected Server Error" });
    }
    res.send("Logout success!");
  });
});

export default router;
