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

	let qtyImg = $rootElementForTarget.dataset.qtyImg;
	console.log('TCL: flippingCarousel -> qtyImg', qtyImg);
	// количество картинок в карусели на которой произошло событие

	let $carouselImg = $rootElementForTarget.querySelector('.carousel__img');
	console.log('TCL: flippingCarousel -> $carouselImg', $carouselImg);
	// элемент - изображение

	if (event.target == $leftArrow) {
		displayCarouselChanges($carouselImg, qtyImg, 'decrease');
	}
	if (event.target == $rightArrow) {
		displayCarouselChanges($carouselImg, qtyImg, 'increase');
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
 * @param {object} $carouselImg - Элемент DOM
 */
const displayCarouselChanges = function($carouselImg, qtyImg, change) {
	// === переменные ==========================================================

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

	// === установить новую картинку
	$carouselImg.setAttribute(
		'src',
		`${relativePathFirstPart}${nextNum}${relativePathLastPart}`
	);
};
