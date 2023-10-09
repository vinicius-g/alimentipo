class CadastroVendedorController {
    acessarPagina(req, res) {
        return res.render("pages/cadastro-vendedor.ejs", {
            data: {
                page_name: "Alimentipo - Cadastre-se"
            }
        })
    }
}

const CadastroVendedorControllerRead = new CadastroVendedorController();

module.exports = CadastroVendedorControllerRead;