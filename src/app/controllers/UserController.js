import User from '../models/User'



class UserController {
    async store(req, res) {

        const emailExiste = await User.findOne({ email: req.body.email })
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: E-mail já está cadastrado!"
            })

        }

        if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: É necessário informar um nome!"
            })
        }
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Error: É necessário informar um e-mail!"
            })
        }

        if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
            return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: É necessário informar uma senha!"
            })
        }

        const user = await User.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Erro: Usuário não foi cadastrado!"
            })
            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            })
        })

    }
}

export default new UserController