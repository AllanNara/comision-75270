import express from "express";
import cookieParser from "cookie-parser";
import sessionRouter from "./routes/session.router.js"
import passport from "passport";
import { initializedPassport } from "./passport/index.js";

const app = express();
const PORT = process.env.PORT || 8080

initializedPassport()
app.use(passport.initialize())

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/session", sessionRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
