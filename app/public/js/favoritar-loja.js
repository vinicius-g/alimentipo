const favoritarBotoesLoja = document.querySelectorAll(".favoritar-loja")

favoritarBotoesLoja.forEach(favoritarBotaoLoja => {
    favoritarBotaoLoja.addEventListener("click", (e) => {
        e.preventDefault();
        const lojaSelecionada = e.target.getAttribute("data-loja");

        fetch(`/favoritar-loja/${lojaSelecionada}`, {
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