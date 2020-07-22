import Footer from "../models/Footer";
import * as Yup from "yup";

class FooterController {
  async show(req, res) {
    Footer.findOne({})
      .then((footer) => {
        return res.json({
          error: false,
          footer: footer,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 127,
          message: "Erro: Não foi possível executar a solicitação!",
        });
      });
  }

  async store(req, res) {
    const footerExiste = await Footer.findOne({});
    if (footerExiste) {
      return res.status(400).json({
        error: true,
        code: 126,
        message: "Erro: O rodapé já possui um registro!",
      });
    }

    const footer = await Footer.create(req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 125,
          message: "Erro ao cadastrar os dados do rodapé",
        });

      return res.json({
        error: false,
        message: "Dados do rodapé cadastrado com sucesso!",
      });
    });
  }

  async update(req, res) {
    //validação dos campos do formulário
    const schema = Yup.object().shape({
      titlePg: Yup.string(),
      titleCont: Yup.string(),
      telCont: Yup.string(),
      endCont: Yup.string(),
      titleRedSoc: Yup.string(),
      instaTitle: Yup.string(),
      instaLink: Yup.string(),
      youtubeTitle: Yup.string(),
      youtubeLink: Yup.string(),
      FaceTitle: Yup.string(),
      FaceLink: Yup.string(),
      LinkedInTitle: Yup.string(),
      LinkedInTitleLink: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 128,
        message: "Erro: Dados do Formulário Inválido!",
      });
    }

    await Footer.updateOne({}, req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro: Conteúdo do rodapé não foi atualizado!",
        });
    });

    return res.json({
      error: false,
      message: "Conteúdo do rodapé editado com sucesso!",
    });
  }
}

export default new FooterController();
