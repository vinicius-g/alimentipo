const clienteModel = require("../../../models/Cliente");

class ImagemPerfilClienteController {
	async acessarImagem(req, res) {
		const { clienteId } = req.params;

		try {
			const imagemPerfil = await clienteModel.getClienteImage(clienteId);

			res.setHeader("Content-Type", imagemPerfil.tipo_imagem_cliente);
			return res.send(imagemPerfil.imagem_cliente);
		} catch (erro) {
			console.log(erro);
            return
		}
	}
}

const ImagemPerfilClienteControllerRead = new ImagemPerfilClienteController();

module.exports = ImagemPerfilClienteControllerRead;
