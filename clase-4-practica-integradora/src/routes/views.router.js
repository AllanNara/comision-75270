import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  const { fisrt_name, last_name, age, role } = req.user
  res.render("profile", { fisrt_name, last_name, age, role });
});

router.get("/failed", (req, res) => {
  res.render("failed");
});

export default router;
