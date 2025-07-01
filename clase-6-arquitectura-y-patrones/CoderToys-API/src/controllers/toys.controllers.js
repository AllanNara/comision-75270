import { readToysService, createToyService } from "../services/toys.services.js";

export const getToysController = (req, res) => {
  const payload = readToysService();
  res.json(payload);
}

export const postToysController = (req, res) => {
  const { body } = req
  const response = createToyService(body)

  if(!response) {
    res.status(400).json({ message: "Missing fields" });
  }

  res.json({ status: "created", payload: response })
}

