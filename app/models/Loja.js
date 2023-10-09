const prisma = require("../../server/database/prismaClient");

class Loja {
    async createLoja(data) {
        return await prisma.loja.create({
            data
        });
    }

    async getLojaImage(lojaId) {
        return await prisma.loja.findUnique({
            where: {
                id_loja: Number(lojaId)
            },
            select: {
                imagem_loja: true,
                tipo_imagem_loja: true
            }
        })
    }

    async findUserByEmail(email) {
        return await prisma.loja.findUnique({
            where: {
                email_loja: email
            }
        })
    }
}

const LojaModel = new Loja();

module.exports = LojaModel;