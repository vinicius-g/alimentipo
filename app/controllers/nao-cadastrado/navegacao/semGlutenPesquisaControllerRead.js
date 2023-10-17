const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtoModel = require("../../../models/Produto");

class ProdutosSemGlutenPesquisaController {
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
                imagemPerfil = await this.#usuarioTemFoto(userId);
            }
        }

        const paginaAtual = req.params.paginaProduto;
        const pesquisa = req.query.pesquisa;
        let produtos = await produtoModel.pesquisaProdutosComRestricao("Sem glúten", paginaAtual, pesquisa);
        let quantidadeProdutos = await produtoModel.contarProdutosComRestricaoPesquisados("Sem glúten", pesquisa);

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
                },
                pesquisa
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const ProdutosSemGlutenPesquisaControllerRead = new ProdutosSemGlutenPesquisaController();

module.exports = ProdutosSemGlutenPesquisaControllerRead;