const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const lojasClientesModel = require("../../../models/LojasCliente");

class LojasFavoritasController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        let lojasFavoritas = await lojasClientesModel.getAllLojasFavoritasFromUsuario(userId)

        if (lojasFavoritas.length === 0) {
            lojasFavoritas = null
        }

        return res.render("pages/lojas-favoritas.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente,
                    nome_usuario: user.nome_usuario,
                    email_usuario: user.email_cliente
                },
                userType,
                lojasFavoritas
            }
        })
    }
}

const LojasFavoritasControllerRead = new LojasFavoritasController();

module.exports = LojasFavoritasControllerRead;