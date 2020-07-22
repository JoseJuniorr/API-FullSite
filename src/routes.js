// const { Router } = require('express')
import { Router } from "express";
import mongoose from 'mongoose'

require("dotenv").config();


import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import ProfileController from './app/controllers/ProfileController'
import HomeController from './app/controllers/HomeController'

import authMiddleware from './app/middlewares/auth'
import FooterController from "./app/controllers/FooterController";


const routes = new Router();

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users', authMiddleware, UserController.update)
routes.delete('/users/:id', authMiddleware, UserController.delete)

routes.get('/profile', authMiddleware, ProfileController.show)
routes.put('/profile', authMiddleware, ProfileController.update)


routes.post('/login', LoginController.store)

//rotas de gerenciamento da home
routes.get('/home', HomeController.show)
//add middleware
routes.post('/home', authMiddleware, HomeController.store)
routes.put('/home', authMiddleware, HomeController.update)

//rotas do conteudo do rodape
routes.get('/footer', FooterController.show)
routes.post('/footer', authMiddleware, FooterController.store)
routes.put('/footer', authMiddleware, FooterController.update)







// module.exports = routes
export default routes;
