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