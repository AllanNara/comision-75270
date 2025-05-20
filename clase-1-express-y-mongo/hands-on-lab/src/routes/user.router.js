import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/users", async(req, res) => {
  try {
    const users = await userModel.find();
    res.json({ status: "success", payload: users })
  } catch (error) {
    console.log(error) 
    res.status(500).send("Error en el servidor")
  }
})

router.post("/users", async(req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const user = await userModel.create({ first_name, last_name, email });
    res.json({ status: "success", payload: user._id })
  } catch (error) {
    console.log(error) 
    res.status(500).send("Error en el servidor")
  } 
})

router.put("/users/:pid", async(req, res) => {
  const id = req.params.pid
  try {
    const result = await userModel.updateOne({ "_id": id }, { $set: { ...req.body }})
    res.json({ status: "success", result })
  } catch (error) {
    console.log(error) 
    res.status(500).send("Error en el servidor")
  }
})

router.get("/users/:pid", async(req, res) => {
  const id = req.params.pid
  try {
    const result = await userModel.findById(id)
    res.json({ status: "success", result })
  } catch (error) {
    console.log(error) 
    res.status(500).send("Error en el servidor")
  }
})

router.delete("/users/:pid", async(req, res) => {
  const id = req.params.pid
  try {
    const result = await userModel.deleteOne({ "_id": id })
    res.json({ status: "success", result })
  } catch (error) {
    console.log(error) 
    res.status(500).send("Error en el servidor")
  }
})

export default router
