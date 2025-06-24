import { Router } from "express";
import { generateToken, verifySign } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== "allan@mail.co" || password !== "unodostres") {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const access_token = generateToken({
    email,
    fisrt_name: "Allan",
    role: "User",
  });

  res.cookie("access_token", access_token, {
    httpOnly: true,
  });

  res.json({ message: "Login success!" });
});

// router.get("/profile", (req, res) => {
//   const token = req.cookies.access_token
//   if(!token) {
//     res.status(401).json({ message: "Token not exists" })
//   }
//
//   const payload = verifySign(token);
//   if(!payload) {
//     res.status(403).json({ message: "Invalid token" })
//   }
//
//   res.json(payload)
// })

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if(req.user) {
      return res.json({ user: req.user });
    } else {
      res.status(401).json({ error: "Not authorized. Please login"})
    }
  },
);

export default router;
