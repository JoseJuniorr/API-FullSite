// const { Router } = require('express')
import { Router } from "express";
import mongoose from "mongoose";
require("dotenv").config();

const routes = new Router();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@api-fullsite.vs8jf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Conexão com o MongoDB Cloud realizada com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB Cloud!" + err);
  });

routes.get("/", (req, res) => {
  res.send("rota inicial");
});

routes.get("/contato", (req, res) => {
  res.send("rota contato");
});

// module.exports = routes
export default routes;
