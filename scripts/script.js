$(document).ready(function () {
	function centerViewObj(obj) {
		var height_doc = $(document).scrollTop()
		var height_view = $(window).height()
		var width_view = $(window).width()
		var height_obj = obj.height()
		var width_obj = obj.width()
		var center_x = width_view / 2 - width_obj / 2
		var center_y = height_doc + height_view / 2 - height_obj / 2
		obj.css('top', center_y + 'px').css('left', center_x + 'px')
	}
	$('.calendar-slider-ship').slick({
		slidesToShow: 7,
		slidesToScroll: 3,
		prevArrow:
			'<div class="calendar-slider__arrow calendar-slider_arrow-prev"></div>',
		nextArrow:
			'<div class="calendar-slider__arrow calendar-slider_arrow-next"></div>',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		infinite: true,
		touchMove: false,
	})
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow:
			'<img src="./img/arrow_prev_slider.png" alt="btn prev" class="gallery__btn-prev">',
		nextArrow:
			'<img src="./img/arrow_next_slider.png" alt="btn next" class="gallery__btn-next">',
		fade: true,
		infinite: true,
	})

	$('.slider-nav').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: false,
		centerMode: false,
		focusOnSelect: true,
		infinite: true,
	})
	function calcBuyTickets(obj) {
		var conteiner = obj.closest('.buy-tickets-form')
		var conteinerModal = obj.closest('.edit-order__content')
		if (conteiner.length > 0) {
			var value = 0
			conteiner.find('.index-form').each(function (index, el) {
				var count = Number($(el).find('.index-form__value').text())
				var price = Number($(el).find('.index-form__price').attr('value'))
				value = value + count * price
			})
			conteiner
				.find('.buy-tickets-form__price')
				.attr('value', value)
				.text(value + ' ₽')
		}
		if (conteinerModal.length > 0) {
			var valueModal = 0
			conteinerModal.find('.index-form').each(function (index, el) {
				var count = Number($(el).find('.index-form__value').text())
				var price = Number($(el).find('.index-form__price').attr('value'))
				valueModal = valueModal + count * price
			})
			conteinerModal
				.find('.buy-tickets-form__price')
				.attr('value', valueModal)
				.text(valueModal + ' ₽')
		}
	}
	function updateTouristForm() {
		$('.tourist_block').not('.order-form_clone').remove()
		$('.order-form_clone').show()
		var clone = $('.order-form_clone')
		$('.edit-order__content')
			.find('.index-form')
			.each(function (i, element) {
				var count = Number($(element).find('.index-form__value').text())
				var label = $(element).find('.index-form_label').text()
				for (var counter = 0; counter < count; counter++) {
					var newBlock = $(clone).before(clone.clone())
					newBlock
						.removeClass('order-form_clone')
						.find('.order-form__subtitle')
						.text(label)
					newBlock.find('[inputobj]').each(function (j, el) {
						var rand = Math.floor(Math.random() * 100000)
						$(el).attr('inputobj', rand)
					})
				}
			})
		$('.order-form_clone').hide()
		setupMask()
	}
	function setupMask() {
		$('[name=passSN]').mask('9999 999999')
		$('[name=telefon]').mask('+7 (999) 999 99 99')
	}
	$('.index-form__btn-minus').click(function () {
		var target = $(this).parent().find('.index-form__value')
		var value = Number(target.text())
		var maxValue = Number($(this).parent().attr('maxValue'))
		var minValue = Number($(this).parent().attr('minValue'))
		if (value > minValue) {
			target.text(value - 1)
		}
		calcBuyTickets($(this))
	})
	$('.index-form__btn-plus').click(function () {
		var target = $(this).parent().find('.index-form__value')
		var value = Number(target.text())
		var maxValue = Number($(this).parent().attr('maxValue'))
		var minValue = Number($(this).parent().attr('minValue'))
		if (value < maxValue) {
			target.text(value + 1)
		}
		calcBuyTickets($(this))
	})
	/*
    $(".icon_date").flatpickr({
	    "locale": "ru"
	});
	*/
	$('.header__login-auth').click(function () {
		$('.modal__blocked').show()
		$('body').css('overflow', 'hidden')
		$('.modals').hide()
		$('.login').show()
	})
	$('.header__login-reg').click(function () {
		$('.modal__blocked').show()
		$('body').css('overflow', 'hidden')
		$('.modals').hide()
		$('.register').show()
	})
	$('.modal__close-link').click(function () {
		$(this).parent('.modals').hide()
		$('body').css('overflow', 'auto')
		$('.modal__blocked').hide()
	})
	$('.program-card__edit').click(function () {
		$('.edit-order').removeClass('hide').addClass('show')
		centerViewObj($('.edit-order'))
		$('.modal__blocked').show()
	})
	$('.edit-order__close').click(function () {
		$(this).closest('.modals').removeClass('show').addClass('hide')
		$('.modal__blocked').hide()
	})
	$('.modal__blocked').click(function () {
		$('.modal__close-link').click()
		$('.modals').removeClass('show').addClass('hide')
		$(this).hide()
	})
	$('.modal__forgot').click(function () {
		$('.modal__close-link').click()
		$('.modal__blocked').show()
		$('body').css('overflow', 'hidden')
		$('.modals').hide()
		$('.recovery-password').show()
	})
	$('.modal__btn').click(function () {
		var bolean = $(this).closest('.modals').hasClass('login')
		$('.modals').hide()
		var res = bolean ? $('.register').show() : $('.login').show()
	})
	$('.popup__blocked').click(function () {
		if ($('.count-list').hasClass('show')) {
			$('.popup__composition-btn').click()
		}
		$('.popup').removeClass('show').addClass('hide')
		$(this).hide()
		$('[showmodal]').removeClass('search_filter-open')
	})
	$('body').on('click', '[showmodal]', function (e) {
		$('.popup').removeClass('show').addClass('hide')
		var showTarget = $('.' + $(this).attr('showmodal'))
		var pos = $(this).offset()
		var keyObj = $(this).attr('inputobj')
		var hbody = $('body').height()
		showTarget
			.css('top', pos.top + $(this).height() + 1)
			.css('left', pos.left)
			.attr('obj', keyObj)
			.removeClass('hide')
			.addClass('show')
		$('.' + $(this).attr('showmodal')).css('width', $(this).css('width'))
		$(this).addClass('search_filter-open')
		$('.popup__blocked').height(hbody).show()
	})
	$('[showmodal=count-list]').click(function () {
		var showTarget = $('.' + $(this).attr('showmodal'))
		var data = $(this).attr('data')
		if (data != '') {
			var arrData = JSON.parse(data)
			for (var key in arrData) {
				showTarget
					.find('span:contains("' + key + '")')
					.closest('.index-form')
					.find('.index-form__value')
					.text(arrData[key])
			}
		}
		$('.popup__blocked').show()
	})
	$('body').on('click', '.select__item', function () {
		var obj = $(this).parent().attr('obj')
		$('[inputobj=' + obj + ']').val($(this).text())
		$(this).parent().removeClass('show').addClass('hide')
		$('.popup__blocked').hide()
		$('[showmodal]').removeClass('search_filter-open')
	})
	$('.popup__composition-btn').click(function () {
		var output = []
		const data = {}
		var target = $(this).closest('.popup__composition')
		var key = target.attr('obj')
		target.find('.index-form').each(function (index, element) {
			var label = $(element).find('.index-form__text').text()
			var value = $(element).find('.index-form__value').text()
			if (value != '0') {
				output.push(label + ' - ' + value)
				data[label] = value
			}
		})
		$('[inputobj=' + key + ']')
			.val(output.join(';'))
			.attr('data', JSON.stringify(data))
		target.find('.index-form__value').text('0')
		target.removeClass('show').addClass('hide')
		$('.popup__blocked').hide()
		$('[showmodal]').removeClass('search_filter-open')
	})
	$('.popup__listing input[type=checkbox]').click(function () {
		var list = []
		const data = {}
		var key = $(this).closest('.popup__listing').attr('obj')
		$(this)
			.closest('.popup__listing')
			.find('input[type=checkbox]')
			.each(function (index, element) {
				if ($(element).is(':checked')) {
					list.push($(element).parent().find('.checkbox__text').text())
					data[index] = $(element).parent().find('.checkbox__text').text()
				}
			})
		$('[inputobj=' + key + ']')
			.val(list.join('; '))
			.attr('data', JSON.stringify(data))
	})
	$('.vp-tab').click(function () {
		var idTab = $(this).attr('id-tab')
		$('.vp-tab').removeClass('vp-tab_active')
		$(this).addClass('vp-tab_active')
		$('.vp-tab-content').removeClass('vp-tab-content_active')
		$('[id-tab-content=' + idTab + ']').addClass('vp-tab-content_active')
	})
	$('.direction-table__select-ship').click(function () {
		if ($(this).hasClass('direction-table_select-ship-active')) {
			$(this)
				.closest('.direction-table__body')
				.find('tr')
				.removeClass('direction-table__tr-active')
			$(this)
				.closest('.direction-table__body')
				.find('th')
				.removeClass('green')
				.removeClass('direction-table_select-ship-active')
		} else {
			$(this)
				.closest('.direction-table__body')
				.find('tr')
				.removeClass('direction-table__tr-active')
			$(this)
				.closest('.direction-table__body')
				.find('th')
				.removeClass('green')
				.removeClass('direction-table_select-ship-active')
			$(this).closest('tr').addClass('direction-table__tr-active')
			$(this).addClass('direction-table_select-ship-active')
		}
	})
	$('.custom-select__body').click(function () {
		$('.custom-select__items').removeClass('show').addClass('hide')
		var items = $(this).parent().find('.custom-select__items')
		if (items.hasClass('hide')) {
			$(this).addClass('custom-select_body-open')
			items.removeClass('hide').addClass('show')
		} else {
			$(this).removeClass('custom-select_body-open')
			items.removeClass('show').addClass('hide')
		}
	})
	$('.custom-select__item').click(function () {
		var value = $(this).text()
		var body = $(this).closest('.custom-select').find('.custom-select__body')
		body.text(value)
		body.removeClass('custom-select_body-open')
		$(this).parent().removeClass('show').addClass('hide')
	})
	function getDaysInMonth(month, year) {
		var date = new Date(year, month, 1)
		var days = []
		while (date.getMonth() === month) {
			var newDate = new Date(date)
			var fDate = []
			var fMonth = newDate.getMonth() + 1
			if (newDate.getDate() <= 9) {
				fDate[0] = '0' + newDate.getDate()
			} else {
				fDate[0] = newDate.getDate()
			}
			if (fMonth <= 9) {
				fDate[1] = '0' + fMonth
			} else {
				fDate[1] = fMonth
			}
			fDate[2] = newDate.getFullYear()
			days.push(fDate[1] + '.' + fDate[0] + '.' + fDate[2])
			//days.push(date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear());
			date.setDate(date.getDate() + 1)
		}
		return days
	}
	function getFullMonth(month, year) {
		var dateList = getDaysInMonth(month, year)
		var firstDate = new Date(dateList[0])
		var lastDate = new Date(dateList[dateList.length - 1])
		var nDate = lastDate
		if (lastDate.getDay() != 0) {
			for (var i = 0; i <= 6 - lastDate.getDay(); i++) {
				var nextDate = new Date(nDate)
				nextDate.setDate(nextDate.getDate() + 1)
				var lDate = []
				var fMonth = nextDate.getMonth() + 1
				if (nextDate.getDate() <= 9) {
					lDate[0] = '0' + nextDate.getDate()
				} else {
					lDate[0] = nextDate.getDate()
				}
				if (fMonth <= 9) {
					lDate[1] = '0' + fMonth
				} else {
					lDate[1] = fMonth
				}
				lDate[2] = nextDate.getFullYear()
				dateList.push(lDate[1] + '.' + lDate[0] + '.' + lDate[2])
				nDate = nextDate
			}
		}
		nDate = firstDate
		if (firstDate.getDay() != 0) {
			for (var i = 1; i <= firstDate.getDay() - 1; i++) {
				var prevDate = new Date(nDate)
				prevDate.setDate(prevDate.getDate() - 1)
				var fDate = []
				var fMonth = prevDate.getMonth() + 1
				if (prevDate.getDate() <= 9) {
					fDate[0] = '0' + prevDate.getDate()
				} else {
					fDate[0] = prevDate.getDate()
				}
				if (fMonth <= 9) {
					fDate[1] = '0' + fMonth
				} else {
					fDate[1] = fMonth
				}
				fDate[2] = prevDate.getFullYear()
				dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2])
				nDate = prevDate
			}
		} else {
			for (var i = 1; i <= 6; i++) {
				var prevDate = new Date(nDate)
				prevDate.setDate(prevDate.getDate() - 1)
				var fDate = []
				var fMonth = prevDate.getMonth() + 1
				if (prevDate.getDate() <= 9) {
					fDate[0] = '0' + prevDate.getDate()
				} else {
					fDate[0] = prevDate.getDate()
				}
				if (fMonth <= 9) {
					fDate[1] = '0' + fMonth
				} else {
					fDate[1] = fMonth
				}
				fDate[2] = prevDate.getFullYear()
				dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2])
				nDate = prevDate
			}
		}
		var output = []
		dateList.forEach(function (item, i, dateList) {
			var cDate = new Date(item)
			if (cDate.getMonth() === month) {
				output.push(
					'<div class="datepicker__date" date="' +
						item +
						'">' +
						cDate.getDate() +
						'</div>'
				)
			} else {
				output.push(
					'<div class="datepicker__date datepicker_another-month" date="' +
						item +
						'">' +
						cDate.getDate() +
						'</div>'
				)
			}
		})
		return output.join('')
	}
	var currDate = new Date()
	$('.datepicker')
		.find('.datepicker__body')
		.html(getFullMonth(currDate.getMonth(), currDate.getFullYear()))

	$('.datepicker_prev-btn').click(function () {
		var months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]
		var label = $(this).parent().find('.datepicker_label')
		var month = label.attr('month')
		var year = label.attr('year')
		if (Number(month) === 0) {
			var prevYear = Number(year) - 1
			label.text(months[11] + ' ' + String(prevYear))
			label.attr('month', '11')
			label.attr('year', prevYear)
		} else {
			var prevMonth = Number(month) - 1
			label.text(months[prevMonth] + ' ' + year)
			label.attr('month', prevMonth)
			label.attr('year', year)
		}
		var days = getFullMonth(
			Number(label.attr('month')),
			Number(label.attr('year'))
		)
		$(this).closest('.datepicker').find('.datepicker__body').html(days)
	})
	$('.datepicker_next-btn').click(function () {
		var months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]
		var label = $(this).parent().find('.datepicker_label')
		var month = label.attr('month')
		var year = label.attr('year')
		if (Number(month) === 11) {
			var nextYear = Number(year) + 1
			label.text(months[0] + ' ' + nextYear)
			label.attr('month', '0')
			label.attr('year', nextYear)
		} else {
			var nextMonth = Number(month) + 1
			label.text(months[nextMonth] + ' ' + year)
			label.attr('month', nextMonth)
			label.attr('year', year)
		}
		var days = getFullMonth(
			Number(label.attr('month')),
			Number(label.attr('year'))
		)
		$(this).closest('.datepicker').find('.datepicker__body').html(days)
	})
	$('body').on('click', '.datepicker__date', function (e) {
		console.log($(this).attr('date'))
		var parent = $(this).closest('.popup')
		var date = $(this).attr('date')
		var obj = parent.attr('obj')
		dateArr = date.split('.')
		date = dateArr[1] + '.' + dateArr[0] + '.' + dateArr[2]
		if (parent.length === 1) {
			$('[inputobj=' + obj + ']').val(date)
			$('[inputobj=' + obj + ']')[0].value = date
		}
	})
	$('.btn-next-room').click(function () {
		var conteiner = $(this).closest('.buy-tickets-form')
		var date = conteiner.find('.prog-date').val()
		var totalPrice = conteiner.find('.buy-tickets-form__price').attr('value')
		var durationTour = $('.label_duration').attr('value')
		if (
			conteiner.find('.prog-date').val() != '' &&
			conteiner.find('.buy-tickets-form__price').attr('value') != '0'
		) {
			conteiner.find('.prog-date').val(date)
			var values = $('.edit-order__content').find('.index-form__value')
			conteiner.find('.index-form__value').each(function (i, element) {
				$(values[i]).text($(element).text())
			})
			$('.program-card_price-prog')
				.attr('value', totalPrice)
				.html('<b>' + totalPrice + '</b> ₽')
			$('.buy-tickets-form__price')
				.attr('value', totalPrice)
				.text(totalPrice + ' ₽')
			var arrDate = date.split('.')
			var fDate = new Date(
				Number(arrDate[2]),
				Number(arrDate[1]) - 1,
				Number(arrDate[0])
			)
			fDate.setDate(
				fDate.getDate() + Number($('.label_duration').attr('value'))
			)
			var corrMonth = fDate.getMonth() + 1
			var finishDate =
				fDate.getDate() + '.' + corrMonth + '.' + fDate.getFullYear()
			$('.program-card_date').text(date + ' - ' + finishDate)
			$('.program-card_date').attr('finishDate', finishDate)
			var guests = []
			var generalGuest = 0
			conteiner.find('.index-form').each(function (i, element) {
				var label = $(element).find('.index-form_label').text()
				var count = $(element).find('.index-form__value').text()
				guests.push(label + ' - ' + count)
				generalGuest = generalGuest + Number(count)
			})
			$('.program-card_guests').text(guests.join(' | '))
			$('.program-card_guests').attr('value', generalGuest)
			var priceProg = Number($('.program-card_price-prog').attr('value'))
			var priceRoom = Number($('.program-card_price-rooms').attr('value'))
			var totalPrice = priceProg + priceRoom
			$('.program-card_total-price')
				.html('<b>' + totalPrice + '</b> ₽')
				.attr('value', totalPrice)
			$('.program').removeClass('visibShow').addClass('visibHide')
			if (Number(generalGuest) >= 10) {
				updateTouristForm()
				$('.group-program').removeClass('visibHide').addClass('visibShow')
			} else if (Number(durationTour) == 1) {
				$('.program-card_rooms').parent().hide()
				$('.program-card_price-rooms').parent().hide()
				$('.btn-back-rooms').text('Вернуться назад к описанию программы')
				updateTouristForm()
				$('.reg-order').removeClass('visibHide').addClass('visibShow')
			} else {
				$('.btn-back-rooms').text('Вернуться назад к выбору размещения')
				$('.program-card_rooms').parent().show()
				$('.program-card_price-rooms').parent().show()
				updateTouristForm()
				$('.placement').removeClass('visibHide').addClass('visibShow')
			}
			conteiner
				.find('.buy-tickets-form__msg')
				.removeClass('show')
				.addClass('hide')
			window.scrollTo(0, 0)
		} else {
			conteiner
				.find('.buy-tickets-form__msg')
				.removeClass('hide')
				.addClass('show')
		}
	})
	$('.btn-edit-order').click(function () {
		var conteiner = $(this).closest('.edit-order__content')
		var date = conteiner.find('.prog-date').val()
		var close = conteiner.find('.edit-order__close')
		var totalPrice = conteiner.find('.buy-tickets-form__price').attr('value')
		if (
			conteiner.find('.prog-date').val() != '' &&
			conteiner.find('.buy-tickets-form__price').attr('value') != '0'
		) {
			conteiner.find('.prog-date').val(date)
			var values = $('.buy-tickets-form').find('.index-form__value')
			conteiner.find('.index-form__value').each(function (i, element) {
				$(values[i]).text($(element).text())
			})
			$('.program-card_price-prog')
				.attr('value', totalPrice)
				.html('<b>' + totalPrice + '</b> ₽')
			$('.buy-tickets-form__price')
				.attr('value', totalPrice)
				.text(totalPrice + ' ₽')
			var arrDate = date.split('.')
			var fDate = new Date(
				Number(arrDate[2]),
				Number(arrDate[1]) - 1,
				Number(arrDate[0])
			)
			fDate.setDate(
				fDate.getDate() + Number($('.label_duration').attr('value'))
			)
			var corrMonth = fDate.getMonth() + 1
			var finishDate =
				fDate.getDate() + '.' + corrMonth + '.' + fDate.getFullYear()
			$('.program-card_date').text(date + ' - ' + finishDate)
			var guests = []
			var generalGuest = 0
			conteiner.find('.index-form').each(function (i, element) {
				var label = $(element).find('.index-form_label').text()
				var count = $(element).find('.index-form__value').text()
				var guest = {
					type: label,
					count: count,
				}
				guests.push(label + ' - ' + count)
				generalGuest = generalGuest + Number(count)
			})
			$('.program-card_guests').text(guests.join(' | '))
			$('.program-card_guests').attr('value', generalGuest)
			var priceProg = Number($('.program-card_price-prog').attr('value'))
			var priceRoom = Number($('.program-card_price-rooms').attr('value'))
			var totalPrice = priceProg + priceRoom
			$('.program-card_total-price')
				.html('<b>' + totalPrice + '</b> ₽')
				.attr('value', totalPrice)
			updateTouristForm()
			close.click()
			conteiner
				.find('.buy-tickets-form__msg')
				.removeClass('show')
				.addClass('hide')
			if (Number(generalGuest) >= 10) {
				updateTouristForm()
				$('.section').removeClass('visibShow').addClass('visibHide')
				$('.group-program').removeClass('visibHide').addClass('visibShow')
				window.scrollTo(0, 0)
			}
		} else {
			conteiner
				.find('.buy-tickets-form__msg')
				.removeClass('hide')
				.addClass('show')
		}
	})
	$('.btn-back-prog').click(function () {
		$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
		$('.program').removeClass('visibHide').addClass('visibShow')
		$('.placement').removeClass('visibShow').addClass('visibHide')
		window.scrollTo(0, 0)
	})
	$('.btn-back-rooms').click(function () {
		var durationTour = $('.label_duration').attr('value')
		$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
		$('.reg-order').removeClass('visibShow').addClass('visibHide')
		if (Number(durationTour) == 1) {
			$('.program').removeClass('visibHide').addClass('visibShow')
		} else {
			$('.placement').removeClass('visibHide').addClass('visibShow')
		}
		$('.tourist_block').not('.order-form_clone').remove()
		$('.order-form_clone').show()
		window.scrollTo(0, 0)
	})
	$('.btn-next-order').click(function () {
		if (
			$('.program-card_price-prog').attr('value') != '0' &&
			$('.program-card_price-rooms').attr('value') != '0'
		) {
			$('.placement').removeClass('visibShow').addClass('visibHide')
			$('.reg-order').removeClass('visibHide').addClass('visibShow')
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
			updateTouristForm()
			window.scrollTo(0, 0)
		} else {
			$('.buy-tickets-form__msg')
				.text('Не выбрано место для проживания')
				.removeClass('hide')
				.addClass('show')
		}
	})
	$('body').on('click', '.order-form__field-gender', function () {
		if (!$(this).hasClass('order-form_field-active')) {
			$(this)
				.parent()
				.find('.order-form__field-gender')
				.removeClass('order-form_field-active')
			$(this).addClass('order-form_field-active')
		}
	})
	$('.btn-finish-order').click(function () {
		//$('.vp-input[required]').removeClass('vp-input_invalid');
		$('.vp-input[required]').each(function (i, element) {
			if ($(element).val() == '') {
				$(element).addClass('vp-input_invalid')
			} else {
				$(element).removeClass('vp-input_invalid')
			}
		})
		if ($('.vp-input_invalid').length > 0) {
			$('.buy-tickets-form__msg')
				.text('Не все обязательные поля заполнены')
				.removeClass('hide')
				.addClass('show')
			//return;
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
		}
		if ($('.categorypay__value').val() == '') {
			$('.buy-tickets-form__msg')
				.text('Категория оплаты не выбрана')
				.removeClass('hide')
				.addClass('show')
			return
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
		}
		if ($('.typepay__value').val() == '') {
			$('.buy-tickets-form__msg')
				.text('Тип оплаты не выбран')
				.removeClass('hide')
				.addClass('show')
			return
		} else {
			$('.buy-tickets-form__msg').text('').removeClass('show').addClass('hide')
		}
		var objClient = $('.order-form .order-form__field').first()
		var guestList = {}
		var infoGuestArr = {}
		var generalGuest = 0
		var infoClient = {
			lastName: objClient.find('input[name=lastname]').val(),
			firstName: objClient.find('input[name=firstname]').val(),
			patronymic: objClient.find('input[name=patronymic]').val(),
			dateBirth: objClient.find('input[name=datebirth]').val(),
			typeDoc: objClient.find('input[name=typedoc]').val(),
			passSN: objClient.find('input[name=passSN]').val(),
			passissued: objClient.find('input[name=passissued]').val(),
			passNP: objClient.find('input[name=passNP]').val(),
			passDate: objClient.find('input[name=passdate]').val(),
			passAdress: objClient.find('input[name=passadress]').val(),
			telefon: objClient.find('input[name=telefon]').val(),
			email: objClient.find('input[name=email]').val(),
			findout: objClient.find('input[name=findout]').val(),
			gender: objClient.find('.order-form_field-active').attr('value'),
			isPolomnik: $('.isPolomnik').is(':checked'),
		}
		$('.edit-order__content')
			.find('.index-form')
			.each(function (i, element) {
				var label = $(element).find('.index-form_label').text()
				var count = $(element).find('.index-form__value').text()
				var guest = {
					type: label,
					count: count,
				}
				generalGuest = generalGuest + Number(count)
				guestList[i] = guest
			})
		$('.tourist_block:not(:first-child)').each(function (i, element) {
			if ($(element).find('.order-form__subtitle').text() !== 'clone') {
				var infoTourist = {
					label: $(element).find('.order-form__subtitle').text(),
					lastName: $(element).find('input[name=lastname]').val(),
					firstName: $(element).find('input[name=firstname]').val(),
					patronymic: $(element).find('input[name=patronymic]').val(),
					dateBirth: $(element).find('input[name=datebirth]').val(),
					typeDoc: $(element).find('input[name=typedoc]').val(),
					passSN: $(element).find('input[name=passSN]').val(),
					passissued: $(element).find('input[name=passissued]').val(),
					passNP: $(element).find('input[name=passNP]').val(),
					passDate: $(element).find('input[name=passdate]').val(),
					passAdress: $(element).find('input[name=passadress]').val(),
					telefon: $(element).find('input[name=telefon]').val(),
					benefits: $(element).find('input[name=benefits]').val(),
					comment: $(element).find('input[name=comment]').val(),
					gender: $(element).find('.order-form_field-active').attr('value'),
				}
				infoGuestArr[i] = infoTourist
			}
		})
		var order = {
			startDate: $('.prog-date').val(),
			finishDate: $('.program-card_date').attr('finishDate'),
			idTour: $('.program-card_name').attr('value'),
			durationTour: $('.duration').attr('value'),
			guestCount: generalGuest,
			idRooms: $('.program-card_rooms').attr('value'),
			guests: guestList,
			infoClient: infoClient,
			infoGuest: infoGuestArr,
			priceProgram: $('.program-card_price-prog').attr('value'),
			priceRooms: $('.program-card_price-rooms').attr('value'),
			priceTotal: $('.program-card_total-price').attr('value'),
			categoryPay: $('.categorypay__value').val(),
			typePay: $('.typepay__value').val(),
		}
		console.log(JSON.stringify(order))
	})
	$('.btn-group-program').click(function () {
		var order = {
			startDate: $('.prog-date').val(),
			finishDate: $('.program-card_date').attr('finishDate'),
			idTour: $('.program-card_name').attr('value'),
			durationTour: $('.duration').attr('value'),
			guestCount: $('.program-card_guests').attr('value'),
			firstName: $('[name=gp_firstname]').val(),
			telefon: $('[name=gp_phone]').val(),
			email: $('[name=gp_email]').val(),
			time: $('[name=gp_timecall]').val(),
		}
		console.log(JSON.stringify(order))
	})
	$('[name=categorypay]').click(function () {
		$('.categorypay__value').val($(this).attr('label'))
	})
	$('[name=typepay]').click(function () {
		$('.typepay__value').val($(this).attr('label'))
	})
	$('.find-list__footer-link').click(function () {
		var conteiner = $(this).closest('.find-list')
		if ($(this).parent().hasClass('bg-orange')) {
			$('.list[data=' + conteiner.attr('data') + ']')
				.removeClass('visibShow')
				.addClass('visibHide')
			$(this).text('Показать').parent().removeClass('bg-orange')
		} else {
			$('.find-list__footer-price').removeClass('bg-orange')
			$('.find-list__footer-link').text('Показать')
			$(this).text('Скрыть').parent().addClass('bg-orange')
			$('.list[data]').removeClass('visibShow').addClass('visibHide')
			$('.list[data=' + conteiner.attr('data') + ']')
				.removeClass('visibHide')
				.addClass('visibShow')
		}
	})
	/*
	$('.post-list__img').hover(function() {
		$(this).closest('.post-list').find('.post-list__desc').animate({top: 300, opacity: 1}, 1000);
	});
*/
	setupMask()
})
