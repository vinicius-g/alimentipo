const clienteModel = require("../../../models/Cliente");
const jwt = require("jsonwebtoken");

class DeletarPerfilCompradorController {
	async deleteUser(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
		const userIdParameter = req.params.clienteId;

		if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
			return res.redirect("/perfil-comprador");
		}

		const cliente = await clienteModel.findUserById(userId);

		try {
			await clienteModel.deleteUser(userId);
			req.session.destroy();

			res.redirect("/");
		} catch (erro) {
			console.log(erro);

            return res.render("pages/deletar-comprador.ejs", {
                data: {
                    page_name: "Alimentipo",
                    userType,
                    usuario: {
                        imagem_perfil: cliente.imagem_cliente,
                        id_usuario: cliente.id_cliente,
                    },
                    input_values: {
                        senha,
                        confirmacao_senha,
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!",
                        },
                    },
                },
            });
		}
	}
}

const DeletarPerfilCompradorControllerDelete = new DeletarPerfilCompradorController();

module.exports = DeletarPerfilCompradorControllerDelete;
