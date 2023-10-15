const prisma = require("../../server/database/prismaClient");

class Produto {
    async createProduto(data) {
        return await prisma.produto.create({
            data
        });
    }

    async findProdutoById(produtoId) {
        return await prisma.produto.findUnique({
            where: {
                id_produto: Number(produtoId)
            },
            include: {
                restricoes: {
                    include: {
                        restricao: {
                            select: {
                                nome_restricao: true
                            }
                        }
                    }
                }
            }
        })
    }

    async findAllProdutosFromLoja(lojaId) {
        return await prisma.produto.findMany({
            where: {
                loja_id: lojaId
            },
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
        })
    }

    async findHighRankProdutos() {
        return await prisma.produto.findMany({
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
            },
            orderBy: {
                ranking_produto: "desc"
            },
            take: 10
        })
    }

    async findProdutosEmPromocao() {
        return await prisma.produto.findMany({
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
            },
            where: {
                desconto_produto: {
                    not: null
                }
            },
            orderBy: {
                ranking_produto: "desc"
            },
            take: 10
        })
    }

    async findProdutosComRestricao(restricao, paginaProduto) {
        return await prisma.produto.findMany({
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
            },
            where: {
                restricoes: {
                    some: {
                        restricao: {
                            nome_restricao: {
                                equals: restricao
                            }
                        }
                    }
                }
            },
            orderBy: {
                ranking_produto: "desc"
            },
            take: 10,
            skip: (Number(paginaProduto) - 1) * 10,
        })
    }

    async contarProdutos(restricao) {
        return await prisma.produto.count({
            where: {
                restricoes: {
                    some: {
                        restricao: {
                            nome_restricao: {
                                equals: restricao
                            }
                        }
                    }
                }
            }
        })
    }

    async getProdutoImage(produtoId) {
        return await prisma.produto.findUnique({
            where: {
                id_produto: Number(produtoId)
            },
            select: {
                imagem_produto: true,
                tipo_imagem_produto: true
            }
        })
    }

    async deleteProduto(produtoId) {
        return await prisma.produto.delete({
            where: {
                id_produto: Number(produtoId)
            }
        })
    }
}

const ProdutoModel = new Produto();

module.exports = ProdutoModel;