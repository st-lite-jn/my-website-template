window.addEventListener("DOMContentLoaded",function(){
	slider();
});
// let elmBody = document.getElementById("body");
// console.log(elmBody);


// elmBody.setAttribute("style","color:red");
// bodyFix();
// function bodyFix() {
// 	let scrollPosi = elmBody.scrollTop;
// 	elmBody.setAttribute("style","position:fixed;width:100%;z-index:1;top:"+scrollPosi);
// }
// function bodyFixReset() {
// 	bodyElm.css({
// 		'position': 'relative',
// 		'width': 'auto',
// 		'top':'auto'
// 	});

// 	$("html, body").scrollTop(scrollPosi);
// }

function slider(){
	//トップカルーセル
	const carousel = new Swiper ('.p-carousel', {
		loop:true,
		centeredSlides: true,
		slidesPerView: 1,
		speed: 1000,
		autoHeight: true,
		autoplay: {
			delay: 5000,
			stopOnLastSlide: false,
			disableOnInteraction: false,
			reverseDirection: false
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});
}
