// const { Router } = require('express')
import { Router } from 'express'
const routes = new Router()


routes.get('/', (req, res) => {
    res.send('rota inicial')
})


routes.get('/contato', (req, res) => {
    res.send('rota contato')
})


// module.exports = routes
export default routes