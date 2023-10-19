const lojaModel = require("../../../models/Loja");
const produtoModel = require("../../../models/Produto");
const jwt = require("jsonwebtoken");

class AssinaturaLojaController {
    async updateUserPremium(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        const userIdParam = req.params.lojaId;

        if (Number(userId) !== Number(userIdParam) && userType !== "admin") {
            return res.redirect("/perfil-vendedor");
        }

        await lojaModel.addUserPremium(userId);

        await produtoModel.updateProdutoHighRank(userId);

        return res.redirect("/perfil-vendedor")
    }
}


const adicionarAssinatuarLojaControllerUpdate = new AssinaturaLojaController();

module.exports = adicionarAssinatuarLojaControllerUpdate;