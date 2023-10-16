const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtosClienteModel = require("../../../models/ProdutosCliente");

class ProdutosFavoritosController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        let produtosFavoritos = await produtosClienteModel.getAllProdutosFavoritosFromUsuario(userId);

        if (produtosFavoritos.length === 0) {
            produtosFavoritos = null
        }

        return res.render("pages/produtos-favoritos.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente,
                    nome_usuario: user.nome_usuario,
                    email_usuario: user.email_cliente
                },
                userType,
                produtosFavoritos
            }
        })
    }
}

const ProdutosFavoritosControllerRead = new ProdutosFavoritosController();

module.exports = ProdutosFavoritosControllerRead;