const jwt = require("jsonwebtoken");
class HomeController {
    acessarPagina(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userType;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userType = tokenInfo.userType;
            usuarioLogado = true;
        }

        return res.render("pages/index.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType
            }
        })
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;