const lojaModel = require("../../../models/Loja");

class CadastroController {
	async cadastrarLoja(req, res) {
		const { nome_proprietario, cpf, data_nascimento, nome_loja, email, senha, cnpj, online_fisica, link_site, descricao, endereco, telefone } = req.body;
		const imagem_perfil = req.file;

        const data_nascimento_unix = Math.floor(new Date(data_nascimento).getTime() / 1000);

		try {
			await lojaModel.createLoja({
                nome_proprietario: nome_proprietario,
                cpf_loja: cpf,
                data_nascimento: data_nascimento_unix,
                nome_loja: nome_loja,
                email_loja: email,
                senha_loja: senha,
                cnpj_loja: cnpj,
                online_fisica: online_fisica,
                link_loja: link_site,
                descricao_loja: descricao,
                endereco_loja: endereco,
                telefone_loja: telefone,
                imagem_loja: imagem_perfil.buffer,
                tipo_imagem_loja: imagem_perfil.mimetype
            });

			return res.redirect("/login");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/cadastro-vendedor.ejs", {
					data: {
						page_name: "Cadastro",
						input_values: {
							nome_proprietario,
							cpf,
							data_nascimento,
							nome_loja,
							email,
							senha,
							cnpj,
							online_fisica,
							link_site,
							descricao,
							endereco,
							telefone,
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/cadastro-vendedor.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome_proprietario,
                        cpf,
                        data_nascimento,
                        nome_loja,
                        email,
                        senha,
                        cnpj,
                        online_fisica,
                        link_site,
                        descricao,
                        endereco,
                        telefone
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

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;
