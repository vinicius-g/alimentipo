const jwt = require("jsonwebtoken");

class PerfilVendedorController {
    acessarPagina(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        return res.render("pages/perfil-vendedor.ejs", {
            data: {
                page_name: "Alimentipo - Perfil vendedor",
                userType
            }
        })
    }
}

const PerfilVendedorControllerRead = new PerfilVendedorController();

module.exports = PerfilVendedorControllerRead;