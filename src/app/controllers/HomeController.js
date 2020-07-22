import Home from '../models/Home'
import * as Yup from 'yup'

import Footer from '../models/Footer'

class HomeController {
    async show(req, res) {

        Home.findOne({}).then((home) => {
            Footer.findOne({}).then((footer) => {
                return res.json({
                    error: false,
                    home: home,
                    footer: footer
                })

            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 123,
                    message: "Erro: Não foi possível executar a solicitação!"
                })

            })

        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 123,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

    }


    async store(req, res) {

        const dados = {

        }

        const homeExiste = await Home.findOne({})
        if (homeExiste) {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Erro: A página Home já possui um registro"
            })
        }

        const home = await Home.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 121,
                message: "Erro ao cadastrar os dados da página Home"
            })

            return res.json({
                error: false,
                message: "Dados da página Home cadastrado com sucesso!"
            })
        })
    }

    async update(req, res) {

        //Validação dos campos do formulário editar Home
        const schema = Yup.object().shape({
            titleTop: Yup.string().required(),
            descTop: Yup.string(),
            titleBtn: Yup.string(),
            linkBtnTop: Yup.string(),
            titleServ: Yup.string(),
            descServ: Yup.string(),
            iconOneServ: Yup.string(),
            iconTwoServ: Yup.string(),
            iconThreeServ: Yup.string(),
            titleVideo: Yup.string(),
            descTitleVideo: Yup.string(),
            embedVideo: Yup.string(),
            iconOneProj: Yup.string(),
            titleOneProj: Yup.string(),
            descOneProj: Yup.string(),
            iconTwoProj: Yup.string(),
            titleTwoProj: Yup.string(),
            descTwoProj: Yup.string(),
            iconThreeProj: Yup.string(),
            titleThreeProj: Yup.string(),
            descThreeProj: Yup.string(),
            iconFourProj: Yup.string(),
            titleFourProj: Yup.string(),
            descFourProj: Yup.string()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do Formulário Inválido!"
            })
        }

        await Home.updateOne({}, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                message: "Erro: Conteúdo da página Home não foi atualizado!"
            })
        })

        return res.json({
            error: false,
            message: "Conteúdo da página Home editado com sucesso!"
        })
    }


}

export default new HomeController