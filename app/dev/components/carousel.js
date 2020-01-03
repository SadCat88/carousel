// to use module:
// copy-paste this in index.js ↓
// =============================================================================
//
// import { flippingCarousel } from '../../components/carousel.js';
// let $carousel = document.querySelectorAll('.carousel');
// 
// for (let i = 0; i < $carousel.length; i++) {
// 	$carousel[i].addEventListener('click', flippingCarousel);
// }
//
// =============================================================================

('use strict');

export /**
 * Проверяет какое именно событие произошло.
 *
 * @deprecated <pre>
 * Ловит событие. Проверяет на какой карусели и какое именно произошло событие.
 * После чего запускает функцию отображения изменений на экране.
 * </pre>
 * @param {object} event
 */
const flippingCarousel = function(event) {
	let $rootElementForTarget = event.target.parentNode;
	// корневой элемент

	let $leftArrow = $rootElementForTarget.querySelector('.carousel__arrow_left');
	let $rightArrow = $rootElementForTarget.querySelector(
		'.carousel__arrow_right'
	);

	if (event.target == $leftArrow) {
		displayCarouselChanges($rootElementForTarget, 'decrease');
	}
	if (event.target == $rightArrow) {
		displayCarouselChanges($rootElementForTarget, 'increase');
	}
};

/**
 * Отображает изменения в активной карусели.
 *
 * @deprecated <pre>
 * Принимает DOM элемент.
 * Вычисляет активное состояние карусели.
 * Вычисляет новое состояние и выводит его.
 * </pre>
 * @param {object} $carousel - Элемент DOM
 * @param {string} change - Действие, которое необходимо произвести
 */
const displayCarouselChanges = function($carousel, change) {
	// === переменные ==========================================================

	let qtyImg = $carousel.dataset.qtyImg;
	// количество картинок в карусели на которой произошло событие

	let $carouselImg = $carousel.querySelector('.carousel__img');
	// элемент - изображение

	// === путь к актуальной картинке в элементе на котором произошло событие
	let actualPicturePath = $carouselImg.getAttribute('src');

	// === считывание номера актуальной картинки
	let lastPoint = actualPicturePath.lastIndexOf('.');
	let lastUnderscore = actualPicturePath.lastIndexOf('_');
	let actualPictureNum = actualPicturePath.slice(lastUnderscore + 1, lastPoint);

	// === считывание относительного пути до картинки
	let relativePathFirstPart = actualPicturePath.slice(0, lastUnderscore + 1);
	let relativePathLastPart = actualPicturePath.slice(
		lastPoint,
		actualPicturePath.length
	);

	// === массив описаний к картинкам
	let $captions = $carousel.querySelectorAll('.carousel__caption .caption');

	// === массив индикаторов
	let $bullets = $carousel.querySelectorAll('.carousel__bullets .bullet');

	// === действия ============================================================
	let previousNum = parseInt(actualPictureNum, 10);
	let nextNum;

	// === уменьшение
	if (change == 'decrease') {
		// === крайнее уменьшение
		if (previousNum == 1) {
			nextNum = qtyImg;
		} else {
			nextNum = previousNum - 1;
		}
	}

	// === увеличение
	if (change == 'increase') {
		// === крайнее увеличение
		if (previousNum == qtyImg) {
			nextNum = 1;
		} else {
			nextNum = previousNum + 1;
		}
	}

	// === установить новую картинку
	$carouselImg.setAttribute(
		'src',
		`${relativePathFirstPart}${nextNum}${relativePathLastPart}`
	);

	// === установить верное описание
	$captions[previousNum - 1].classList.add('caption_hidden');
	$captions[nextNum - 1].classList.remove('caption_hidden');

	// === установить индикатор в нужное положение
	$bullets[previousNum - 1].classList.remove('bullet_full');
	$bullets[nextNum - 1].classList.add('bullet_full');
};
