const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtoModel = require("../../../models/Produto");

class ProdutosZeroAcucarController {
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
                imagemPerfil = await arioTemFoto(userId);
            }
        }

        const paginaAtual = req.params.paginaProduto;
        let produtos = await produtoModel.findProdutosComRestricao("Zero açúcar", paginaAtual);
        let quantidadeProdutos = await produtoModel.contarProdutosComRestricao("Zero açúcar");

        if (produtos.length === 0) {
            produtos = null;
        }

        let primeiraPagina = paginaAtual - 4 > 1 ? paginaAtual - 4 : 1;
        let quantidadePagina = Math.ceil(quantidadeProdutos / 10);
        let ultimaPagina = primeiraPagina + 4 > quantidadePagina ? quantidadePagina : primeiraPagina + 4;

        return res.render("pages/produtos-zero-acucar.ejs", {
            data: {
                page_name: "Produtos Zero Açúcar",
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

const ProdutosZeroAcucarControllerRead = new ProdutosZeroAcucarController();

module.exports = ProdutosZeroAcucarControllerRead;