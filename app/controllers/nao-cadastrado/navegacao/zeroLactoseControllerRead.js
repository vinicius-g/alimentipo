class ProdutoZeroLactoseController {
    acessarPagina(req, res) {
        return res.render("pages/resultado-busca-zero-lactose.ejs", {
            data: {
                page_name: "Resultado de busca Zero Lactose"
            }
        })
    }
}

const ProdutoZeroLactoseControllerRead = new ProdutoZeroLactoseController();

module.exports = ProdutoZeroLactoseControllerRead;