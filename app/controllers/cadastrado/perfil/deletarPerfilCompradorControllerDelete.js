const clienteModel = require("../../../models/Cliente");
const jwt = require("jsonwebtoken");

class DeletarPerfilCompradorController {
	async deleteUser(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        const userIdParameter = req.params.clienteId;

        if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
            return res.redirect("/perfil-comprador");
        }

        await clienteModel.deleteUser(userId);
		req.session.destroy();

		res.redirect("/");
	}
}

const DeletarPerfilCompradorControllerDelete = new DeletarPerfilCompradorController();

module.exports = DeletarPerfilCompradorControllerDelete;
