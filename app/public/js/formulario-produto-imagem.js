const imagemPerfilInput = document.getElementById("imagem-produto");
const previewImagemPerfil = document.getElementById("preview-imagem-produto");

imagemPerfilInput.addEventListener("change", (e) => {
    const image = e.target.files[0];

    if (image) {
        const imageUrl = URL.createObjectURL(image);
        previewImagemPerfil.src = imageUrl;
        previewImagemPerfil.classList.remove("adicionar-imagem")
    }
})