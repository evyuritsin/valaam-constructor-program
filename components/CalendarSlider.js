const CalendarSlider = {
	template: /*html*/ `
									<div class="calendar-slider calendar-slider-ship" ref='calendar'>
										<div class="calendar-slider__item" v-for="item in calendarItems" :key="item.id" @click="setSelectDay(item.id)">
											<div class="calendar-slider__dates" :class="[selectedDay == item.id && 'calendar-slider_dates-selected']">
												<span class="calendar-slider__date">{{item.date}} {{months[month]}}</span>
												<span class="calendar-slider__weekday"
													>{{item.weekday}}</span
												>
												<span class="calendar-slider__price">{{item.price}}</span>
											</div>
											<svg v-if="selectedDay == item.id" class="calendar-slider__arrow-selected" width="30" height="10" viewBox="0 0 30 10" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path class="calendar-slider_arrow-selected-active" d="M0 0H30L15 10L0 0Z" fill="#FF8A00"></path>
												</svg>
										</div>
									</div>
	`,
	data: () => ({
		months: {
			'01': 'января',
			'02': 'февраля',
			'03': 'марта',
			'04': 'апреля',
			'05': 'мая',
			'06': 'июня',
			'07': 'июля',
			'08': 'августа',
			'09': 'сентября',
			10: 'октября',
			11: 'ноября',
			12: 'декабря',
		},
		calendarItems: [
			{ id: 01, date: '1', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 02, date: '2', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 03, date: '3', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 04, date: '4', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 05, date: '5', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 06, date: '6', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 07, date: '7', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 08, date: '8', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{ id: 09, date: '9', weekday: 'воскресенье', price: 'от 2 000 ₽' },
			{
				id: 10,
				date: '10',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 11,
				date: '11',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 12,
				date: '12',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 13,
				date: '13',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 14,
				date: '14',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 15,
				date: '15',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 16,
				date: '16',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 17,
				date: '17',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 18,
				date: '18',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 19,
				date: '19',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 20,
				date: '20',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 21,
				date: '21',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 22,
				date: '22',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 23,
				date: '23',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 24,
				date: '24',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 25,
				date: '25',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 26,
				date: '26',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 27,
				date: '27',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 28,
				date: '28',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 29,
				date: '29',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 30,
				date: '30',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
			{
				id: 31,
				date: '31',
				weekday: 'воскресенье',
				price: 'от 2 000 ₽',
			},
		],
		selectedDay: 6,
	}),
	props: ['direction'],
	methods: {
		setSelectDay(id) {
			this.selectedDay = id
		},
	},
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		month() {
			return this.$store.getters['getMainInfo'].arrivalDate.split('.')[1]
		},
		arrivalDate() {
			return this.$store.getters['getMainInfo'].arrivalDate
		},
		departureDate() {
			return this.$store.getters['getMainInfo'].departureDate
		},
	},
	watch: {
		arrivalDate: {
			handler() {
				if (this.direction === 'ТУДА' || !this.mainInfo.multiDay) {
					this.selectedDay = this.arrivalDate.split('.')[0]
				}
			},
		},
		departureDate: {
			handler() {
				if (this.direction === 'ОБРАТНО') {
					this.selectedDay = this.departureDate.split('.')[0]
				}
			},
		},
	},
}
