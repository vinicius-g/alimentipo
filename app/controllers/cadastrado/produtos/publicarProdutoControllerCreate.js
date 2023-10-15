const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");
const produtoModel = require("../../../models/Produto");
const restricaoModel = require("../../../models/Restricao");

class PublicarProdutoController {
	async cadastrarProduto(req, res) {
		const token = req.session.token;
		const { userType, userId } = jwt.decode(token, process.env.SECRET);
		const loja = await lojaModel.findUserById(userId);

		const { nome_produto, preco_produto, link_produto, descricao_produto, estoque_produto, restricao_produto, desconto_produto } = req.body;
        const imagem_produto = req.file;

        const restricaoSelecionada = await restricaoModel.findRestricaoByName(restricao_produto);

		try {
            await produtoModel.createProduto({
                imagem_produto: imagem_produto.buffer,
                tipo_imagem_produto: imagem_produto.mimetype,
                nome_produto,
                preco_produto: Number(preco_produto),
                link_produto,
                descricao_produto,
                estoque_produto: Number(estoque_produto),
                loja: {
                    connect: {
                        id_loja: userId
                    }
                },
                restricoes: {
                    create: [
                        {
                            restricao: {
                                connect: {
                                    id_restricao: restricaoSelecionada.id_restricao
                                }
                            }
                        }
                    ]
                },
                desconto_produto: desconto_produto ? Number(desconto_produto) : null
            });

            return res.redirect("/perfil-vendedor");
		} catch (erro) {
			console.log(erro);

			return res.render("pages/cadastro-produto.ejs", {
				data: {
					page_name: "Alimentipo",
					usuario: {
						id_usuario: loja.id_loja,
						imagem_perfil: loja.imagem_loja,
					},
					userType,
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
                        sistema_error: {
                            msg: "Erro de sistema tente novamente mais tarde!"
                        }
                    },
				},
			});
		}
	}
}

const PublicarProdutoControllerRead = new PublicarProdutoController();

module.exports = PublicarProdutoControllerRead;
