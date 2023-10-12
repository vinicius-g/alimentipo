const jwt = require("jsonwebtoken");

class CadastroCompradorController {
    acessarPagina(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userType;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userType = tokenInfo.userType;
            usuarioLogado = true;
        }

        return res.render("pages/cadastro-comprador.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType
            }
        })
    }
}

const CadastroCompradosControllerRead = new CadastroCompradorController();

module.exports = CadastroCompradosControllerRead;