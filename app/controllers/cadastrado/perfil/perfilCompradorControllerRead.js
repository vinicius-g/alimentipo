const jwt = require("jsonwebtoken");

class PerfilCompradorController {
    acessarPagina(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        return res.render("pages/perfil-comprador.ejs", {
            data: {
                page_name: "Alimentipo - Perfil comprador",
                userType
            }
        })
    }
}

const PerfilCompradorControllerRead = new PerfilCompradorController();

module.exports = PerfilCompradorControllerRead;