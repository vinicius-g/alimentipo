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
                        produto: true
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