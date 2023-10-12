const jwt = require("jsonwebtoken");

class LojaFavoritaController {
    acessarPagina(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        return res.render("pages/lojas-favoritas.ejs", {
            data: {
                page_name: "Alimentipo",
                userType
            }
        })
    }
}

const LojaFavoritaControllerRead = new LojaFavoritaController();

module.exports = LojaFavoritaControllerRead;