const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");

class EditarPerfilCompradorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);
        const userIdParameter = req.params.clienteId;

        if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
            return res.redirect("/perfil-comprador");
        }

        return res.render("pages/editar-comprador.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente,
                    nome_usuario: user.nome_cliente,
                    email_usuario: user.email_cliente
                },
                userType,
                input_values: {
                    nome: user.nome_cliente,
                    nome_usuario: user.nome_usuario,
                    email: user.email_cliente
                }
            }
        })
    }
}

const EditarPerfilCompradorControllerRead = new EditarPerfilCompradorController();

module.exports = EditarPerfilCompradorControllerRead;