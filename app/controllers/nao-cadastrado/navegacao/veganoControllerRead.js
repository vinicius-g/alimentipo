class ProdutoVeganoController {
    acessarPagina(req, res) {
        return res.render("pages/resultado-busca-veganos.ejs", {
            data: {
                page_name: "Produtos Veganos"
            }
        })
    }
}

const ProdutoVeganoControllerRead = new ProdutoVeganoController();

module.exports = ProdutoVeganoControllerRead;