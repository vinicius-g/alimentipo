const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const clienteModel = require("../models/Cliente");
const lojaModel = require("../models/Loja");
const restricaoModel = require("../models/Restricao");

class ValidacaoFormulario {
	constructor() {
		this.validacaoCadastroComprador = this.validacaoCadastroComprador.bind(this);
		this.validacaoCadastroEditarComprador = this.validacaoCadastroEditarComprador.bind(this);
		this.validacaoCadastroVendedor = this.validacaoCadastroVendedor.bind(this);
        this.validacaoCadastroEditarVendedor = this.validacaoCadastroEditarVendedor.bind(this);
		this.validacaoLogin = this.validacaoLogin.bind(this);
        this.validacaoDeletarPerfilVendedor = this.validacaoDeletarPerfilVendedor.bind(this);
        this.validacaoDeletarPerfilComprador = this.validacaoDeletarPerfilComprador.bind(this);
        this.validacaoCadastroProduto = this.validacaoCadastroProduto.bind(this);
	}

	async validacaoCadastroComprador(req, res, next) {
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

			return res.render("pages/cadastro-comprador.ejs", {
				data: {
					page_name: "Alimentipo",
					userType,
					usuarioLogado,
					usuario: {
						imagem_perfil: imagemPerfil,
						id_usuario: userId,
					},
					input_values: {
						nome,
						nome_usuario,
						email,
						senha,
					},
					errors: {
						nome_error,
						nome_usuario_error,
						email_error,
						senha_error,
						imagem_perfil_error,
					},
				},
			});
		}

