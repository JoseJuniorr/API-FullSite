import mongoose from "mongoose";
require("dotenv").config();

class Database {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@api-fullsite.vs8jf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
        console.log("Conexão com o MongoDB Cloud realizada com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao conectar ao MongoDB" + err);
      });
  }
}

export default new Database();
