import Home from '../models/Home'

class HomeController {
    async show(req, res) {
        Home.findOne({}).then((home) => {
            return res.json({
                error: false,
                home: home
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


}

export default new HomeController