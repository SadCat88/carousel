'use strict';

// === для запуска модуля ratingFiveStars ======================================
import { flippingCarousel } from '../../components/carousel.js';
let $carousel = document.querySelectorAll('.carousel');
console.log("TCL: $carousel", $carousel)

for (let i = 0; i < $carousel.length; i++) {
	$carousel[i].addEventListener('click', flippingCarousel);
}

// =============================================================================
