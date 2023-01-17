const TouristData = {
	template: /*html*/ `
		<div class="order-form__field order-form__group" v-if="copyGuest.id">
									<div class="order-form__subtitle" >{{copyGuest.type}}</div>
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.lastName"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !copyGuest.lastName && validationErrors}"														
													/>
													<input
														type="text"
														class="vp-input ml-20"
														v-model="copyGuest.firstName"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !copyGuest.firstName && validationErrors}"														
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="copyGuest.middleName"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !copyGuest.middleName && validationErrors}"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input flex-1 input1"
														placeholder="Дата рождения*"
														:inputobj="guest.id+123453234123453"
														showmodal="datepicker-lite"
														@focus="e => copyGuest.birthdayDate = e.target.value"
														:class="{'vp-input_invalid' : !copyGuest.birthdayDate && validationErrors}"
														readonly
													/>
													<Datapicker :click="onClickDatapicker"/>
													<select v-model="copyGuest.document.type" class="vp-input flex-1 input__icon_right icon_arrowdown ml-20">
														<option selected disabled hidden value="default">Тип документа*</option>
														<option class="select__item">Паспорт РФ</option>
														<option class="select__item">Свидетельство о рождении</option>
														<option class="select__item">Паспорт иностранца</option>
													</select>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="copyGuest.document.id"
														placeholder="Паспорт серия/номер*"
														name="passSN"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.document.issuedBy"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !copyGuest.document.issuedBy && validationErrors}"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input input3"
														placeholder="Дата выдачи*"
														:inputobj="guest.id+5465654656456"
														showmodal="datepicker-lite"
														@focus="e => copyGuest.document.issueDate = e.target.value"
														:class="{'vp-input_invalid' : !copyGuest.document.issueDate && validationErrors}"
														readonly
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														placeholder="Телефон*"
														name="telefon"
														v-model="copyGuest.phone"
														:class="{'vp-input_invalid' : !copyGuest.phone && validationErrors}"
													/>
													<div className="vp-input ml-20 p-0 border-none">
													<select v-model="copyGuest.privilege" class="vp-input flex-1 input__icon_right  icon_arrowdown">
														<option selected disabled hidden value="default">Право на льготу</option>
														<option class="select__item">Студент</option>
														<option class="select__item">Инвалид</option>
														<option class="select__item">Пенсионер</option>
													</select>
													</div>
													
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														placeholder="Комментарий"
														v-model="copyGuest.comment"
													/>
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender ml-20">
											<div
												class="order-form__field-gender order-form_field-active"
												@click="copyGuest.gender = 'male'"
											>
												М
											</div>
											<div class="order-form__field-gender" @click="copyGuest.gender = 'female'">Ж</div>
										</div>
									</div>
								</div>
	`,
	props: ['validationErrors', 'guest', 'index'],
	data: () => ({
		copyGuest: {},
	}),
	components: {
		Privilegespicker,
		Datapicker,
		Documentspicker,
	},
	mounted() {
		this.copyGuest = { ...this.$store.getters.getGuestById(this.guest.id)[0] }

		setTimeout(() => {
			//add masks
			$('[name=passSN]').mask('9999 999999')
			$('[name=telefon]').mask('+7 (999) 999 99 99')
			//jq
			//jq
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
		}, 0)
	},
	watch: {
		copyGuest: {
			handler() {
				this.$store.commit('changeGuest', { ...this.copyGuest })
			},
			deep: true,
		},
	},
}
