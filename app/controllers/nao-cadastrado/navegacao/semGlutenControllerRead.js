class ProdutoSemGlutenController {
    acessarPagina(req, res) {
        return res.render("pages/resultado-busca-sem-gluten.ejs", {
            data: {
                page_name: "Resultados de busca Sem Glúten"
            }
        })
    }
}

const ProdutoSemGlutenControllerRead = new ProdutoSemGlutenController();

module.exports = ProdutoSemGlutenControllerRead;