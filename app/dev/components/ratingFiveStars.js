// to use module:
// copy-paste this in index.js ↓
// =============================================================================
//
// import { setRating } from '../../components/ratingFiveStars.js';
// let $starGroup = document.querySelectorAll('.rating-input');
// let $starImages = document.querySelectorAll('.rating-5-stars');
// let $starInput = document.querySelectorAll('.ally-rating__input');
// for (let i = 0; i < $starGroup.length; i++) {
// 	 $starImages[i].addEventListener('click', setRating);
// 	 $starImages[i].addEventListener('mousemove', setRating);
// 	 $starImages[i].addEventListener('mouseleave', setRating);
// 	 $starInput[i].addEventListener('input', setRating);
// }
//
// =============================================================================

'use strict';

export /**
 * Определяет тип переданного события
 *
 * @deprecated <pre>
 * В зависимости от события определяет каким образом был введен рейтинг.
 * После чего считывает пользовательский ввод
 * и запускает вывод на экран.
 * </pre>
 * @param {object} event
 */
const setRating = function(event) {
	let $target = event.target;
	// источник события
	let $rootIdForStar =
		event.target.parentNode.parentNode.parentNode.dataset.ratingId;
	// data-rating-id корневого элемента относительно звезды
	let $rootIdForInput = event.target.parentNode.parentNode.dataset.ratingId;
	// data-rating-id корневого элемента относительно поля ввода

	// let $allyInput = $rootId.querySelector('.ally-rating__input');
	// поле ввода рейтинга с клавиатуры

	// === если событие - клик
	if (event.type == 'click') {
		// === если клик по звездам
		if ($target.classList.contains('star') == true) {
			let $onClickNumberStar = event.target.dataset.numStar;
			// по какой звезде был клик

			displayStar($onClickNumberStar, $rootIdForStar);
		}
	}

	// === если событие - ввод с клавиатуры
	if (event.type == 'input') {
		let $inputRating = event.target.value;
		// какой рейтинг введен с клавиатуры

		displayStar($inputRating, $rootIdForInput);
	}

	// === если событие - наведение мышью
	if (event.type == 'mousemove') {
		// === если наведение на звезду звездам
		if ($target.classList.contains('star') == true) {
			let $onHoverNumberStar = event.target.dataset.numStar;
			// на какую звезду наведение

			displayStar($onHoverNumberStar, $rootIdForStar, 'hover');
		}
	}

	// === если событие - покидание мышью границ блока
	if (event.type == 'mouseleave') {
		displayStar(0, 0, 'leave');
	}
};

let $rootForLeave;
/**
 * Выводит на экран рейтинг
 *
 * @deprecated <pre>
 * Принимает числовое значение рейтинга.
 * На основе чего закрашивает количество звезд равное рейтингу.
 * Затем очищает остальные звезды (на случай изменения рейтинга пользователем).
 * Также при наведении на звезду подкрашивает предыдущие звезды.
 * При покидании мышью блока убирает подкрашивание.
 * </pre>
 * @param {number} rating - рейтинг от 1 до 5
 * @param {number} id - id родительского блока
 * @param {string} hover - наведение мышью / покидание
 */
const displayStar = (rating, id, hover) => {
	// === перебор всех звезд
	for (let i = 1; i <= 5; i++) {
		let $root = document.querySelector(`.rating-input[data-rating-id="${id}"]`);

		// === если событием является кликом мыши или вводом с клавиатуры ======
		if (hover == undefined) {
			let $input = $root.querySelector('.ally-rating__input');
			$input.value = rating;
			// записать в input значение равное номеру звезды

			let $star = $root.querySelector(`.star[data-num-star="${i}"]`);

			if (i <= rating) {
				// установка класса .star_fill на звезды до клика включительно
				$star.classList.add('star_fill');
			} else {
				// удаление класса .star_fill со всех звезд после клика
				$star.classList.remove('star_fill');
			}
		}

		// === если событием является наведением мыши ==========================
		if (hover == 'hover') {
			let $star = $root.querySelector(`.star[data-num-star="${i}"]`);
			$rootForLeave = $root;
			if (i < rating) {
				// установка класса .star_hover на звезды до клика
				$star.classList.add('star_hover');
			} else {
				$star.classList.remove('star_hover');
			}
		}

		// === если событием является покидание мышью родительского блока ======
		if (hover == 'leave') {
			// удаление класса .star_hover со всех звезд
			let $starForLeave = $rootForLeave.querySelector(
				`.star[data-num-star="${i}"]`
			);
			$starForLeave.classList.remove('star_hover');
		}
	}
};
