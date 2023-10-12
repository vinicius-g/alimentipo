$(document).ready(function () {
	$(".carroussel-produtos-loja").slick({
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
				breakpoint: 600,
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
});