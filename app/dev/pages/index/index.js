'use strict';

// === для запуска модуля ratingFiveStars ======================================
import { setRating } from '../../components/ratingFiveStars.js';
let $starGroup = document.querySelectorAll('.rating-input');
let $starImages = document.querySelectorAll('.rating-5-stars');
let $starInput = document.querySelectorAll('.ally-rating__input');
for (let i = 0; i < $starGroup.length; i++) {
	$starImages[i].addEventListener('click', setRating);
	$starImages[i].addEventListener('mousemove', setRating);
	$starImages[i].addEventListener('mouseleave', setRating);
	$starInput[i].addEventListener('input', setRating);
}

// =============================================================================
