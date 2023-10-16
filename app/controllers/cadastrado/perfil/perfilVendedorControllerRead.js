const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");
const restricaoModel = require("../../../models/Restricao");

class PerfilVendedorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const loja = await lojaModel.findUserById(userId);
        let produtos = await restricaoModel.findAllProdutosFromLoja(userId);

        if (produtos.length === 0) {
            produtos = null
        }

        return res.render("pages/perfil-vendedor.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
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
                    produtos: produtos
                },
                userType
            }
        })
    }
}

const PerfilVendedorControllerRead = new PerfilVendedorController();

module.exports = PerfilVendedorControllerRead;