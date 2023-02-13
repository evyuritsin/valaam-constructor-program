const Datepicker = {
	template: /*html*/ `
			<div
			class="popup popup__datepicker datepicker datepicker-lite w-100"
			>
			<div class="datepicker__header bg-while" @click.stop>
				<div class="datepicker_prev-btn datepicker-lite__prev-btn"></div>
				<div
					class="datepicker_label datepicker-lite__header-label"
					month="11"
					year="2022"
					ref="datepicker"
				>
					Декабрь 2022
				</div>
				<div class="datepicker_next-btn datepicker-lite__next-btn"></div>
			</div>
			<div class="datepicker__body border-none">
				<div 
					v-for='date in dates' 
					:key='date.id' 
					class="datepicker-date" 
					:class="[date.anotherMonth && 'datepicker_another-month']"
					@click="clickToDate(date.value)"
				>
					{{date.value}}
				</div>
			</div>
		</div>
		<div
			class="popup popup__datepicker datepicker datepicker-prog p-15 hide"
			popupobject=""
			obj=""
			@click.stop
		>
			<div class="datepicker__header br-20">
				<div class="datepicker_prev-btn datepicker__prev-btn"></div>
				<div
					class="datepicker_label datepicker__header-label"
					month="11"
					year="2022"
				>
					Декабрь 2022
				</div>
				<div class="datepicker_next-btn datepicker__next-btn" ></div>
			</div>
			<div class="datepicker__body border-none p-0">
				<div 
					v-for='date in dates' 
					:key='date.id' 
					class="datepicker-date" 
					:class="[date.anotherMonth && 'datepicker_another-month']"
					@click="clickToDate(date.value)"
				>
					{{date.value}}
				</div>
			</div>
			<div class="datepicker__footer p-0">
				<div class="datepicker__status">
					<div class="datepicker__point bg-green"></div>
					<span class="datepicker__point-label">Много</span>
				</div>
				<div class="datepicker__status">
					<div class="datepicker__point bg-orange"></div>
					<span class="datepicker__point-label">Мало</span>
				</div>
				<div class="datepicker__status">
					<div class="datepicker__point bg-red"></div>
					<span class="datepicker__point-label">Закончились</span>
				</div>
			</div>
		</div>
	`,
	mounted() {
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
						'<div class="datepicker-date" date=""' +
							item +
							'" @click="clickToDate(date.value)">' +
							cDate.getDate() +
							'</div>'
					)
				} else {
					output.push(
						'<div class="datepicker-date datepicker_another-month" @click="clickToDate(date.value)" date=""' +
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

		$('.datepicker-date').click(e => this.clickToDate(e))
		let vm = this

		$('.datepicker_prev-btn').click(function () {
			vm.changeMonth++
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
			vm.changeMonth++
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
	data: () => ({
		dates: [
			{ id: 1, value: 26, anotherMonth: true },
			{ id: 2, value: 27, anotherMonth: true },
			{ id: 3, value: 28, anotherMonth: true },
			{ id: 4, value: 29, anotherMonth: true },
			{ id: 5, value: 30, anotherMonth: true },
			{ id: 6, value: 1, anotherMonth: false },
			{ id: 7, value: 2, anotherMonth: false },
			{ id: 8, value: 3, anotherMonth: false },
			{ id: 9, value: 4, anotherMonth: false },
			{ id: 10, value: 5, anotherMonth: false },
			{ id: 11, value: 6, anotherMonth: false },
			{ id: 12, value: 7, anotherMonth: false },
			{ id: 13, value: 8, anotherMonth: false },
			{ id: 14, value: 9, anotherMonth: false },
			{ id: 15, value: 10, anotherMonth: false },
			{ id: 16, value: 11, anotherMonth: false },
			{ id: 17, value: 12, anotherMonth: false },
			{ id: 18, value: 13, anotherMonth: false },
			{ id: 19, value: 14, anotherMonth: false },
			{ id: 20, value: 15, anotherMonth: false },
			{ id: 21, value: 16, anotherMonth: false },
			{ id: 22, value: 17, anotherMonth: false },
			{ id: 23, value: 18, anotherMonth: false },
			{ id: 24, value: 19, anotherMonth: false },
			{ id: 25, value: 20, anotherMonth: false },
			{ id: 26, value: 21, anotherMonth: false },
			{ id: 27, value: 22, anotherMonth: false },
			{ id: 28, value: 23, anotherMonth: false },
			{ id: 29, value: 24, anotherMonth: false },
			{ id: 30, value: 25, anotherMonth: false },
			{ id: 31, value: 26, anotherMonth: false },
			{ id: 32, value: 27, anotherMonth: false },
			{ id: 33, value: 28, anotherMonth: false },
			{ id: 34, value: 29, anotherMonth: false },
			{ id: 35, value: 30, anotherMonth: false },
			{ id: 36, value: 31, anotherMonth: false },
			{ id: 37, value: 1, anotherMonth: true },
			{ id: 38, value: 2, anotherMonth: true },
			{ id: 39, value: 3, anotherMonth: true },
			{ id: 40, value: 4, anotherMonth: true },
			{ id: 41, value: 5, anotherMonth: true },
			{ id: 42, value: 6, anotherMonth: true },
		],
		changeMonth: 0,
	}),
	methods: {
		clickToDate(e) {
			const date = new Date(
				e.target.attributes[2].name.slice(0, -1)
			).toLocaleDateString()

			this.$emit('selectDate', date)
			this.$emit('close')
		},
	},
	watch: {
		changeMonth: {
			handler() {
				let vm = this

				$('.datepicker-date').click(function (e) {
					vm.clickToDate(e)
				})
			},
		},
	},
}
