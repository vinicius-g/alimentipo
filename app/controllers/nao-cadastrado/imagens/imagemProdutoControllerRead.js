const produtoModel = require("../../../models/Produto");

class ImagemProdutoController {
	async acessarImagem(req, res) {
		const { produtoId } = req.params;

		try {
			const imagemProduto = await produtoModel.getProdutoImage(produtoId);

			res.setHeader("Content-Type", imagemProduto.tipo_imagem_produto);
			return res.send(imagemProduto.imagem_produto);
		} catch (erro) {
			console.log(erro);
            return
		}
	}
}

const ImagemProdutoControllerRead = new ImagemProdutoController();

module.exports = ImagemProdutoControllerRead;
