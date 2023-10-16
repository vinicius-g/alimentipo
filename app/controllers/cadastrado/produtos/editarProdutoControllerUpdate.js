const jwt = require("jsonwebtoken");
const lojaModel = require("../../../models/Loja");
const produtoModel = require("../../../models/Produto");
const restricaoModel = require("../../../models/Restricao");

class EditarProdutoController {
	async editarProduto(req, res) {
		const token = req.session.token;
		const { userType, userId } = jwt.decode(token, process.env.SECRET);
		const loja = await lojaModel.findUserById(userId);
		const produtoId = req.params.produtoId;
		const produto = await produtoModel.findProdutoById(produtoId);

		if (Number(userId) !== Number(produto.loja_id) && userType !== "administrador") {
			return res.redirect("/perfil-vendedor");
		}

		const { link_produto, descricao_produto, estoque_produto, desconto_produto } = req.body;

		try {
			await produtoModel.updateProduto({
				link_produto,
				descricao_produto,
				estoque_produto: Number(estoque_produto),
				desconto_produto: desconto_produto ? Number(desconto_produto) : null,
			}, produtoId);

			return res.redirect("/perfil-vendedor");
		} catch (erro) {
			console.log(erro);

            let produtos = await restricaoModel.findAllProdutosFromLoja(userId);

            if (produtos.length === 0) {
                produtos = null
            }

			return res.render("pages/perfil-vendedor.ejs", {
				data: {
					page_name: "Alimentipo",
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
					userType,
					input_values: {
						link_produto,
						descricao_produto,
						estoque_produto,
						desconto_produto,
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema tente novamente mais tarde!",
						},
					},
					produto_erro: produtoId,
				},
			});
		}
	}
}

const EditarProdutoControllerUpdate = new EditarProdutoController();

module.exports = EditarProdutoControllerUpdate;
