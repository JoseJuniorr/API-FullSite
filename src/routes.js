// const { Router } = require('express')
import { Router } from "express";
import mongoose from "mongoose";

import multer from 'multer';
import multerUpImgSobre from './app/middlewares/uploadImgSobre';

require("dotenv").config();

import UserController from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import ProfileController from "./app/controllers/ProfileController";
import HomeController from "./app/controllers/HomeController";

import authMiddleware from "./app/middlewares/auth";
import FooterController from "./app/controllers/FooterController";
import AboutController from "./app/controllers/AboutController";
import InfoContatoController from "./app/controllers/InfoContatoController";
import ContatoController from "./app/controllers/ContatoController";
import SobreImgController from "./app/controllers/SobreImgController";

const routes = new Router();
//upload
const uploadImgSobre = multer(multerUpImgSobre);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:id", UserController.show);
routes.put("/users", authMiddleware, UserController.update);
routes.delete("/users/:id", authMiddleware, UserController.delete);

routes.get("/profile", authMiddleware, ProfileController.show);
routes.put("/profile", authMiddleware, ProfileController.update);

routes.post("/login", LoginController.store);

//rotas de gerenciamento da home
routes.get("/home", HomeController.show);
//add middleware
routes.post("/home", authMiddleware, HomeController.store);
routes.put("/home", authMiddleware, HomeController.update);

//rotas do conteudo do rodape
routes.get("/footer", FooterController.show);
routes.post("/footer", authMiddleware, FooterController.store);
routes.put("/footer", authMiddleware, FooterController.update);

//página sobre
routes.get("/about", AboutController.show);
routes.post("/about", authMiddleware, AboutController.store);
routes.put("/about", authMiddleware, AboutController.update);

//página informações de contato
routes.get("/infocontato", InfoContatoController.show);
routes.post("/infocontato", authMiddleware, InfoContatoController.store);
routes.put("/infocontato", authMiddleware, InfoContatoController.update);

//formulario para contato
routes.get("/contato", authMiddleware, ContatoController.index);
routes.get("/contato/:id", authMiddleware, ContatoController.show);
routes.post("/contato", ContatoController.store);
routes.put("/contato", authMiddleware, ContatoController.update);
routes.delete("/contato/:id", authMiddleware, ContatoController.delete);

//upload
routes.put('/sobre-imagem', uploadImgSobre.single('file')  ,authMiddleware, SobreImgController.update);


// module.exports = routes
export default routes;

