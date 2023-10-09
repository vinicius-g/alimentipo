$(document).ready(function () {
	$("#carroussel-promocoes").slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		prevArrow: `<button class="slick-arrow slick-prev"><img src="/imagem/seta-esquerda.png"></button>`,
		nextArrow: `<button class="slick-arrow slick-next"><img src="/imagem/seta-direita.png"></button>`,
		responsive: [
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
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		prevArrow: `<button class="slick-arrow slick-prev"><img src="/imagem/seta-esquerda.png"></button>`,
		nextArrow: `<button class="slick-arrow slick-next"><img src="/imagem/seta-direita.png"></button>`,
		responsive: [
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
