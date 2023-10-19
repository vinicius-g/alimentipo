-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem_cliente` LONGBLOB NULL,
    `tipo_imagem_cliente` VARCHAR(191) NULL,
    `nome_cliente` VARCHAR(100) NOT NULL,
    `nome_usuario` VARCHAR(100) NOT NULL,
    `email_cliente` VARCHAR(100) NOT NULL,
    `senha_cliente` CHAR(60) NOT NULL,
    `termos_condicoes` TINYINT NOT NULL,

    UNIQUE INDEX `Cliente_email_cliente_key`(`email_cliente`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loja` (
    `id_loja` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_loja` CHAR(11) NOT NULL,
    `imagem_loja` LONGBLOB NOT NULL,
    `tipo_imagem_loja` VARCHAR(191) NOT NULL,
    `cnpj_loja` CHAR(14) NULL,
    `nome_loja` VARCHAR(100) NOT NULL,
    `nome_proprietario` VARCHAR(100) NOT NULL,
    `email_loja` VARCHAR(100) NOT NULL,
    `data_nascimento` INTEGER NOT NULL,
    `senha_loja` CHAR(60) NOT NULL,
    `link_loja` VARCHAR(255) NULL,
    `endereco_loja` VARCHAR(255) NULL,
    `telefone_loja` CHAR(11) NOT NULL,
    `descricao_loja` VARCHAR(200) NOT NULL,
    `online_fisica` VARCHAR(15) NOT NULL,
    `premium` TINYINT NOT NULL DEFAULT 0,
    `ranking_loja` INTEGER NOT NULL DEFAULT 1,
    `termos_condicoes` TINYINT NOT NULL,

    UNIQUE INDEX `Loja_cpf_loja_key`(`cpf_loja`),
    UNIQUE INDEX `Loja_cnpj_loja_key`(`cnpj_loja`),
    UNIQUE INDEX `Loja_email_loja_key`(`email_loja`),
    PRIMARY KEY (`id_loja`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restricao` (
    `id_restricao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_restricao` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Restricao_nome_restricao_key`(`nome_restricao`),
    PRIMARY KEY (`id_restricao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem_produto` LONGBLOB NOT NULL,
    `tipo_imagem_produto` VARCHAR(191) NOT NULL,
    `nome_produto` VARCHAR(100) NOT NULL,
    `descricao_produto` VARCHAR(200) NOT NULL,
    `link_produto` VARCHAR(255) NOT NULL,
    `preco_produto` DOUBLE NOT NULL,
    `estoque_produto` TINYINT NOT NULL,
    `ranking_produto` INTEGER NOT NULL DEFAULT 1,
    `desconto_produto` INTEGER NULL,
    `loja_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos_Clientes` (
    `id_produto` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_produto`, `id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lojas_Clientes` (
    `id_loja` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_loja`, `id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restricoes_Produtos` (
    `id_produto` INTEGER NOT NULL,
    `id_restricao` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_restricao`, `id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_loja_id_fkey` FOREIGN KEY (`loja_id`) REFERENCES `Loja`(`id_loja`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produtos_Clientes` ADD CONSTRAINT `Produtos_Clientes_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produtos_Clientes` ADD CONSTRAINT `Produtos_Clientes_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lojas_Clientes` ADD CONSTRAINT `Lojas_Clientes_id_loja_fkey` FOREIGN KEY (`id_loja`) REFERENCES `Loja`(`id_loja`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lojas_Clientes` ADD CONSTRAINT `Lojas_Clientes_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restricoes_Produtos` ADD CONSTRAINT `Restricoes_Produtos_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restricoes_Produtos` ADD CONSTRAINT `Restricoes_Produtos_id_restricao_fkey` FOREIGN KEY (`id_restricao`) REFERENCES `Restricao`(`id_restricao`) ON DELETE CASCADE ON UPDATE CASCADE;
