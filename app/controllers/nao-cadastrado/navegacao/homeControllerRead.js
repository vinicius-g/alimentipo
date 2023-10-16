const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtoModel = require("../../../models/Produto");

class HomeController {
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

        let produtosDestacados = await produtoModel.findHighRankProdutos();

        if (produtosDestacados.length === 0) {
            produtosDestacados = null;
        }

        let produtosPromocao = await produtoModel.findProdutosEmPromocao();

        if (produtosPromocao.length === 0) {
            produtosPromocao = null;
        }

        res.location("http://localhost:2405#produto-5");

        return res.render("pages/index.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType,
                usuario: {
                    imagem_perfil: imagemPerfil,
                    id_usuario: userId
                },
                produtos_destacados: produtosDestacados,
                produtos_promocao: produtosPromocao
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;