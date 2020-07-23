// const express = require('express')
// const routes = require('./routes')

import express from "express";
import routes from "./routes";
import cors from 'cors'
import path from 'path'


import "./config/connection";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use('/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.app.use((req, res, next) => {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

      this.app.use(cors());
      //console.log("cors middleware")
      next();
    });
  }
  routes() {
    this.app.use(routes);
  }
}

// module.exports = new App().app
export default new App().app;
