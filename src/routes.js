// const { Router } = require('express')
import { Router } from "express";
import mongoose from 'mongoose'

require("dotenv").config();


import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import ProfileController from './app/controllers/ProfileController'
import HomeController from './app/controllers/HomeController'

import authMiddleware from './app/middlewares/auth'


const routes = new Router();

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users', authMiddleware, UserController.update)
routes.delete('/users/:id', authMiddleware, UserController.delete)

routes.get('/profile', authMiddleware, ProfileController.show)
routes.put('/profile', authMiddleware, ProfileController.update)


routes.post('/login', LoginController.store)

routes.get('/home', HomeController.show)
routes.post('/home', HomeController.store)





// module.exports = routes
export default routes;
