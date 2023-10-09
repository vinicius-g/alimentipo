class ProdutoZeroAcucarController {
    acessarPagina(req, res) {
        return res.render("pages/resultado-busca-zero-acucar.ejs", {
            data: {
                page_name: "Resultado de busca Zero Açucar"
            }
        })
    }
}

const ProdutoZeroAcucarControllerRead = new ProdutoZeroAcucarController();

module.exports = ProdutoZeroAcucarControllerRead;