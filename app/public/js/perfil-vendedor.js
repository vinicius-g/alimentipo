const botoesEditarProduto = document.querySelectorAll("[data-editar-produto-botao]")

botoesEditarProduto.forEach(botaoEditarProduto => {
    botaoEditarProduto.addEventListener("click", (e) => {
        e.preventDefault();
        const produtoContainer = e.target.parentElement.parentElement;

        produtoContainer.classList.toggle("ativo");
    })
})