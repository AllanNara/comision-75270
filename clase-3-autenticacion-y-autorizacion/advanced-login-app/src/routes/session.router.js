import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/api/session/error" }),
  (req, res) => {
    res.send({ status: "success", message: "User registered" });
  },
);


router.get("/error", (req, res) => {
  res.send("Error on register");
});

export default router;
