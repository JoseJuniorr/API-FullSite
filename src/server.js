// const app = require('./app')
import app from './app'

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado na porta 3333 http://localhost:3333')
})