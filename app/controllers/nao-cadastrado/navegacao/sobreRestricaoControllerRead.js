const jwt = require("jsonwebtoken");

class SobreRestricoesController {
	acessarPagina(req, res) {
		const token = req.session.token;
		let usuarioLogado = false;
		let userType;

		if (token) {
			const tokenInfo = jwt.decode(token, process.env.SECRET);
			userType = tokenInfo.userType;
			usuarioLogado = true;
		}

		return res.render("pages/sobre-restricoes.ejs", {
			data: {
				page_name: "Alimentipo",
				usuarioLogado,
				userType,
			},
		});
	}
}

const SobreRestricoesControllerRead = new SobreRestricoesController();

module.exports = SobreRestricoesControllerRead;
