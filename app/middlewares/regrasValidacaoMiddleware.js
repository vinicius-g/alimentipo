const { body } = require("express-validator");

const ValidacaoMiddleware = {
    RegrasValidacaoCadastroComprador: [
        body("nome")
        .trim()
        .isLength({min: 3})
        .withMessage("Insira seu nome completo!")
        .isLength({max: 100})
        .withMessage("Seu nome não pode passar de 100 caracteres!"),
        body("nome_usuario")
        .trim()
        .isLength({min: 3})
        .withMessage("Seu nome de usuário deve ter pelo menos 3 caracteres!")
        .isLength({max: 100})
        .withMessage("Seu nome não pode passar de 100 caracteres!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial!"),
        body("termos_condicoes")
        .isIn(["1"])
        .withMessage("Por favor aceite os termos e condições")
    ],
    RegrasValidacaoCadastroVendedor: [
        body("nome_proprietario")
        .trim()
        .isLength({min: 3})
        .withMessage("Insira o seu nome completo!")
        .isLength({max: 100})
        .withMessage("O seu nome não pode ter mais de 100 caracteres!"),
        body("cpf")
        .isInt()
        .withMessage("Informe apenas os números do seu CPF!")
        .isLength({min: 11, max: 11})
        .withMessage("Informe o seu CPF!"),
        body("data_nascimento")
        .isLength({min: 10, max: 10})
        .withMessage("Insira sua data de nascimento no formato DD/MM/AAAA!")
        .matches(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/)
        .withMessage("Insira sua data de nascimento no padrão DD/MM/AAAA!"),
        body("nome_loja")
        .isLength({min: 3})
        .withMessage("Insira o seu nome completo!")
        .isLength({max: 100})
        .withMessage("O nome da sua loja não pode ter mais de 100 caracteres!"),
        body("email")
        .isEmail()
        .withMessage("Informe o seu email completo!"),
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial!"),
        body("cnpj")
        .optional({values: "falsy"})
        .isInt()
        .withMessage("Informe apenas os números do seu CNPJ")
        .isLength({min: 14, max: 14})
        .withMessage("Informe o seu CNPJ!"),
        body("online_fisica")
        .trim()
        .isLength({min: 6})
        .withMessage("Escolha se sua loja é online ou física!"),
        body("link_site")
        .optional()
        .isURL()
        .withMessage("Informe o link da sua loja!")
        .isLength({max: 255})
        .withMessage("O link do seu site não pode ter mais de 255 caracteres!"),
        body("descricao")
        .trim()
        .isLength({min: 3})
        .withMessage("Sua descrição deve ter ao menos 3 caracteres!")
        .isLength({max: 200})
        .withMessage("A sua descrição não pode ter mais de 200 caracteres!"),
        body("endereco")
        .optional({values: "falsy"})
        .trim()
        .isLength({min: 3})
        .withMessage("Seu endereço deve ter ao menos 3 caracteres!")
        .isLength({max: 255})
        .withMessage("Seu endereço não pode ter mais de 255 caracteres!"),
        body("telefone")
        .isLength({min: 11, max: 11})
        .withMessage("Informe os seu telefone!")
        .isInt()
        .withMessage("Informe apenas os números do seu telefone!"),
        body("termos_condicoes")
        .isIn(["1"])
        .withMessage("Por favor aceite os termos e condições")
    ],
    RegrasValidacaoCadastroProduto: [
        body("nome_produto")
        .trim()
        .isString()
        .withMessage("Escreva um nome para o seu produto!")
        .isLength({min: 3})
        .withMessage("O nome do seu produto deve ter no mínimo 3 caracteres!")
        .isLength({max: 100})
        .withMessage("O nome do seu produto não pode ter mais de 100 caracteres!"),
        body("preco_produto")
        .isFloat()
        .withMessage("Selecione um valor para o seu produto")
        .isFloat({max: 10000})
        .withMessage("Você não pode escolher um valor maior que R$ 10.000!")
        .isFloat({min: 1})
        .withMessage("Você não pode escolher um valor menor que R$ 1!"),
        body("link_produto")
        .isURL()
        .withMessage("Informe uma URL válida para o seu produto")
        .isLength({max: 255})
        .withMessage("O link do seu produto não pode ter mais de 255 caracteres!"),
        body("descricao_produto")
        .trim()
        .isString()
        .withMessage("Escreva uma descrição para o seu produto!")
        .isLength({min: 3})
        .withMessage("A descrição do seu produto deve ter no mínimo 3 caracteres!")
        .isLength({max: 200})
        .withMessage("A sua descrição não pode ter mais de 200 caracteres!"),
        body("estoque_produto")
        .isInt()
        .withMessage("Escolha uma opção de estoque para o seu produto!")
        .isIn(["0", "1"])
        .withMessage("Escolha uma opção válida para o estoque do seu produto!"),
        body("restricao_produto")
        .isIn(["Vegano", "Zero lactose", "Zero açúcar", "Sem glúten"])
        .withMessage("Escolha uma restrição válida para o seu produto!"),
        body("desconto_produto")
        .optional({values: "falsy"})
        .isFloat()
        .withMessage("Informe em % qual o desconto do seu produto! (Opcional)")
        .isFloat({max: 100})
        .withMessage("Você não pode escolher um disconto maior que 100%!")
        .isFloat({min: 1})
        .withMessage("Você não pode escolher um desconto menor que 1%!")
    ],
    RegrasValidacaoEditarProduto: [
        body("link_produto")
        .isURL()
        .withMessage("Informe uma URL válida para o seu produto")
        .isLength({max: 255})
        .withMessage("O link do seu produto não pode ter mais de 255 caracteres!"),
        body("descricao_produto")
        .trim()
        .isString()
        .withMessage("Escreva uma descrição para o seu produto!")
        .isLength({min: 3})
        .withMessage("A descrição do seu produto deve ter no mínimo 3 caracteres!")
        .isLength({max: 200})
        .withMessage("A sua descrição não pode ter mais de 200 caracteres!"),
        body("estoque_produto")
        .isInt()
        .withMessage("Escolha uma opção de estoque para o seu produto!")
        .isIn(["0", "1"])
        .withMessage("Escolha uma opção válida para o estoque do seu produto!"),
        body("desconto_produto")
        .optional({values: "falsy"})
        .isFloat()
        .withMessage("Informe em % qual o desconto do seu produto! (Opcional)")
        .isFloat({max: 100})
        .withMessage("Você não pode escolher um disconto maior que 100%!")
        .isFloat({min: 1})
        .withMessage("Você não pode escolher um desconto menor que 1%!")
    ]
}

module.exports = ValidacaoMiddleware;