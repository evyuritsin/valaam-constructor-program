const Order = {
	template: /*html*/ `
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__content">
							<div class="order-form">
								<div class="order-form__title">Данные заказчика</div>
								<div class="order-form__field">
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
													<input
														type="text"
														class="vp-input"
														v-model="client.lastName"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !client.lastName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="client.firstName"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !client.firstName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.middleName"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !client.middleName && validationErrors}"														
													/>
											</div>
											<div class="order-form__field-contact mt-20">
													<input
														type="text"
														class="vp-input flex-1 flatpickr-input"
														placeholder="Дата рождения*"
  													@focus="client.birthdayDate = $event.target.value"
														ref="client-input1"
														inputobj="515151515151"
														showmodal="datepicker-lite"
														:class="{'vp-input_invalid' : !client.birthdayDate && validationErrors}"		
														readonly												
													/>
													<Datapicker :click="onClickDatapicker"/>
													<input 
														type="text" 
														readonly 
														class="vp-input flex-1 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !client.document.type && validationErrors}" 
														placeholder="Тип документа*" 
														showmodal="docs-list" 
														inputobj="12345432134"
													/>
													<Documentspicker />
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.document.id"
														placeholder="Паспорт серия/номер*"
														name="passSN"
														:class="{'vp-input_invalid' : !client.document.id && validationErrors}"															
													/>
											</div>
											<div class="order-form__field-contact mt-20">
													<input
														type="text"
														class="vp-input"
														v-model="client.document.issuedBy"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !client.document.issuedBy && validationErrors}"	
													/>
													<input
														type="text"
														class="vp-input input-datedocp"
														placeholder="Дата выдачи*"
														@focus="e => client.document.issueDate = e.target.value"
														ref="client-input2"														
														inputobj="31313131313"
														showmodal="datepicker-lite"
														:class="{'vp-input_invalid' : !client.document.issueDate && validationErrors}"						
														readonly									
													/>
											</div>
											<div class="order-form__field-contact mt-20">
													<input
														type="text"
														class="vp-input"
														placeholder="Телефон*"
														name="telefon"
														v-model="client.phone"
														:class="{'vp-input_invalid' : !client.phone && validationErrors}"														
													/>
													<input
														type="text"
														class="vp-input"
														v-model="client.email"
														placeholder="E-mail*"
														:class="{'vp-input_invalid' : !client.email && validationErrors}"														
													/>
													<input v-model="client.add" class="vp-input flex-1 input__icon_right icon_arrowdown" :class="{'placeholder-color' : client.add === 'default'}" list="add" placeholder="Откуда узнали о нас" showmodal="findout-list" inputobj="123454334345345" readonly/>
													<Addpicker />
											</div>
										</div>
										<div class="order-form__fields-gender">
											<div
												class="order-form__field-gender order-form_field-active"
												@click='client.gender = "male"'
											>М</div>
											<div class="order-form__field-gender" @click='client.gender = "female"'>Ж</div>
										</div>
									</div>
								</div>
								<div class="checkbox__label mt-10">
									<input type="checkbox" class="checkbox" v-model="client.isPilgrim" />
									<span class="checkbox__text"
										>Заказчик является Паломником</span
									>
								</div>
								<div class="order-form__title">Данные туристов</div>
									<TouristData v-for="(guest, index) in copyGuests" :key="guest.id" :guest="guest" :validationErrors="validationErrors" :index="index"/>
								<TotalResult />
								<div class="order-form__title">Способ оплаты</div>
								<div class="order-form__field pos-h">
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Категория оплаты</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Стандартная</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Пожертвование</span>
										</div>
										<div class="order-form__help mt-20">
											<a href="#" class="order-form__help-link">Справка</a>
										</div>
									</div>
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Тип платежа</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">Картой он-лайн</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">По счету</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">Наличными в офисе</span>
										</div>
									</div>
								</div>
								<div class="order-form__field pos-h align-items-center">
									<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
									<div class="order-form__pay-group">
											<div class="order-form__footer">
												<div class="order-form__agreement">
													<div class="checkbox__label">
														<input type="checkbox" class="checkbox" checked />
														<span class="checkbox__text"
															>Я согласен с условиями передачи информации</span
														>
													</div>
													<div class="checkbox__label">
														<input type="checkbox" class="checkbox" />
														<span class="checkbox__text"
															>Подписаться на рассылку новостей</span
														>
													</div>
												</div>
												<button class="vp-btn flex-1" @click="clickToOrder">Оплатить</button>
											</div>
									</div>
								</div>
							</div>
						</div>`,
	data: () => ({
		copyGuests: [],
		client: {
			firstName: '',
			lastName: '',
			middleName: '',
			gender: 'male',
			birthdayDate: '',
			document: {
				type: 'default',
				id: '',
				issuedBy: '',
				issueDate: '',
			},
			phone: '',
			email: '',
			add: '',
			isPilgrim: false,
		},
		validationErrors: false,
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
		originalClient() {
			return this.$store.getters['getClient']
		},
		requestData() {
			return this.$store.getters['getRequestData']
		},
	},
	methods: {
		onClickDatapicker(e) {
			setTimeout(() => {
				this.$refs['client-input1'].focus()
				this.$refs['client-input2'].focus()
				$('.popup__blocked').click()
			}, 0)
		},
		clickToOrder() {
			if (
				!this.originalClient.firstName ||
				!this.originalClient.lastName ||
				!this.originalClient.middleName ||
				!this.originalClient.birthdayDate ||
				!this.originalClient.document.type ||
				!this.originalClient.document.id ||
				!this.originalClient.document.issuedBy ||
				!this.originalClient.document.issueDate ||
				!this.originalClient.phone ||
				!this.originalClient.email
			) {
				return (this.validationErrors = true)
			}
			this.guests.forEach(guest => {
				Object.keys(guest).forEach(key => {
					if (key === 'comment' || key === 'privilege') return
					if (!guest[key]) return (this.validationErrors = true)
				})
			})
			console.log(JSON.stringify(this.requestData))
		},
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
	},
	mounted() {
		//add masks
		$('[name=passSN]').mask('9999 999999')
		$('[name=telefon]').mask('+7 (999) 999 99 99')
		//coping guests
		this.copyGuests = [...this.$store.getters['getGuests']]
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
	},
	watch: {
		client: {
			handler() {
				this.$store.commit('setClient', { ...this.client })
			},
			deep: true,
		},
	},
	components: {
		AmountResult,
		TouristData,
		TotalResult,
		Datapicker,
		Documentspicker,
		Privilegespicker,
		Addpicker,
	},
}
