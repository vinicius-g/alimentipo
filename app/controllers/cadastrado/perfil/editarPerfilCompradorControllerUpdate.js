const clienteModel = require("../../../models/Cliente");
const lojaModel = require("../../../models/Loja");
const jwt = require("jsonwebtoken");

class EditarPerfilCompradorController {
	async editarCliente(req, res) {
		const { nome, nome_usuario, email, senha } = req.body;
		let buffer_imagem_perfil;
		let tipo_imagem_perfil;
		if (req.file) {
			const imagem_perfil = req.file;
			buffer_imagem_perfil = imagem_perfil.buffer;
			tipo_imagem_perfil = imagem_perfil.mimetype;
		}

		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
		const userIdParameter = req.params.clienteId;

		if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
			return res.redirect("/perfil-comprador");
		}

		const loja = await lojaModel.findUserByEmail(email);
        const user = await clienteModel.findUserById(userId);

		if (loja) {
			return res.render("pages/editar-comprador.ejs", {
				data: {
					page_name: "Alimentipo",
					userType,
					usuario: {
						id_usuario: user.id_cliente,
						imagem_perfil: user.imagem_cliente,
						nome_usuario: user.nome_usuario,
						email_usuario: user.email_cliente,
					},
					input_values: {
						nome,
						nome_usuario,
						email,
						senha,
					},
					errors: {
						email_error: {
							msg: "Email já cadastrado como uma loja!",
						},
					},
				},
			});
		}

		try {
			await clienteModel.updateUser(
				{
					nome_cliente: nome,
					nome_usuario: nome_usuario,
					email_cliente: email,
					senha_cliente: req.senhaCriptografada,
					imagem_cliente: buffer_imagem_perfil ? buffer_imagem_perfil : null,
					tipo_imagem_cliente: tipo_imagem_perfil ? tipo_imagem_perfil : null,
				},
				userId
			);

			return res.redirect("/perfil-comprador");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/editar-comprador.ejs", {
					data: {
						page_name: "Alimentipo",
						userType,
						usuario: {
							id_usuario: user.id_cliente,
							imagem_perfil: user.imagem_cliente,
							nome_usuario: user.nome_usuario,
							email_usuario: user.email_cliente,
						},
						input_values: {
							nome,
							nome_usuario,
							email,
							senha,
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/editar-comprador.ejs", {
				data: {
					page_name: "Alimentipo",
					input_values: {
						nome,
						nome_usuario,
						email,
						senha,
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

const EditarPerfilCompradorControllerUpdate = new EditarPerfilCompradorController();

module.exports = EditarPerfilCompradorControllerUpdate;
