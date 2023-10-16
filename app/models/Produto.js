const prisma = require("../../server/database/prismaClient");

class Produto {
    async createProduto(data) {
        return await prisma.produto.create({
            data
        });
    }

    async updateProduto(data, produtoId) {
        return await prisma.produto.update({
            data,
            where: {
                id_produto: Number(produtoId)
            }
        })
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
        })
    }

    async findProdutos(paginaProduto) {
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
            },
            orderBy: {
                ranking_produto: "desc"
            },
            take: 10,
            skip: (Number(paginaProduto) - 1) * 10,
        })
    }

    async pesquisaProdutos(paginaProduto, pesquisa) {
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
            },
            where: {
                nome_produto: {
                    contains: pesquisa
                }
            },
            orderBy: {
                ranking_produto: "desc"
            },
            take: 10,
            skip: (Number(paginaProduto) - 1) * 10,
        })
    }

    async contarProdutosPesquisados(pesquisa) {
        return await prisma.produto.count({
            where: {
                nome_produto: {
                    contains: pesquisa
                }
            }
        });
    }

    async contarProdutos() {
        return await prisma.produto.count();
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
                },
                clientes_favoritaram: {
                    select: {
                        cliente: true
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

    async contarProdutosComRestricao(restricao) {
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

    async pesquisaProdutosComRestricao(restricao, paginaProduto, pesquisa) {
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
                },
                clientes_favoritaram: {
                    select: {
                        cliente: true
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
                        },
                        AND: {
                            produto: {
                                nome_produto: {
                                    contains: pesquisa
                                }
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

    async contarProdutosComRestricaoPesquisados(restricao, pesquisa) {
        return await prisma.produto.count({
            where: {
                restricoes: {
                    some: {
                        restricao: {
                            nome_restricao: {
                                equals: restricao
                            }
                        },
                        AND: {
                            produto: {
                                nome_produto: {
                                    contains: pesquisa
                                }
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