// const { Router } = require('express')
import { Router } from "express";
import mongoose from 'mongoose'

require("dotenv").config();


import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

import authMiddleware from './app/middlewares/auth'


const routes = new Router();

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users/:id', authMiddleware, UserController.delete)

routes.post('/login', LoginController.store)





// module.exports = routes
export default routes;
