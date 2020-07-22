import InfoContato from '../models/InfoContato'
import Footer from '../models/Footer'
import * as Yup from 'yup'




class InfoContatoController {

    async show(req, res) {
        InfoContato.findOne({}).then((infoContato) => {
            Footer.findOne({}).then((footer) => {
                return res.json({
                    error: false,
                    infoContato: infoContato,
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
                code: 131,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }


    async store(req, res) {

        const infoContatoExiste = await InfoContato.findOne({})
        if (infoContatoExiste) {
            return res.status(400).json({
                error: true,
                message: "Erro: A página Info Contato já contém um registro, você pode apenas editar as informações"
            })
        }

        const infoContato = InfoContato.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 132,
                message: "Erro ao cadastrar os dados da página Info Contato!"
            })

            return res.json({
                error: false,
                message: "Dados da página Info Contato cadastrado com sucesso!"
            })

        })

    }

    async update(req, res) {

        const schema = Yup.object().shape({
            titlePgCont: Yup.string(),
            titleFlCon: Yup.string(),
            horAtend: Yup.string(),
            logradouro: Yup.string(),
            endereco: Yup.string(),
            telefone: Yup.string(),
            email: Yup.string().email()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 133,
                message: "Erro: Dados do Formulário Inválido!"
            })
        }

        await InfoContato.updateOne({}, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                message: "Erro: Conteúdo da página infoContato não foi atualizado!"
            })
        })

        return res.json({
            error: false,
            message: "Conteúdo da página Info Contato editado com sucesso!"
        })

    }




}

export default new InfoContatoController