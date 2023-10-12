const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");

class PerfilCompradorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        return res.render("pages/perfil-comprador.ejs", {
            data: {
                page_name: "Alimentipo - Perfil comprador",
                usuario: {
                    id_cliente: user.id_cliente,
                    imagem_cliente: user.imagem_cliente,
                    nome_cliente: user.nome_cliente,
                    email_cliente: user.email_cliente
                },
                userType
            }
        })
    }
}

const PerfilCompradorControllerRead = new PerfilCompradorController();

module.exports = PerfilCompradorControllerRead;