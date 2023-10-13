const prisma = require("../../server/database/prismaClient");

class Cliente {
    async createCliente(data) {
        return await prisma.cliente.create({
            data
        });
    }

    async getClienteImage(clienteId) {
        return await prisma.cliente.findUnique({
            where: {
                id_cliente: Number(clienteId)
            },
            select: {
                imagem_cliente: true,
                tipo_imagem_cliente: true
            }
        })
    }

    async findUserByEmail(email) {
        return await prisma.cliente.findUnique({
            where: {
                email_cliente: email
            },
            select: {
                id_cliente: true,
                email_cliente: true,
                senha_cliente: true,
            }
        })
    }

    async findUserById(userId) {
        return await prisma.cliente.findUnique({
            where: {
                id_cliente: Number(userId)
            }
        })
    }

    async updateUser(data, userId) {
        return await prisma.cliente.update({
            where: {
                id_cliente: userId
            },
            data
        })
    }
}

const ClienteModel = new Cliente();

module.exports = ClienteModel;