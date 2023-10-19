const clienteModel = require("../../../models/Cliente");
const lojaModel = require("../../../models/Loja");

class CadastroController {
	async cadastrarCliente(req, res) {
		const { nome, nome_usuario, email, senha, termos_condicoes } = req.body;
        let buffer_imagem_perfil;
        let tipo_imagem_perfil;
        if (req.file) {
            const imagem_perfil = req.file;
            buffer_imagem_perfil = imagem_perfil.buffer;
            tipo_imagem_perfil = imagem_perfil.mimetype;
        }

        const loja = await lojaModel.findUserByEmail(email);

        if (loja) {
            return res.render("pages/cadastro-comprador.ejs", {
                data: {
                    page_name: "Alimentipo",
                    input_values: {
                        nome,
                        nome_usuario,
                        email,
                        senha,
                        termos_condicoes
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
			await clienteModel.createCliente({
                nome_cliente: nome,
                nome_usuario: nome_usuario,
                email_cliente: email,
                senha_cliente: req.senhaCriptografada,
                imagem_cliente: buffer_imagem_perfil,
                tipo_imagem_cliente: tipo_imagem_perfil,
                termos_condicoes: Number(termos_condicoes),
            })

			return res.redirect("/login");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/cadastro-comprador.ejs", {
					data: {
						page_name: "Alimentipo",
						input_values: {
							nome,
                            nome_usuario,
                            email,
                            senha,
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

			return res.render("pages/cadastro-comprador.ejs", {
				data: {
					page_name: "Alimentipo",
					input_values: {
						nome,
                        nome_usuario,
                        email,
                        senha
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
