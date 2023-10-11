const jwt = require("jsonwebtoken");

class LoginController {
	async autenticarCliente(req, res) {
		const token = req.session.token;
		const { userType } = jwt.decode(token, process.env.SECRET);

		if (userType === "comprador") {
			const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/perfil-comprador";
			req.session.loginRedirectUrl = null;
			return res.redirect(loginRedirectUrl);
		} else if (userType === "vendedor") {
			const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/perfil-vendedor";
			req.session.loginRedirectUrl = null;
			return res.redirect(loginRedirectUrl);
		}
	}
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;