		return next();
	}

	async validacaoCadastroEditarComprador(req, res, next) {
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

            const token = req.session.token;
            const {userId, userType} = jwt.decode(token, process.env.SECRET);
            const user = await clienteModel.findUserById(userId);

			return res.render("pages/editar-comprador.ejs", {
				data: {
					page_name: "Alimentipo",
                    userType,
                    usuario: {
                        id_usuario: user.id_cliente,
                        imagem_perfil: user.imagem_cliente,
                        nome_usuario: user.nome_cliente,
                        email_usuario: user.email_cliente
                    },
					input_values: {
						nome,
						nome_usuario,
						email,
						senha,
					},
					errors: {
						nome_error,
						nome_usuario_error,
						email_error,
						senha_error,
						imagem_perfil_error,
					},
				},
			});
		}

		return next();
	}

    async validacaoDeletarPerfilComprador(req, res, next) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);

        const cliente = await clienteModel.findUserById(userId);

        const {senha, confirmacao_senha} = req.body;

        bcrypt
			.compare(senha, cliente.senha_cliente)
			.then((auth) => {
				if (auth) {
                    if (senha !== confirmacao_senha) {
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
                                    confirmacao_senha
                                },
                                errors: {
                                    confirmacao_senha_error: {
                                        msg: "Senhas não batem",
                                    },
                                },
                            },
                        });
                    }

					return next();
				}

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
                            confirmacao_senha
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
			});
    }

	async validacaoCadastroVendedor(req, res, next) {
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
						telefone_error,
					},
				},
			});
		}

		return next();
	}

    async validacaoCadastroEditarVendedor(req, res, next) {
		const errors = validationResult(req);
        const imagem_perfil = req.file;

        if (imagem_perfil) {
            this.#validarImagem(imagem_perfil, errors);
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

            const token = req.session.token;
            const {userId, userType} = jwt.decode(token, process.env.SECRET);
            const user = await lojaModel.findUserById(userId);

			return res.render("pages/editar-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
                    userType,
                    usuario: {
                        id_usuario: user.id_loja,
                        imagem_perfil: user.imagem_loja,
                        nome_usuario: user.nome_proprietario,
                        email_usuario: user.email_loja
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
						telefone_error,
					},
				},
			});
		}

		return next();
	}

    async validacaoDeletarPerfilVendedor(req, res, next) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);

        const loja = await lojaModel.findUserById(userId);

        const {senha, confirmacao_senha} = req.body;

        bcrypt
			.compare(senha, loja.senha_loja)
			.then((auth) => {
				if (auth) {
                    if (senha !== confirmacao_senha) {
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
                                    confirmacao_senha
                                },
                                errors: {
                                    confirmacao_senha_error: {
                                        msg: "Senhas não batem",
                                    },
                                },
                            },
                        });
                    }

					return next();
				}

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
                            confirmacao_senha
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
			});
    }

    async validacaoCadastroProduto(req, res, next) {
		const errors = validationResult(req);
		const imagem_produto = req.file;

		if (imagem_produto) {
			this.#validarImagemProduto(imagem_produto, errors);
		} else {
			this.#validarExistenciaImagemProduto(errors);
		}

		if (!errors.isEmpty()) {
			const { nome_produto, preco_produto, link_produto, descricao_produto, estoque_produto, restricao_produto, desconto_produto } = req.body;

			const nome_produto_error = errors.errors.find((error) => error.path === "nome_produto");
            const preco_produto_error = errors.errors.find((error) => error.path === "preco_produto");
            const link_produto_error = errors.errors.find((error) => error.path === "link_produto");
            const descricao_produto_error = errors.errors.find((error) => error.path === "descricao_produto");
            const estoque_produto_error = errors.errors.find((error) => error.path === "estoque_produto");
            const restricao_produto_error = errors.errors.find((error) => error.path === "restricao_produto");
            const desconto_produto_error = errors.errors.find((error) => error.path === "desconto_produto");
            const imagem_produto_error = errors.errors.find((error) => error.path === "imagem_produto");

            const token = req.session.token;
            const {userId, userType} = jwt.decode(token, process.env.SECRET);
            const user = await lojaModel.findUserById(userId);

			return res.render("pages/cadastro-produto.ejs", {
				data: {
					page_name: "Alimentipo",
					userType,
					usuario: {
						imagem_perfil: user.imagem_loja,
						id_usuario: user.id_loja,
					},
					input_values: {
						nome_produto,
                        preco_produto,
                        link_produto,
                        descricao_produto,
                        estoque_produto,
                        restricao_produto,
                        desconto_produto
					},
					errors: {
						nome_produto_error,
                        preco_produto_error,
                        link_produto_error,
                        descricao_produto_error,
                        estoque_produto_error,
                        restricao_produto_error,
                        desconto_produto_error,
                        imagem_produto_error
					},
				},
			});
		}

		return next();
	}

    async validacaoEditarProduto(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { link_produto, descricao_produto, estoque_produto, desconto_produto } = req.body;

            const link_produto_error = errors.errors.find((error) => error.path === "link_produto");
            const descricao_produto_error = errors.errors.find((error) => error.path === "descricao_produto");
            const estoque_produto_error = errors.errors.find((error) => error.path === "estoque_produto");
            const desconto_produto_error = errors.errors.find((error) => error.path === "desconto_produto");

            const token = req.session.token;
            const {userId, userType} = jwt.decode(token, process.env.SECRET);
            const loja = await lojaModel.findUserById(userId);
            const produtoId = req.params.produtoId;

            let produtos = await restricaoModel.findAllProdutosFromLoja(userId);

            if (produtos.length === 0) {
                produtos = null
            }

			return res.render("pages/perfil-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
					userType,
					usuario: {
						id_usuario: loja.id_loja,
						imagem_perfil: loja.imagem_loja,
						nome_proprietario: loja.nome_proprietario,
						nome_loja: loja.nome_loja,
						email_loja: loja.email_loja,
						online_fisica: loja.online_fisica,
						link_loja: loja.link_loja,
						telefone_loja: loja.telefone_loja,
						endereco_loja: loja.endereco_loja,
						descricao_loja: loja.descricao_loja,
                        produtos: produtos
					},
					input_values: {
                        link_produto,
                        descricao_produto,
                        estoque_produto,
                        desconto_produto
					},
					errors: {
                        link_produto_error,
                        descricao_produto_error,
                        estoque_produto_error,
                        desconto_produto_error,
					},
                    produto_erro: produtoId
				},
			});
		}

		return next();
	}

	async validacaoLogin(req, res, next) {
		const { email, senha } = req.body;
		let userType = "comprador";
		const token = req.session.token;
		let usuarioLogado = false;
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

		let user = await clienteModel.findUserByEmail(email);

		if (!user) {
			user = await lojaModel.findUserByEmail(email);
			userType = "vendedor";
		}

		if (!user) {
			return res.render("pages/login.ejs", {
				data: {
					page_name: "Alimentipo",
					input_values: {
						email,
						senha,
					},
					errors: {
						email_error: {
							msg: "Usuário não encontrado",
						},
					},
					usuarioLogado,
					userType,
					usuario: {
						imagem_perfil: imagemPerfil,
						id_usuario: userId,
					},
				},
			});
		}

		let userSenha;

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
						page_name: "Alimentipo",
						usuarioLogado,
						userType,
						usuario: {
							imagem_perfil: imagemPerfil,
							id_usuario: userId,
						},
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
						page_name: "Alimentipo",
						usuarioLogado,
						userType,
						usuario: {
							imagem_perfil: imagemPerfil,
							id_usuario: userId,
						},
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

    #validarImagemProduto(imagem_produto, errors) {
		if (!imagem_produto.mimetype.match("image/")) {
			errors.errors.push({
				msg: "Você deve selecionar uma imagem!",
				path: "imagem_produto",
			});
		}
	}

	#validarExistenciaImagem(errors) {
		errors.errors.push({
			msg: "Você deve selecionar uma imagem!",
			path: "imagem_perfil",
		});
	}

    #validarExistenciaImagemProduto(errors) {
		errors.errors.push({
			msg: "Você deve selecionar uma imagem!",
			path: "imagem_produto",
		});
	}

	async #usuarioTemFoto(userId) {
		const { imagem_cliente } = await clienteModel.getClienteImage(userId);

		return imagem_cliente ? true : false;
	}
}

const ValidacaoFormularioMiddleware = new ValidacaoFormulario();

module.exports = ValidacaoFormularioMiddleware;
