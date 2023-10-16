const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const lojaModel = require("../../../models/Loja");
const restricaoModel = require("../../../models/Restricao");

class LojaController {
    constructor() {
        this.acessarPagina = this.acessarPagina.bind(this);
    }

    async acessarPagina(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userType;
        let userId;
        let imagemPerfil = true;
        const lojaId = req.params.lojaId;
        const loja = await lojaModel.findUserById(lojaId);
        let produtos = await restricaoModel.findAllProdutosFromLoja(userId);

        if (produtos.length === 0) {
            produtos = null
        }

        if (!loja) {
            return res.redirect("/");
        }

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userType = tokenInfo.userType;
            userId = tokenInfo.userId;
            usuarioLogado = true;

            if (userType === "comprador") {
                imagemPerfil = this.#usuarioTemFoto(userId);
            }

            if (Number(userId) === Number(lojaId)) {
                return res.redirect("/perfil-vendedor");
            }
        }

        return res.render("pages/loja-template.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType,
                usuario: {
                    imagem_perfil: imagemPerfil,
                    id_usuario: userId
                },
                loja: {
                    id_usuario: loja.id_loja,
                    imagem_perfil: loja.imagem_loja,
                    nome_proprietario: loja.nome_proprietario,
                    nome_loja: loja.nome_loja,
                    email_loja: loja.email_loja,
                    online_fisica: loja.online_fisica,
                    link_loja: loja.link_loja,
                    telefone_loja: loja.telefone_loja,
                    endereco_loja: loja.endereco_loja,
                    descricao_loja: loja.descricao_loja,
                    clientes_favoritaram: loja.clientes_favoritaram,
                    produtos: produtos
                }
            }
        })
    }

    async #usuarioTemFoto(userId) {
        const {imagem_cliente} = await clienteModel.getClienteImage(userId);

        return imagem_cliente ? true : false;
    }
}

const LojaControllerRead = new LojaController();

module.exports = LojaControllerRead;