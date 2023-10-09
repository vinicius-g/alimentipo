class HomeController {
    acessarPagina(req, res) {
        return res.render("pages/index.ejs", {
            data: {
                page_name: "Alimentipo"
            }
        })
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;