const TouristData = {
	template: /*html*/ `
	<div class="order-form__field order-form__group" v-if="copyGuest.id">
									<div class="order-form__subtitle">{{guest.type}}</div>
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.lastName"
														placeholder="Фамилия*"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.firstName"
														placeholder="Имя*"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.middleName"
														placeholder="Отчество*"
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														placeholder="Дата рождения*"
														:class="{'vp-input_invalid' : !copyGuest.birthdayDate && validationErrors}"		
														readonly							
														v-model="copyGuest.birthdayDate"	
														@click="openBdDatepicker"				
													/>
													<Datepicker v-if="isBdDatepicker" @selectDate="selectBirthday" @close="closeBdDatepicker"/>
												</div>
												<div className="relative flex-1" 	@click="openDocumentsPicker">
													<input 
														type="text" 
														readonly 
														class="vp-input w-100 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !copyGuest.document.type && validationErrors}" 
														placeholder="Тип документа*" 
														v-model="copyGuest.document.type"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
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
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.document.issuedBy"
														placeholder="Кем выдан*"
													/>												
												</div>
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input"
														placeholder="Дата выдачи*"
														v-model="copyGuest.document.issueDate"
														@click="openIssueDate"
													/>				
													<Datepicker v-if="isIssueDate" @selectDate="selectIssueDate" @close="closeIssueDate"/>								
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.phone"
														placeholder="Телефон*"
														name="telefon"
													/>												
												</div>
												<div className="flex-1 relative" @click="openPrivilegesPicker">
													<input
														type="text"
														class="vp-input input__icon_right icon_arrowdown"
														placeholder="Право на льготы"
														v-model="copyGuest.privilege"
													/>
													<Privilegespicker v-if="isPrivilegesOpen" @selectPrivilege="selectPrivilege" @close="closePrivilegesPicker"/>													
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.comment"
														placeholder="Комментарий"
													/>												
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender">
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
		isDocumentsOpen: false,
		isPrivilegesOpen: false,
		isBdDatepicker: false,
		isIssueDate: false,
	}),
	components: {
		Privilegespicker,
		Datepicker,
		Documentspicker,
	},
	mounted() {
		this.copyGuest = { ...this.$store.getters.getGuestById(this.guest.id)[0] }

		setTimeout(() => {
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
	methods: {
		openDocumentsPicker() {
			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.copyGuest.document.type = doc
		},
		openPrivilegesPicker() {
			this.isPrivilegesOpen = true
		},
		closePrivilegesPicker() {
			this.isPrivilegesOpen = false
		},
		selectPrivilege(p) {
			this.copyGuest.privilege = p
		},
		openBdDatepicker() {
			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.copyGuest.birthdayDate = date
		},
		openIssueDate() {
			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.copyGuest.document.issueDate = date
		},
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
