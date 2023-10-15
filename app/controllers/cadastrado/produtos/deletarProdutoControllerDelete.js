const produtoModel = require("../../../models/Produto");
const jwt = require("jsonwebtoken");

class DeletarProdutoController {
	async deleteProduto(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        const produtoId = req.params.produtoId;
        const produto = await produtoModel.findProdutoById(produtoId);
        const lojaId = produto.loja_id;

        if (Number(lojaId) !== Number(userId) && userType !== "administrador") {
            return res.redirect("/perfil-vendedor");
        }

        await produtoModel.deleteProduto(produtoId);

		res.redirect("/perfil-vendedor");
	}
}

const DeletarProdutoControllerDelete = new DeletarProdutoController();

module.exports = DeletarProdutoControllerDelete;
