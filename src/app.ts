import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";

import cors from "cors";
import jwt from "jsonwebtoken";

import sequelize from "./models";

import router from "./routers";

const PORT = process.env.SERVER_PORT || 33223;
const app = express();

dotenv.config();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB CONNECTION
(async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log("DB CONNECTED");
  } catch (e) {
    console.log("DB CONNECTION ERROR OCCURED!");
  }
})();
// sequelize
//   .sync({ force: true, alter: true })
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((e) => {
//     console.log("DB ERROR");
//     console.log(e);
//   });

app.use(routes.api, router);
app.use("/*", (req, res) => {
  res.status(404).send("No Exists");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} PORT`);
});
