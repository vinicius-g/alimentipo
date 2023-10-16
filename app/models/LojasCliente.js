const prisma = require("../../server/database/prismaClient");

class LojasCliente {
    async desfavoritarLoja(userId, lojaId) {
        return await prisma.lojas_Clientes.delete({
            where: {
                id_loja_id_cliente: {
                    id_cliente: Number(userId),
                    id_loja: Number(lojaId)
                }
            }
        })
    }

    async getSomeLojasFavoritasFromUsuario(userId) {
        return await prisma.lojas_Clientes.findMany({
            where: {
                id_cliente: Number(userId)
            },
            include: {
                loja: {
                    include: {
                        clientes_favoritaram: {
                            select: {
                                id_cliente: true
                            }
                        }
                    }
                }
            },
            take: 4
        })
    }

    async getAllLojasFavoritasFromUsuario(userId) {
        return await prisma.lojas_Clientes.findMany({
            where: {
                id_cliente: Number(userId),
            },
            include: {
                loja: {
                    include: {
                        clientes_favoritaram: {
                            select: {
                                id_cliente: true
                            }
                        }
                    }
                }
            }
        })
    }
}

const LojasClienteModel = new LojasCliente();

module.exports = LojasClienteModel;