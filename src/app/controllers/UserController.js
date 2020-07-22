import * as Yup from "yup";
import bcrypt from "bcrypt";
import User from "../models/User";

class UserController {
  async index(req, res) {
    // await User.find({}).select("-password").then((users) => {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    //console.log(page)

    await User.paginate({}, { select: "_id name email", page: 1, limit })
      .then((users) => {
        res.json({
          error: false,
          users: users,
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
    User.findOne({ _id: req.params.id }, "_id name email creatAt updateAt")
      .then((user) => {
        console.log(user);
        return res.json({
          error: false,
          user: user,
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
    //validação com yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidados!",
      });
    }

    const emailExiste = await User.findOne({ email: req.body.email });
    if (emailExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: E-mail já está cadastrado!",
      });
    }

    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    const user = await User.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 101,
          message: "Erro: Usuário não foi cadastrado!",
        });
      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
        dados: user,
      });
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 108,
        message: "Erro: Dados do formulário inválido!",
      });
    }
    //console.log(req.body)

    const { _id, email } = req.body;

    const usuarioExiste = await User.findOne({ _id });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 109,
        message: "Erro: Usuário não encontrado!",
      });
    }

    if (email != usuarioExiste.email) {
      const emailExiste = await User.findOne({ email });

      if (emailExiste) {
        return res.status(400).json({
          error: true,
          code: 110,
          message: "Erro: Este e-mail já está sendo usado!",
        });
      }
    }

    var dados = req.body;
    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 8);
    }

    await User.updateOne({ _id: dados._id }, dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 111,
          message: "Erro: O usuário não foi editado com sucesso!",
        });

      return res.json({
        error: false,
        message: "Usuário editado com sucesso!",
      });
    });
  }

  async delete(req, res) {
    // console.log(req.userId)

    const usuarioExiste = await User.findOne({ _id: req.params.id });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        message: "Erro: Usuário não encontrado!",
      });
    }

    const user = User.deleteOne({ _id: req.params.id }, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 122,
          message: "Erro: Usuário não foi excluído!",
        });
    });

    return res.json({
      error: false,
      message: "Usuário excluído com sucesso!",
    });
  }
}

export default new UserController();
