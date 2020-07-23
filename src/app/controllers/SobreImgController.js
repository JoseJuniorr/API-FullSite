import About from '../models/About'
import fs from 'fs';


class SobreImgController {

    async update(req, res) {

        if (!req.file) {
            return res.status(400).json({
                error: true,
                code: 135,
                message: "Erro: São aceitas apenas imagens .jpeg .jpg .png!"
            });
        }

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        // console.log(dadosImagem);
        // console.log(req.file);

        await About.findOne({}, '_id fileName').then((about) => {
            //console.log(about)
            req.dadosAbout = about.fileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 134,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });

        await About.updateOne({}, dadosImagem, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 135,
                message: "Erro: Imagem da página sobre não foi atualizado!"
            });
        });

        //exclui imagem antiga da pasta temp página sobre
        const imgAntiga = req.file.destination + "/" + req.dadosAbout;

        fs.access(imgAntiga, (err) => {
            if (!err) {
                fs.unlink(imgAntiga, err => {
                    //msg excluída
                })
            }
        })


        return res.json({
            error: false,
            message: "Imagem da página sobre editada com sucesso!"
        })

    }


}

export default new SobreImgController