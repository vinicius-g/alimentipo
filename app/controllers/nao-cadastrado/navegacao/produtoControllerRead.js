const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtoModel = require("../../../models/Produto");
const lojaModel = require("../../../models/Loja");

class ProdutoController {
    constructor() {
        this.acessarPagina = this.acessarPagina.bind(this);
    }

    async acessarPagina(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userType;
        let userId;
        let imagemPerfil = true;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userType = tokenInfo.userType;
            userId = tokenInfo.userId;
            usuarioLogado = true;

            if (userType === "comprador") {
                imagemPerfil = this.#usuarioTemFoto(userId);
            }
        }

        const produtoId = req.params.produtoId;

        if (!produtoId) {
            return res.redirect("/");
        }

        const produto = await produtoModel.findProdutoById(produtoId);

        const sugestaoProdutos = await produtoModel.findHighRankProdutos();

        const loja = await lojaModel.findUserById(produto.loja_id);

        return res.render("pages/produto-template.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType,
                usuario: {
                    imagem_perfil: imagemPerfil,
                    id_usuario: userId
                },
                produto,
                loja,
                sugestaoProdutos
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const ProdutoControllerRead = new ProdutoController();

module.exports = ProdutoControllerRead;