'use strict';

// === для запуска модуля carousel =============================================
import { flippingCarousel } from '../../components/carousel.js';
let $carousel = document.querySelectorAll('.carousel');

for (let i = 0; i < $carousel.length; i++) {
	$carousel[i].addEventListener('click', flippingCarousel);
}
// =============================================================================
