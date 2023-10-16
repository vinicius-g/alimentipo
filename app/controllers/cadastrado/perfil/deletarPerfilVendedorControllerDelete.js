const lojaModel = require("../../../models/Loja");
const jwt = require("jsonwebtoken");

class DeletarPerfilVendedorController {
	async deleteUser(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
		const userIdParameter = req.params.lojaId;

		if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
			return res.redirect("/perfil-vendedor");
		}

		const loja = await lojaModel.findUserById(userId);

		try {
			await lojaModel.deleteLoja(userId);
			req.session.destroy();

			res.redirect("/");
		} catch (erro) {
			console.log(erro);

            return res.render("pages/deletar-vendedor.ejs", {
                data: {
                    page_name: "Alimentipo",
                    userType,
                    usuario: {
                        imagem_perfil: loja.imagem_loja,
                        id_usuario: loja.id_loja,
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

const DeletarPerfilVendedorControllerDelete = new DeletarPerfilVendedorController();

module.exports = DeletarPerfilVendedorControllerDelete;
