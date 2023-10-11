class PerfilCompradorController {
    acessarPagina(req, res) {
        return res.render("pages/perfil-comprador.ejs", {
            data: {
                page_name: "Alimentipo - Perfil comprador"
            }
        })
    }
}

const PerfilCompradorControllerRead = new PerfilCompradorController();

module.exports = PerfilCompradorControllerRead;