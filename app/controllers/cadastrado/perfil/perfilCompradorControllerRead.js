const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");

class PerfilCompradorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        return res.render("pages/perfil-comprador.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente,
                    nome_usuario: user.nome_usuario,
                    email_usuario: user.email_cliente
                },
                userType
            }
        })
    }
}

const PerfilCompradorControllerRead = new PerfilCompradorController();

module.exports = PerfilCompradorControllerRead;