const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");

class EditarPerfilVendedorController {
	async acessarPagina(req, res) {
		const token = req.session.token;
		const { userType, userId } = jwt.decode(token, process.env.SECRET);
		const user = await lojaModel.findUserById(userId);
		const userIdParameter = req.params.lojaId;
        const dataNascimentoFormatoValido = new Date(user.data_nascimento * 1000);
        const diaNascimento = dataNascimentoFormatoValido.getDate();
        const mesNascimento = (dataNascimentoFormatoValido.getMonth() + 1).toString().padStart(2, "0");
        const anoNascimento = dataNascimentoFormatoValido.getFullYear();
        const dataNascimento = `${diaNascimento}/${mesNascimento}/${anoNascimento}`

		if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
			return res.redirect("/perfil-vendedor");
		}

		return res.render("pages/editar-vendedor.ejs", {
			data: {
				page_name: "Alimentipo - Perfil vendedor",
				usuario: {
					id_usuario: user.id_loja,
					imagem_perfil: user.imagem_loja,
					nome_usuario: user.nome_proprietario,
					email_usuario: user.email_loja,
				},
				userType,
				input_values: {
					nome_proprietario: user.nome_proprietario,
					cpf: user.cpf_loja,
					data_nascimento: dataNascimento,
					nome_loja: user.nome_loja,
					email: user.email_loja,
					cnpj: user.cnpj_loja,
					online_fisica: user.online_fisica,
					link_site: user.link_loja,
					descricao: user.descricao_loja,
					endereco: user.endereco_loja,
					telefone: user.telefone_loja,
				},
			},
		});
	}
}

const EditarPerfilVendedorControllerRead = new EditarPerfilVendedorController();

module.exports = EditarPerfilVendedorControllerRead;
