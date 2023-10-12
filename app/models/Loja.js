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
            },
            select: {
                id_loja: true,
                email_loja: true,
                senha_loja: true
            }
        })
    }

    async findUserById(userId) {
        return await prisma.loja.findUnique({
            where: {
                id_loja: userId
            },
            select: {
                id_loja: true,
                nome_loja: true,
                nome_proprietario: true,
                email_loja: true,
                imagem_loja: true
            }
        })
    }
}

const LojaModel = new Loja();

module.exports = LojaModel;