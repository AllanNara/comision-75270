import express from "express";
import toysRouter from "./routes/toys.router.js";
import config from "./config/index.js";

const { PORT } = config;
const app = express();

app.use(express.json());

app.use("/api", toysRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

