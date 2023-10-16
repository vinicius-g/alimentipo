const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const produtosClienteModel = require("../../../models/ProdutosCliente");
const lojasClientesModel = require("../../../models/LojasCliente");

class PerfilCompradorController {
    async acessarPagina(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        const user = await clienteModel.findUserById(userId);

        let produtosFavoritos = await produtosClienteModel.getSomeProdutosFavoritosFromUsuario(userId);

        let lojasFavoritas = await lojasClientesModel.getSomeLojasFavoritasFromUsuario(userId);

        if (produtosFavoritos.length === 0) {
            produtosFavoritos = null;
        }

        if (lojasFavoritas.length === 0) {
            lojasFavoritas = null;
        }

        return res.render("pages/perfil-comprador.ejs", {
            data: {
                page_name: "Alimentipo",
                usuario: {
                    id_usuario: user.id_cliente,
                    imagem_perfil: user.imagem_cliente,
                    nome_usuario: user.nome_usuario,
                    email_usuario: user.email_cliente
                },
                userType,
                produtosFavoritos,
                lojasFavoritas
            }
        })
    }
}

const PerfilCompradorControllerRead = new PerfilCompradorController();

module.exports = PerfilCompradorControllerRead;