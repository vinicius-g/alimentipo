class SobreRestricoesController {
    acessarPagina(req, res) {
        return res.render("pages/sobre_restricoes.ejs", {
            data: {
                page_name: "Alimentipo - Sobre restrições"
            }
        })
    }
}

const SobreRestricoesControllerRead = new SobreRestricoesController();

module.exports = SobreRestricoesControllerRead;