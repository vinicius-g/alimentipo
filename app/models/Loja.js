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
                id_loja: Number(userId)
            },
            include: {
                clientes_favoritaram: {
                    select: {
                        cliente: {
                            select: {
                                id_cliente: true
                            }
                        }
                    }
                }
            }
        })
    }

    async updateLoja(data, userId) {
        return await prisma.loja.update({
            where: {
                id_loja: userId
            },
            data
        })
    }

    async deleteLoja(userId) {
        return await prisma.loja.delete({
            where: {
                id_loja: userId
            }
        })
    }

    async addUserPremium(userId) {
        return await prisma.loja.update({
            where: {
                id_loja: userId
            },
            data: {
                premium: 1
            }
        })
    }

    async removeUserPremium(userId) {
        return await prisma.loja.update({
            where: {
                id_loja: userId
            },
            data: {
                premium: 0
            }
        })
    }
}

const LojaModel = new Loja();

module.exports = LojaModel;