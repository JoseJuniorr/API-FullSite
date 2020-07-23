import About from "../models/About";
import Footer from "../models/Footer";
import * as Yup from "yup";
import config from '../../config/config'

class AboutController {
  async show(req, res) {
    About.findOne({})
      .then((about) => {
        // var url = "http://localhost:3333/tmp/uploads/sobre" + about.fileName;
        var url = config.url + "/files/sobre/" + about.fileName;

        Footer.findOne({})
          .then((footer) => {
            return res.json({
              error: false,
              about: about,
              url: url,
              footer: footer,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              error: true,
              code: 123,
              message: "Erro: Não foi possível executar a solicitação!",
            });
          });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 131,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async store(req, res) {
    const aboutExiste = await About.findOne({});
    if (aboutExiste) {
      return res.status(400).json({
        error: true,
        code: 130,
        message:
          "Erro: O página sobre já possui um registro, você pode apenas editar as informações!",
      });
    }

    const about = About.create(req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 129,
          message: "Erro ao cadastrar os dados da página sobre!",
        });

      return res.json({
        error: false,
        message: "Dados da página sobre cadastrado com sucesso!",
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      titlePgAbout: Yup.string(),
      titleAbout: Yup.string(),
      descPgAbout: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 131,
        message: "Erro: Dados do Formulário Inválido!",
      });
    }

    await About.updateOne({}, req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro: Conteúdo da página sobre não foi atualizado!",
        });
    });

    return res.json({
      error: false,
      message: "Conteúdo da página sobre editado com sucesso!",
    });
  }
}

export default new AboutController();
