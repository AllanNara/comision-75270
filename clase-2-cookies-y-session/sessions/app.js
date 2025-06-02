import express from "express";
import session, { MemoryStore } from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
dotenv.config();

const { PORT, SECRET_SESSION } = process.env;
const app = express();

// const session = []

app.use(session({
  secret: SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  },
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/test"
  })
}))

app.get("/login", (req, res) => {
  const { email, password } = req.query
  console.log(email)
  console.log(password)
  if(email === "coder@mail.com" && password === "1234") {
    console.log("Credenciales validas");
    req.session.email = email
    return res.send("Usuario logeado!")
  }
  return res.status(401).send("Credenciales Incorrectas")
})


app.get("/profile", (req, res) => {
  if(!req.session.email) return res.status(401).send("Usuario no logeado")
  res.send("Bienvenido usuario " + req.session.email)
})

app.get("/", (req, res) => {
  if(!req.session.count) req.session.count = 0
  req.session.count++
  let msg = "Usted a visitado la pagina " + req.session.count + " veces"
  res.send(msg)
})


app.get("/other", (req, res) => {
  if(!req.session.count) req.session.count = 0
  req.session.count++
  let msg = "OTRO CONTADOR \nUsted a visitado la pagina " + req.session.count + " veces"
  res.send(msg)
})


app.listen(PORT, () => console.log(`listening on port ${PORT}`))
