const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");

class DeletarPerfilCompradorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        return res.render("pages/deletar-comprador.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente
                },
                userType
            }
        })
    }
}

const DeletarPerfilCompradorControllerRead = new DeletarPerfilCompradorController();

module.exports = DeletarPerfilCompradorControllerRead;