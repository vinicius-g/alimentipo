const jwt = require("jsonwebtoken");

class ProdutoController {
	acessarPagina(req, res) {
		const token = req.session.token;
		let usuarioLogado = false;
		let userType;

		if (token) {
			const tokenInfo = jwt.decode(token, process.env.SECRET);
			userType = tokenInfo.userType;
			usuarioLogado = true;
		}

		return res.render("pages/produto-template.ejs", {
			data: {
				page_name: "Alimentipo",
				usuarioLogado,
				userType,
			},
		});
	}
}

const ProdutoControllerRead = new ProdutoController();

module.exports = ProdutoControllerRead;
