class LoginController {
    acessarPagina(req, res) {
        return res.render("pages/login.ejs", {
            data: {
                page_name: "Alimentipo - Login"
            }
        })
    }
}

const LoginControllerRead = new LoginController();

module.exports = LoginControllerRead;