class ProdutosDestacadosController {
    acessarPagina(req, res) {
        return res.render("pages/produtos-destacados.ejs", {
            data: {
                page_name: "Alimentipo - Produtos destacados"
            }
        })
    }
}

const ProdutosDestacadosControllerRead = new ProdutosDestacadosController();

module.exports = ProdutosDestacadosControllerRead;