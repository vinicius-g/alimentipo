const jwt = require("jsonwebtoken");

class ProdutoZeroLactoseController {
	acessarPagina(req, res) {
		const token = req.session.token;
		let usuarioLogado = false;
		let userType;

		if (token) {
			const tokenInfo = jwt.decode(token, process.env.SECRET);
			userType = tokenInfo.userType;
			usuarioLogado = true;
		}

		return res.render("pages/resultado-busca-zero-lactose.ejs", {
			data: {
				page_name: "Alimentipo",
				usuarioLogado,
				userType,
			},
		});
	}
}

const ProdutoZeroLactoseControllerRead = new ProdutoZeroLactoseController();

module.exports = ProdutoZeroLactoseControllerRead;
