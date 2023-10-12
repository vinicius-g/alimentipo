const jwt = require("jsonwebtoken");

class CadastroVendedorController {
    acessarPagina(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userType;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userType = tokenInfo.userType;
            usuarioLogado = true;
        }
e
        return res.render("pages/cadastro-v.ejs", {
            data: {
                page_name: "Alimentipo",
                usuarioLogado,
                userType
            }
        })
    }
}

const CadastroVendedorControllerRead = new CadastroVendedorController();

module.exports = CadastroVendedorControllerRead;