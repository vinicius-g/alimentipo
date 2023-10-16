const favoritarBotoesProduto = document.querySelectorAll(".favoritar")

favoritarBotoesProduto.forEach(favoritarBotaoProduto => {
    favoritarBotaoProduto.addEventListener("click", (e) => {
        e.preventDefault();
        const produtoSelecionado = e.target.getAttribute("data-produto");

        fetch(`/favoritar-produto/${produtoSelecionado}`, {
            method: "POST",
            headers: new Headers(),
            mode: "cors",
        }).then(async function (response) {
            const responseJson = await response.json();

            if (responseJson.status === "login") {
                window.location.href = "/login"
            }

            if (responseJson.status === "favoritado") {
                e.target.classList.add("favoritado");
            }

            if (responseJson.status === "desfavoritado") {
                e.target.classList.remove("favoritado");
            }
        }).catch(async function (error) {
            console.log(error)
        })
    })
})