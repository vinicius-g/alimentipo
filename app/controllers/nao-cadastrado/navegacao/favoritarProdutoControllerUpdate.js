const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const ProdutosClienteModel = require("../../../models/ProdutosCliente");

class FavoritarProdutoController {
    async favoritarProduto(req, res) {
        const token = req.session.token;
        const produtoId = req.params.produtoId;

        if (token) {
            const {userId, userType} = jwt.decode(token, process.env.SECRET);

            if (userType === "comprador") {
                try {
                    await clienteModel.favoritarProduto(userId, produtoId);

                    return res.send({status: "favoritado"});
                } catch (erro) {
                    console.log(erro);

                    if (erro.code === "P2002") {
                        await ProdutosClienteModel.desfavoritarProduto(userId, produtoId);

                        return res.send({status: "desfavoritado"});
                    }
                }
            }
        }

        return res.send({status: "login"});
    }
}

const FavoritarProdutoControllerUpdate = new FavoritarProdutoController();

module.exports = FavoritarProdutoControllerUpdate;