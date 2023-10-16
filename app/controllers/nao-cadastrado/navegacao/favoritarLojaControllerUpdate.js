const jwt = require("jsonwebtoken");
const clienteModel = require("../../../models/Cliente");
const LojasClienteModel = require("../../../models/LojasCliente");

class FavoritarLojaController {
    async favoritarLoja(req, res) {
        const token = req.session.token;
        const lojaId = req.params.lojaId;

        if (token) {
            const {userId, userType} = jwt.decode(token, process.env.SECRET);

            if (userType === "comprador") {
                try {
                    await clienteModel.favoritarLoja(userId, lojaId);

                    return res.send({status: "favoritado"});
                } catch (erro) {
                    console.log(erro);

                    if (erro.code === "P2002") {
                        await LojasClienteModel.desfavoritarLoja(userId, lojaId);

                        return res.send({status: "desfavoritado"});
                    }
                }
            }
        }

        return res.send({status: "login"});
    }
}

const FavoritarLojaControllerUpdate = new FavoritarLojaController();

module.exports = FavoritarLojaControllerUpdate;