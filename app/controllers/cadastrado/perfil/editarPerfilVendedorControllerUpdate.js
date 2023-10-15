const clienteModel = require("../../../models/Cliente");
const lojaModel = require("../../../models/Loja");
const jwt = require("jsonwebtoken");

class EditarPerfilVendedorController {
	async editarLoja(req, res) {
        const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
		const userIdParameter = req.params.lojaId;

		const { nome_proprietario, cpf, data_nascimento, nome_loja, email, senha, cnpj, online_fisica, link_site, descricao, endereco, telefone } = req.body;
        const data_nascimento_array = data_nascimento.split("/");
        const data_nascimento_formato_valido = `${data_nascimento_array[2]}/${data_nascimento_array[1]}/${data_nascimento_array[0]}`;

        const data_nascimento_unix = Math.floor(new Date(data_nascimento_formato_valido).getTime() / 1000);

		let buffer_imagem_perfil;
		let tipo_imagem_perfil;

        const loja = await lojaModel.findUserById(userId);
        const user = await clienteModel.findUserByEmail(email);

		if (req.file) {
			const imagem_perfil = req.file;
			buffer_imagem_perfil = imagem_perfil.buffer;
			tipo_imagem_perfil = imagem_perfil.mimetype;
		} else {
            buffer_imagem_perfil = loja.imagem_loja;
            tipo_imagem_perfil = loja.tipo_imagem_loja
        }

		if (Number(userId) !== Number(userIdParameter) && userType !== "administrador") {
			return res.redirect("/perfil-vendedor");
		}

		if (user) {
			return res.render("pages/editar-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
					userType,
					usuario: {
						id_usuario: loja.id_loja,
						imagem_perfil: loja.imagem_loja,
						nome_usuario: loja.nome_proprietario,
						email_usuario: loja.email_loja,
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
					},
					errors: {
						email_error: {
							msg: "Email já cadastrado como um usuario!",
						},
					},
				},
			});
		}

		try {
			await lojaModel.updateLoja(
				{
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
                    imagem_loja: buffer_imagem_perfil,
                    tipo_imagem_loja: tipo_imagem_perfil
				},
				userId
			);

			return res.redirect("/perfil-vendedor");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				if (erro.meta.target === "Loja_cpf_loja_key") {
                    return res.render("pages/editar-vendedor.ejs", {
                        data: {
                            page_name: "Alimentipo",
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
                                cpf_error: {
                                    msg: "CPF já cadastrado!",
                                },
                            },
                        },
                    });
                }

                if (erro.meta.target === "Loja_email_loja_key") {
                    return res.render("pages/editar-vendedor.ejs", {
                        data: {
                            page_name: "Alimentipo",
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

                if (erro.meta.target === "Loja_cnpj_loja_key") {
                    return res.render("pages/editar-vendedor.ejs", {
                        data: {
                            page_name: "Alimentipo",
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
                                cnpj_error: {
                                    msg: "CNPJ já cadastrado!",
                                },
                            },
                        },
                    });
                }
			}

			return res.render("pages/editar-vendedor.ejs", {
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

const EditarPerfilVendedorControllerUpdate = new EditarPerfilVendedorController();

module.exports = EditarPerfilVendedorControllerUpdate;
