// Common JS
// const express = require("express");

// ES Module
import express from "express";
import cookieParser from "cookie-parser";

const PORT = 8000
const app = express();

app.use(cookieParser("MyS3cr234daf234Stri23gn"))

app.get("/", (req, res) => {
  res.cookie("coderCookie", "Esta es una cookie", {
    httpOnly: true,
    sameSite: true,
    maxAge: 100000,
    signed: true
  })
  res.send("OK")
})

"Esta es una cookie.uIdfOnlT/pv2ZaQ6DrZxBW13dNlDNB2U/vxRbksls7g"
app.get("/view-cookie", (req, res) => {
  console.log("Cookie: ", req.signedCookies)
  res.send("OK")
})

app.listen(PORT, () => console.log("Up in " + PORT))
