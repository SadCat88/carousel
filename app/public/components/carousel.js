'use strict';

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
	console.log(
		'TCL: flippingCarousel -> $rootElementForTarget',
		$rootElementForTarget
	);
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
 * Принимает строку - значение предыдущего пути к картинке.
 * Вычисляет новую строку.
 * Меняет атрибут у элемента с изображением.
 * </pre>
 * @param {object} $carousel - Элемент DOM
 * @param {string} change - Действие, которое необходимо произвести
 */
const displayCarouselChanges = function($carousel, change) {
	// === переменные ==========================================================

	let qtyImg = $carousel.dataset.qtyImg;
	console.log('TCL: flippingCarousel -> qtyImg', qtyImg);
	// количество картинок в карусели на которой произошло событие

	let $carouselImg = $carousel.querySelector('.carousel__img');
	console.log('TCL: flippingCarousel -> $carouselImg', $carouselImg);
	// элемент - изображение

	// === путь к актуальной картинке в элементе на котором произошло событие
	let actualPicturePath = $carouselImg.getAttribute('src');
	console.log(
		'TCL: displayCarouselChanges -> actualPicturePath',
		actualPicturePath
	);

	// === считывание номера актуальной картинки
	let lastPoint = actualPicturePath.lastIndexOf('.');
	let lastUnderscore = actualPicturePath.lastIndexOf('_');
	let actualPictureNum = actualPicturePath.slice(lastUnderscore + 1, lastPoint);
	console.log(
		'TCL: displayCarouselChanges -> actualPictureNum',
		actualPictureNum
	);

	// === считывание относительного пути до картинки
	let relativePathFirstPart = actualPicturePath.slice(0, lastUnderscore + 1);
	let relativePathLastPart = actualPicturePath.slice(
		lastPoint,
		actualPicturePath.length
	);

	// === массив описаний к картинкам
	let $captions = $carousel.querySelectorAll('.carousel__caption .caption');
	console.log('TCL: displayCarouselChanges -> $captions', $captions);

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
			console.log(
				'TCL: крайнее уменьшение -> nextNum = qtyImg',
				(nextNum = qtyImg)
			);
		} else {
			nextNum = previousNum - 1;
			console.log('TCL: уменьшение -> nextNum -= 1', previousNum - 1);
		}
	}

	// === увеличение
	if (change == 'increase') {
		// === крайнее увеличение
		if (previousNum == qtyImg) {
			nextNum = 1;
			console.log('TCL: крайнее увеличение -> nextNum = 1', (nextNum = 1));
		} else {
			nextNum = previousNum + 1;
			console.log('TCL: увеличение -> previousNum + 1', previousNum + 1);
		}
	}
	console.log('TCL: displayCarouselChanges -> nextNum', nextNum);

	console.log(
		'TCL: displayCarouselChanges -> $captions[previousNum]',
		$captions[previousNum]
	);
	console.log(
		'TCL: displayCarouselChanges -> $captions[nextNum]',
		$captions[nextNum]
	);
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
