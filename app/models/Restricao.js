const prisma = require("../../server/database/prismaClient");

class Restricao {
    async findRestricaoByName(nomeRestricao) {
        return await prisma.restricao.findUnique({
            where: {
                nome_restricao: nomeRestricao
            }
        })
    }

    async findAllProdutosFromLoja(lojaId) {
        return await prisma.restricao.findMany({
            where: {
                produtos: {
                    some: {
                        produto: {
                            loja_id: lojaId
                        }
                    }
                }
            },
            include: {
                produtos: {
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
                                },
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
                        },
                    },
                    orderBy: {
                        produto: {
                            ranking_produto: "desc"
                        }
                    }
                }
            }
        })
    }
}

const restricaoModel = new Restricao();

module.exports = restricaoModel;