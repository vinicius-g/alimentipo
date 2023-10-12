const jwt = require("jsonwebtoken");

class ProdutosDestacadosController {
	acessarPagina(req, res) {
		const token = req.session.token;
		let usuarioLogado = false;
		let userType;

		if (token) {
			const tokenInfo = jwt.decode(token, process.env.SECRET);
			userType = tokenInfo.userType;
			usuarioLogado = true;
		}

		return res.render("pages/produtos-destacados.ejs", {
			data: {
				page_name: "Alimentipo",
				usuarioLogado,
				userType,
			},
		});
	}
}

const ProdutosDestacadosControllerRead = new ProdutosDestacadosController();

module.exports = ProdutosDestacadosControllerRead;
