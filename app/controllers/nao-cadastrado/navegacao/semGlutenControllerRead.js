const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const restricaoModel = require("../../../models/Restricao");

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
        let produtos = await restricaoModel.findAllProdutosComRestricao("Sem glúten", paginaAtual);

        if (!produtos) {
            produtos = null
        }

        return res.render("pages/produtos-sem-gluten.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType,
                usuario: {
                    imagem_perfil: imagemPerfil,
                    id_usuario: userId
                },
                produtos
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const ProdutosDestacadosControllerRead = new ProdutosSemGlutenController();

module.exports = ProdutosDestacadosControllerRead;