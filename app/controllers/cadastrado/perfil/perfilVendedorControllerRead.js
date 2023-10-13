const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");

class PerfilVendedorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const loja = await lojaModel.findUserById(userId);

        return res.render("pages/perfil-vendedor.ejs", {
            data: {
                page_name: "Alimentipo - Perfil vendedor",
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
                    descricao_loja: loja.descricao_loja
                },
                userType
            }
        })
    }
}

const PerfilVendedorControllerRead = new PerfilVendedorController();

module.exports = PerfilVendedorControllerRead;