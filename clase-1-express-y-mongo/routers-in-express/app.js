import express from "express";
import productRouter from "./routes/product.router.js"

const app = express();

app.use("/api", productRouter)
app.use("/api", userRouter)
// /user POST GET PUT DELETE
// /admin POST GET PUT DELETE
// /cart POST GET PUT DELETE
// /product POST GET PUT DELETE
// /login POST GET PUT DELETE
// /pay POST GET PUT DELETE

app.listen(8000, () => console.log(`listening on port 8000`))
