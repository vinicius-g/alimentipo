const lojaModel = require("../../../models/Loja");
const jwt = require("jsonwebtoken");

class DeletarPerfilVendedorController {
	async deleteUser(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        const userIdParameter = req.params.lojaId;

        if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
            return res.redirect("/perfil-vendedor");
        }

        await lojaModel.deleteLoja(userId);
		req.session.destroy();

		res.redirect("/");
	}
}

const DeletarPerfilVendedorControllerDelete = new DeletarPerfilVendedorController();

module.exports = DeletarPerfilVendedorControllerDelete;
