const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const clienteModel = require("../models/Cliente");
const lojaModel = require("../models/Loja");

class ValidacaoFormulario {
	constructor() {
		this.validacaoCadastroComprador = this.validacaoCadastroComprador.bind(this);
        this.validacaoCadastroVendedor = this.validacaoCadastroVendedor.bind(this);
		this.validacaoLogin = this.validacaoLogin.bind(this);
	}

	validacaoCadastroComprador(req, res, next) {
		const errors = validationResult(req);

        if (req.file) {
            const imagem_perfil = req.file;

            this.#validarImagem(imagem_perfil, errors);
        }

		if (!errors.isEmpty()) {
			const { nome, nome_usuario, email, senha } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const nome_usuario_error = errors.errors.find((error) => error.path === "nome_usuario");
			const email_error = errors.errors.find((error) => error.path === "email");
			const senha_error = errors.errors.find((error) => error.path === "senha");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/cadastro-comprador.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome,
						nome_usuario,
						email,
						senha
					},
					errors: {
						nome_error,
						nome_usuario_error,
						email_error,
						senha_error,
                        imagem_perfil_error
					},
				},
			});
		}

		return next();
	}

    validacaoCadastroVendedor(req, res, next) {
        const errors = validationResult(req);
        const imagem_perfil = req.file;

        if (imagem_perfil) {
            this.#validarImagem(imagem_perfil, errors);
        } else {
            this.#validarExistenciaImagem(errors);
        }

		if (!errors.isEmpty()) {
			const { nome_proprietario, cpf, data_nascimento, nome_loja, email, senha, cnpj, online_fisica, link_site, descricao, endereco, telefone } = req.body;

			const nome_proprietario_error = errors.errors.find((error) => error.path === "nome_proprietario");
            const cpf_error = errors.errors.find((error) => error.path === "cpf");
            const data_nascimento_error = errors.errors.find((error) => error.path === "data_nascimento");
            const nome_loja_error = errors.errors.find((error) => error.path === "nome_loja");
            const email_error = errors.errors.find((error) => error.path === "email");
            const senha_error = errors.errors.find((error) => error.path === "senha");
            const cnpj_error = errors.errors.find((error) => error.path === "cnpj");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");
            const online_fisica_error = errors.errors.find((error) => error.path === "online_fisica");
            const link_site_error = errors.errors.find((error) => error.path === "link_site");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");
            const endereco_error = errors.errors.find((error) => error.path === "endereco");
            const telefone_error = errors.errors.find((error) => error.path === "telefone");

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
						nome_proprietario_error,
                        cpf_error,
                        data_nascimento_error,
                        nome_loja_error,
                        email_error,
                        senha_error,
                        cnpj_error,
                        imagem_perfil_error,
                        online_fisica_error,
                        link_site_error,
                        descricao_error,
                        endereco_error,
                        telefone_error
					},
				},
			});
		}

		return next();
    }

	async validacaoLogin(req, res, next) {
		const { email, senha } = req.body;
        let userType = "comprador";

		let user = await clienteModel.findUserByEmail(email);

        if (!user) {
            user = await lojaModel.findUserByEmail(email);
            userType = "vendedor";
        }

		if (!user) {
			return res.render("pages/login.ejs", {
				data: {
                    page_name: "Login",
					input_values: {
						email,
						senha,
					},
					errors: {
						email_error: {
							msg: "Usuário não encontrado",
						},
					},
				},
			});
		}

        let userSenha;
        let userId;

        if (userType === "comprador") {
            userSenha = user.senha_cliente;
            userId = user.id_cliente;
        } else if (userType === "vendedor") {
            userSenha = user.senha_loja;
            userId = user.id_loja;
        }

		bcrypt
			.compare(senha, userSenha)
			.then((auth) => {
				if (auth) {
					const token = jwt.sign({ userId: userId, userType }, process.env.SECRET);

					req.session.token = token;

					return next();
				}

				return res.render("pages/login.ejs", {
					data: {
                        page_name: "Login",
						input_values: {
							email,
							senha,
						},
						errors: {
							senha_error: {
								msg: "Senha incorreta",
							},
						},
					},
				});
			})
			.catch((erro) => {
				console.log(erro);
				return res.render("pages/login.ejs", {
					data: {
                        page_name: "Login",
						input_values: {
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
			});
	}

    #validarImagem(imagem_perfil, errors) {
        if (!imagem_perfil.mimetype.match("image/")) {
			errors.errors.push({
				msg: "Você deve selecionar uma imagem!",
				path: "imagem_perfil",
			});
		}
    }

    #validarExistenciaImagem(errors) {
        errors.errors.push({
            msg: "Você deve selecionar uma imagem!",
            path: "imagem_perfil",
        });
    }
}

const ValidacaoFormularioMiddleware = new ValidacaoFormulario();

module.exports = ValidacaoFormularioMiddleware;
