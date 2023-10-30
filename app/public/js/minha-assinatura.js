const botaoPagamentoCartao = document.getElementById("botao-pagamento-cartao");
const botaoPagamentoPix = document.getElementById("botao-pagamento-pix");

const pagamentoPixContainer = document.getElementById("pix");
const pagamentoCartaoContainer = document.getElementById("cartao");

botaoPagamentoCartao.addEventListener("click", () => {
    botaoPagamentoCartao.classList.add("ativo");
    botaoPagamentoPix.classList.remove("ativo");

    pagamentoCartaoContainer.classList.add("ativo");
    pagamentoPixContainer.classList.remove("ativo");
});

botaoPagamentoPix.addEventListener("click", () => {
    botaoPagamentoPix.classList.add("ativo");
    botaoPagamentoCartao.classList.remove("ativo");

    pagamentoPixContainer.classList.add("ativo");
    pagamentoCartaoContainer.classList.remove("ativo");
});

const botaoCopiarPix = document.getElementById("copiar-pix");
const pixCopiaCola = document.getElementById("copia-cola-pix");

botaoCopiarPix.addEventListener("click", () => {
    navigator.clipboard.writeText(pixCopiaCola.innerText);
})

const assinarBotoes = document.querySelectorAll("[data-escolher-plano-assinatura]");

assinarBotoes.forEach(assinarBotao => {
    assinarBotao.addEventListener("click", (e) => {
        assinarBotoes.forEach(assinarBotao => {
            assinarBotao.classList.remove("ativo");
        });

        e.target.classList.add("ativo");
    })
})