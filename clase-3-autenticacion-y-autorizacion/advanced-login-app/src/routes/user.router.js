import { Router } from "express";
import userModel from "../models/user.model.js"

const router = Router();

router.get("/", async(req, res) => {
  const uid = req.query.uid
  let doc;

  if(uid) doc = await userModel.findById(uid)
  else doc = await userModel.find();

  res.json({ status: "success", payload: doc })
})

router.put("/:uid", async(req, res) => {
  const { uid } = req.params
  const { body } = req;

  const response = await userModel.updateOne({ _id: uid }, { $set: { ...body } })
  res.json({ status: "success" , response })
})

router.delete("/:uid", async(req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.deleteOne({ _id: uid });
    res.json({ status: "success", payload: user})
  } catch (error) {
    console.error(error)
    res.status(400).json({ status: "error", message: error.message }) 
  }
})

export default router


