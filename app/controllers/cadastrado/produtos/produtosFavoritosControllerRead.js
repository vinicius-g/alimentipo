const jwt = require("jsonwebtoken");

class ProdutosFavoritosController {
    acessarPagina(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        return res.render("pages/produtos-favoritos.ejs", {
            data: {
                page_name: "Alimentipo",
                userType
            }
        })
    }
}

const ProdutosFavoritosControllerRead = new ProdutosFavoritosController();

module.exports = ProdutosFavoritosControllerRead;