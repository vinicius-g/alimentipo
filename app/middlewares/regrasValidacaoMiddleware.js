const { body } = require("express-validator");

const validacaoMiddleware = {
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
        .withMessage("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial!")
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
        .isInt()
        .withMessage("Informe apenas os números do seu CNPJ")
        .isLength({min: 14, max: 14})
        .withMessage("Informe o seu CNPJ!"),
        body("online_fisica")
        .trim()
        .isLength({min: 6})
        .withMessage("Escolha se sua loja é online ou física!"),
        body("link_site")
        .isURL()
        .withMessage("Informe o link da sua loja!"),
        body("descricao")
        .optional({values: "falsy"})
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
        .withMessage("Informe apenas os números do seu telefone!")
    ]
}

module.exports = validacaoMiddleware;