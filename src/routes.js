// const { Router } = require('express')
import { Router } from "express";
import mongoose from 'mongoose'

require("dotenv").config();

import User from './app/models/User'
import UserController from './app/controllers/UserController'


const routes = new Router();

routes.post('/users', UserController.store)

// routes.get("/", async (req, res) => {

//     await User.create({
//         nome: 'José Jr',
//         email: 'jjerrorama@outlook.com',
//         senha: '123654'
//     }, function (err, small) {
//         if (err) return res.status(400).json({ error: "Erro ao cadastrar o usuário!" });

//         return res.status(200).json({ error: "Usuário cadastrado com sucesso!" })



//     })



// });



routes.get("/contato", (req, res) => {
    res.send("rota contato");
});






// module.exports = routes
export default routes;
