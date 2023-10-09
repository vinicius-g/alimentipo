const clienteModel = require("../../../models/Cliente");

class ImagemPerfilClienteController {
    async acessarImagem(req, res) {
        const {clienteId} = req.params;

        const imagemPerfil = await clienteModel.getClienteImage(clienteId);

        res.setHeader("Content-Type", imagemPerfil.tipo_imagem_cliente);
        return res.send(imagemPerfil.imagem_cliente);
    }
}

const ImagemPerfilClienteControllerRead = new ImagemPerfilClienteController();

module.exports = ImagemPerfilClienteControllerRead;