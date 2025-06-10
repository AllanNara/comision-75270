import express from "express";
import config from "./config/index.js";
import sessionRouter from "./routes/session.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import hbs from "express-handlebars";
import mongoose from "mongoose";

// Sessiones con passport
import session from "express-session"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializedPassport from "./config/passport/config.js";

const { PORT, MONGO_URI, SECRET } = config;
const server = express();

server.engine("handlebars", hbs.engine());  // <-- Añadimos motor de renderizado
server.set("views", import.meta.dirname + "/views") // <-- Declaramos donde van a estar las plantillas hbs
server.set("view engine", "handlebars") // <-- Avisamos a express cual motor vamos a utilizar

// Middlewares
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(session({
  secret: SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 24 * 60 * 60
  }
}))
initializedPassport();
server.use(passport.initialize());
server.use(passport.session());

server.use("/", viewsRouter)
server.use("/api/users", usersRouter);
server.use("/api/session", sessionRouter);

server.listen(PORT, () => console.log(`listening on port ${PORT}`))

// Conectando a la base de datos
mongoose.connect(MONGO_URI, { dbName: "integrative_practice" })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error({ error: err.message })
    process.exit(1)
  })

