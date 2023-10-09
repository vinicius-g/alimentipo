const lojaModel = require("../../../models/Loja");

class ImagemPerfilClienteController {
    async acessarImagem(req, res) {
        const {lojaId} = req.params;

        const imagemPerfil = await lojaModel.getLojaImage(lojaId);

        res.setHeader("Content-Type", imagemPerfil.tipo_imagem_loja);
        return res.send(imagemPerfil.imagem_loja);
    }
}

const ImagemPerfilClienteControllerRead = new ImagemPerfilClienteController();

module.exports = ImagemPerfilClienteControllerRead;