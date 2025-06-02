import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("register");
  }
});

router.get("/profile", (req, res) => {
  if(!req.session.user) {
    res.redirect("/login")
  } else {
    res.render("profile", { user: req.session.user });
  }
});

export default router;
