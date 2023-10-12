const limparImagemPerfil = document.getElementById("limpar-imagem-perfil");

limparImagemPerfil.addEventListener("click", () => {
    imagemPerfilInput.value = "";
    previewImagemPerfil.src = "/imagem/add-imagem.png";
    previewImagemPerfil.classList.add("adicionar-imagem");
})