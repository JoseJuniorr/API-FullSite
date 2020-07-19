import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import User from '../models/User'




class UserController {
    async store(req, res) {

        //validação com yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)

        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidados!"
            })
        }

        const emailExiste = await User.findOne({ email: req.body.email })
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: E-mail já está cadastrado!"
            })

        }



        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 7)

        const user = await User.create(dados, (err) => {
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

    async delete(req, res) {

        const usuarioExiste = await User.findOne({ _id: req.params.id })

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                message: "Erro: Usuário não encontrado!"
            })
        }

        const user = User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Erro: Usuário não foi excluído!"
            })
        })

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        })
    }

}

export default new UserController