const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");

class DeletarPerfilVendedorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const loja = await lojaModel.findUserById(userId);

        return res.render("pages/deletar-vendedor.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: loja.id_loja,
                    imagem_perfil: loja.imagem_loja
                },
                userType
            }
        })
    }
}

const DeletarPerfilVendedorControllerRead = new DeletarPerfilVendedorController();

module.exports = DeletarPerfilVendedorControllerRead;