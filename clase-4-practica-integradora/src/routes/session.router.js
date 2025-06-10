import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/failed",
  }),
);

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/failed",
  }),
);

router.post("/logout", (req, res) => {
  req.logout(err => {
    if(err) {
      console.error(err);
      return res.status(500).json({ fatal_error: "view console" })
    }
    return res.redirect("/")
  })
});

export default router;
