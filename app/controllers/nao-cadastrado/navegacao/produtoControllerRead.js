class ProdutoController {
    acessarPagina(req, res) {
        return res.render("pages/produto-template.ejs", {
            data: {
                page_name: "Alimentipo - Produto"
            }
        })
    }
}

const ProdutoControllerRead = new ProdutoController();

module.exports = ProdutoControllerRead;