import { Router } from "express";
import { getToysController, postToysController } from "../controllers/toys.controllers.js";

const router = Router();

router.get("/toys", getToysController);

router.post("/toys", authMiddleware, postToysController);

export default router;


// Patron de diseño: Chain of responsibility
function authMiddleware(req, res, next) {
  const { isAuth } = req.query;

  if(!isAuth) {
    return res.status(401).send("No Authorized")
  }

  next()
}


