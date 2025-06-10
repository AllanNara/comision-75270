import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/", async (_, res) => {
  res.json(await userModel.find());
});

router.get("/:id", async (req, res) => {
  res.json(await userModel.findById(req.params.id));
});

router.delete("/:id", async (req, res) => {
  res.json(await userModel.deleteOne({ _id: req.params.id }));
});

export default router;
