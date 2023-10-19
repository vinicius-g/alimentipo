const lojaModel = require("../../../models/Loja");
const jwt = require("jsonwebtoken");

class minhaAssinaturaController {
	async acessarPagina(req, res) {
		const token = req.session.token;
		const { userType, userId } = jwt.decode(token, process.env.SECRET);
		const user = await lojaModel.findUserById(userId);

		return res.render("pages/minha-assinatura.ejs", {
			data: {
				page_name: "Alimentipo",
				usuario: {
                    id_usuario: user.id_loja,
					imagem_perfil: user.imagem_loja,
				},
				userType,
			},
		});
	}
}

const minhaAssinaturaControllerRead = new minhaAssinaturaController();

module.exports = minhaAssinaturaControllerRead;
