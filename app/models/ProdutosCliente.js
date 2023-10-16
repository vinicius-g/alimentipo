const prisma = require("../../server/database/prismaClient");

class ProdutosCliente {
    async desfavoritarProduto(userId, produtoId) {
        return await prisma.produtos_Clientes.delete({
            where: {
                id_produto_id_cliente: {
                    id_cliente: Number(userId),
                    id_produto: Number(produtoId)
                }
            }
        })
    }

    async getSomeProdutosFavoritosFromUsuario(userId) {
        return await prisma.produtos_Clientes.findMany({
            where: {
                cliente: {
                    id_cliente: Number(userId),
                }
            },
            include: {
                produto: {
                    include: {
                        restricoes: {
                            select: {
                                restricao: {
                                    select: {
                                        nome_restricao: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            take: 4
        })
    }

    async getAllProdutosFavoritosFromUsuario(userId) {
        return await prisma.produtos_Clientes.findMany({
            where: {
                cliente: {
                    id_cliente: Number(userId),
                }
            },
            include: {
                produto: {
                    include: {
                        restricoes: {
                            select: {
                                restricao: {
                                    select: {
                                        nome_restricao: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}

const ProdutosClienteModel = new ProdutosCliente();

module.exports = ProdutosClienteModel;