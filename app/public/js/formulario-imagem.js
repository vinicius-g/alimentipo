const imagemPerfilInput = document.getElementById("imagem_perfil");
const previewImagemPerfil = document.getElementById("preview-imagem-perfil");

imagemPerfilInput.addEventListener("change", (e) => {
    const image = e.target.files[0];

    if (image) {
        const imageUrl = URL.createObjectURL(image);
        previewImagemPerfil.src = imageUrl;
        previewImagemPerfil.classList.remove("adicionar-imagem")
    }
})