const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtoModel = require("../../../models/Produto");

class ProdutosSemGlutenController {
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

        const paginaAtual = req.params.paginaProduto;
        let produtos = await produtoModel.findProdutosComRestricao("Sem glúten", paginaAtual);
        let quantidadeProdutos = await produtoModel.contarProdutosComRestricao("Sem glúten");

        if (produtos.length === 0) {
            produtos = null;
        }

        let primeiraPagina = paginaAtual - 4 > 1 ? paginaAtual - 4 : 1;
        let quantidadePagina = Math.ceil(quantidadeProdutos / 10);
        let ultimaPagina = primeiraPagina + 4 > quantidadePagina ? quantidadePagina : primeiraPagina + 4;

        return res.render("pages/produtos-sem-gluten.ejs", {
            data: {
                page_name: "Produtos Sem Glúten",
                usuarioLogado,
                userType,
                usuario: {
                    imagem_perfil: imagemPerfil,
                    id_usuario: userId
                },
                produtos,
                paginacao: {
                    primeiraPagina,
                    ultimaPagina,
                    paginaAtual
                }
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const ProdutosSemGlutenControllerRead = new ProdutosSemGlutenController();

module.exports = ProdutosSemGlutenControllerRead;