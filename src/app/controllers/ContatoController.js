import * as Yup from "yup";
import Contato from "../models/Contato";

class ContatoController {

  //listar contatos
  async index(req, res) {

    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    //console.log(page)

    await Contato.paginate({}, { select: "_id name email assuntoMsg msg createdAt updatedAt", page: 1, limit })
      .then((contato) => {
        res.json({
          error: false,
          contato: contato,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 106,
          message: "Error: Não foi possível executar a ação!",
        });
      });
  }


  async show(req, res) {
    Contato.findOne({ _id: req.params.id })
      .then((contato) => {
        return res.json({
          error: false,
          contato: contato,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: true,
          code: 107,
          message: "Error: Não foi possível executar a solicitação!",
        });
      });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      assuntoMsg: Yup.string().required(),
      msg: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 133,
        message: "Erro: Dados do Formulário Inválido!",
      });
    }

    const cadContato = Contato.create(req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 132,
          message: "Erro ao enviar os dados do formulário de Contato!",
        });

      return res.json({
        error: false,
        message: "Dados de Contato cadastrado com sucesso!",
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      nome: Yup.string(),
      email: Yup.string().email(),
      assuntoMsg: Yup.string(),
      msg: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 133,
        message: "Erro: Dados do Formulário Inválido!",
      });
    }

    await Contato.updateOne({ _id: req.body._id }, req.body, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro: Conteúdo da mensagem de Contato não foi atualizado!",
        });
    });

    return res.json({
      error: false,
      message: "Conteúdo da mensagem de Contato editado com sucesso!",
    });
  }

  async delete(req, res) {
    const contatoExiste = await Contato.findOne({ _id: req.params.id });

    if (!contatoExiste) {
      return res.status(400).json({
        error: true,
        message: "Erro: Contato não encontrado!",
      });
    }

    const contato = Contato.deleteOne({ _id: req.params.id }, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 122,
          message: "Erro: Contato não foi excluído!",
        });
    });

    return res.json({
      error: false,
      message: "Contato excluído com sucesso!",
    });
  }
}

export default new ContatoController();
