const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Autenticacao {
    async criptografarSenhaComprador(req, res, next) {
        const {
            nome,
            nome_usuario,
            email,
            senha
        } = req.body;
        const salt = Number(process.env.SALT_ROUNDS);

        try {
            const hash = await bcrypt.hash(senha, salt);

            req.senhaCriptografada = hash;

            return next();
        } catch (erro) {
            console.log(erro);
            return res.render("pages/cadastro-comprador", {
                data: {
                    page_name: "Cadastro",
                    input_values: {
                        nome,
                        nome_usuario,
                        email,
                        senha
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
        }
    }

    async criptografarSenhaVendedor(req, res, next) {
        const { nome_proprietario, cpf, data_nascimento, nome_loja, email, senha, cnpj, online_fisica, link_site, descricao, endereco, telefone } = req.body;
        const salt = Number(process.env.SALT_ROUNDS);

        try {
            const hash = await bcrypt.hash(senha, salt);

            req.senhaCriptografada = hash;

            return next();
        } catch (erro) {
            console.log(erro);

            return res.render("pages/cadastro-vendedor", {
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
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
        }
    }

    validarToken(req, res, next) {
        const token = req.session.token;
        req.session.loginRedirectUrl = req.url;

        if (!token) {
            return res.redirect("/login");
        }

        try {
            jwt.verify(token, process.env.SECRET);

            return next();
        } catch (erro) {
            console.log(erro);
            return res.redirect("/login");
        }
    }

    verificarPremium(req, res, next) {
        const premium = req.session.premium;

        if (!premium) {
            return res.redirect("/perfil");
        }

        return next();
    }
}

const AuthenticationMiddleware = new Autenticacao();

module.exports = AuthenticationMiddleware;