class LogoutController {
    async acessarPagina(req, res) {
       req.session.destroy();

       res.redirect("/");
    }
}

const LogoutControllerRead = new LogoutController();

module.exports = LogoutControllerRead;