class CadastroCompradorController {
    acessarPagina(req, res) {
        return res.render("pages/cadastro-comprador.ejs", {
            data: {
                page_name: "Alimentipo - Cadastre-se"
            }
        })
    }
}

const CadastroCompradosControllerRead = new CadastroCompradorController();

module.exports = CadastroCompradosControllerRead;