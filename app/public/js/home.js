$(document).ready(function () {
	$("#carroussel-promocoes").slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		prevArrow: `<button class="slick-arrow slick-prev"><img src="/imagem/seta-esquerda.png"></button>`,
		nextArrow: `<button class="slick-arrow slick-next"><img src="/imagem/seta-direita.png"></button>`,
		responsive: [
            {
				breakpoint: 772,
				settings: {
					slidesToShow: 3
				},
			},
            {
				breakpoint: 567,
				settings: {
					slidesToShow: 2
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1
				},
			},
		],
	});

    $("#carroussel-produtos-destacados").slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		prevArrow: `<button class="slick-arrow slick-prev"><img src="/imagem/seta-esquerda.png"></button>`,
		nextArrow: `<button class="slick-arrow slick-next"><img src="/imagem/seta-direita.png"></button>`,
		responsive: [
			{
				breakpoint: 772,
				settings: {
					slidesToShow: 3
				},
			},
            {
				breakpoint: 567,
				settings: {
					slidesToShow: 2
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1
				},
			},
		],
	});

    $("#carroussel-novidades").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
        dots: true
	});
});

const testes = document.querySelectorAll(".favoritar")

testes.forEach(teste => {
    teste.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("cliquei botao")
    })
})