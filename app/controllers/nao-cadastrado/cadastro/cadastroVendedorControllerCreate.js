const lojaModel = require("../../../models/Loja");
const clienteModel = require("../../../models/Cliente");
const jwt = require("jsonwebtoken");

class CadastroController {
	constructor() {
		this.cadastrarLoja = this.cadastrarLoja.bind(this);
	}

	async cadastrarLoja(req, res) {
		const token = req.session.token;
		let usuarioLogado = false;
		let userType;
		let userId;
		let imagemPerfil = true;

		if (token) {
			const tokenInfo = jwt.decode(token, process.env.SECRET);
			userType = tokenInfo.userType;
			userId = tokenInfo.userId;
			usuarioLogado = true;

			if (userType === "comprador") {
				imagemPerfil = await this.#usuarioTemFoto(userId);
			}
		}

		const { nome_proprietario, cpf, data_nascimento, nome_loja, email, senha, cnpj, online_fisica, link_site, descricao, endereco, telefone, termos_condicoes } = req.body;
		const imagem_perfil = req.file;
		const data_nascimento_array = data_nascimento.split("/");
		const data_nascimento_formato_valido = `${data_nascimento_array[2]}/${data_nascimento_array[1]}/${data_nascimento_array[0]}`;

		const data_nascimento_unix = Math.floor(new Date(data_nascimento_formato_valido).getTime() / 1000);

		const cliente = await clienteModel.findUserByEmail(email);

		if (cliente) {
			return res.render("pages/cadastro-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
					usuarioLogado,
					userType,
					usuario: {
						imagem_perfil: imagemPerfil,
						id_usuario: userId,
					},
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
                        termos_condicoes
					},
					errors: {
						email_error: {
							msg: "Email já cadastrado como um cliente!",
						},
					},
				},
			});
		}

		try {
			await lojaModel.createLoja({
				nome_proprietario: nome_proprietario,
				cpf_loja: cpf,
				data_nascimento: data_nascimento_unix,
				nome_loja: nome_loja,
				email_loja: email,
				senha_loja: req.senhaCriptografada,
				cnpj_loja: cnpj ? cnpj : null,
				online_fisica: online_fisica,
				link_loja: link_site,
				descricao_loja: descricao,
				endereco_loja: endereco,
				telefone_loja: telefone,
				imagem_loja: imagem_perfil.buffer,
				tipo_imagem_loja: imagem_perfil.mimetype,
                termos_condicoes: Number(termos_condicoes)
			});

			return res.redirect("/login");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				if (erro.meta.target === "Loja_cpf_loja_key") {
					return res.render("pages/cadastro-vendedor.ejs", {
						data: {
							page_name: "Alimentipo",
							usuarioLogado,
							userType,
							usuario: {
								imagem_perfil: imagemPerfil,
								id_usuario: userId,
							},
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
                                termos_condicoes
							},
							errors: {
								cpf_error: {
									msg: "CPF já cadastrado!",
								},
							},
						},
					});
				}

				if (erro.meta.target === "Loja_email_loja_key") {
					return res.render("pages/cadastro-vendedor.ejs", {
						data: {
							page_name: "Alimentipo",
							usuarioLogado,
							userType,
							usuario: {
								imagem_perfil: imagemPerfil,
								id_usuario: userId,
							},
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
                                termos_condicoes
							},
							errors: {
								email_error: {
									msg: "Email já cadastrado!",
								},
							},
						},
					});
				}

				if (erro.meta.target === "Loja_cnpj_loja_key") {
					return res.render("pages/cadastro-vendedor.ejs", {
						data: {
							page_name: "Alimentipo",
							usuarioLogado,
							userType,
							usuario: {
								imagem_perfil: imagemPerfil,
								id_usuario: userId,
							},
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
                                termos_condicoes
							},
							errors: {
								cnpj_error: {
									msg: "CNPJ já cadastrado!",
								},
							},
						},
					});
				}
			}

			return res.render("pages/cadastro-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
					usuarioLogado,
					userType,
					usuario: {
						imagem_perfil: imagemPerfil,
						id_usuario: userId,
					},
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
                        termos_condicoes
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

	async #usuarioTemFoto(userId) {
		const { imagem_cliente } = await clienteModel.getClienteImage(userId);

		return imagem_cliente ? true : false;
	}
}

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;
