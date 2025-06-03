import express from "express";
import hbs from "express-handlebars";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo"

import passport from "passport";
import initializePassport from "./config/passport.config.js";

import config from "./config/index.js";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";

const { PORT, MONGO_URI, SECRET_KEY } = config;
const app = express();

// Set Handlebars
app.engine("handlebars", hbs.engine());
app.set("views", import.meta.dirname + "/views");
app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session
app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    dbName: "sessions",
    ttl: 24 * 60 * 60
  }),
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 2 * 60 * 60 * 1000
  }
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/users", userRouter);

// Server Up
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Conexión a Mongo
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connection success"))
  .catch((er) => {
    console.log("Error Mongoose Connect");
    throw er;
  });
