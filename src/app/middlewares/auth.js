import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import configAuth from '../../config/auth'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado!"

        })
    }

    const [, token] = authHeader.split(' ')
    // console.log(token)


    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret)
        // console.log(decoded)

        req.userId = decoded.id;
        return next();

    } catch (err) {
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token inválido!"

        })
    }



}