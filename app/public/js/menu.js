const usuarioBotao = document.getElementById("usuario-botao");
const menuHamburguer = document.getElementById("menu-hamburguer");
const menuCategoria = document.getElementById("menu-categoria");
const menuUsuario = document.getElementById("menu-usuario")

menuHamburguer.addEventListener("click", () => {
    menuCategoria.classList.toggle("ativo");
    menuUsuario.classList.remove("ativo");
})

usuarioBotao.addEventListener("click", () => {
    menuUsuario.classList.toggle("ativo");
    menuCategoria.classList.remove("ativo");
})