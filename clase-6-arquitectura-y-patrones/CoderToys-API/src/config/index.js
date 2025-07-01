import dotenv from "dotenv";

const path = process.cwd() + `/.env.${process.env.NODE_ENV}`

dotenv.config({ path });

export default {
  PORT: process.env.PORT
}
