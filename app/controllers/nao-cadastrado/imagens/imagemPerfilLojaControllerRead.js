const lojaModel = require("../../../models/Loja");

class ImagemPerfilLojaController {
	async acessarImagem(req, res) {
		const { lojaId } = req.params;

		try {
			const imagemPerfil = await lojaModel.getLojaImage(lojaId);

			res.setHeader("Content-Type", imagemPerfil.tipo_imagem_loja);
			return res.send(imagemPerfil.imagem_loja);
		} catch (erro) {
			console.log(erro);
			return;
		}
	}
}

const ImagemPerfilLojaControllerRead = new ImagemPerfilLojaController();

module.exports = ImagemPerfilLojaControllerRead;
