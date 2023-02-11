const TotalResult = {
	template: /*html*/ `
								<div class="order-form__total">
									<div class="order-form__caption">ИТОГО:</div>
									<div class="order-form__items">
										<div class="order-form__item" v-if="mainInfo.multiDay">
											<span class="order-form__text"><b>Проживание</b></span>
											<span class="order-form__price"><b>{{accommodationsPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Теплоход</b></span>
											<span class="order-form__price"><b>{{shipsPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Питание</b></span>
											<span class="order-form__price"><b>{{feedPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Экскурсии</b></span>
											<span class="order-form__price"><b>{{excursionsPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"
												><b>Дополнительные услуги</b></span
											>
											<span class="order-form__price"><b>{{servicesPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Льготы</b></span>
											<span class="order-form__price"><b>0</b> ₽</span>
										</div>
									</div>
									<div class="order-form__result">
										<span class="order-form__result-title">К ОПЛАТЕ</span>
										<span class="order-form__total-price"><b>{{totalPrice}}</b> ₽</span>
									</div>
								</div>
	`,
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		hotelRooms() {
			return this.$store.getters['getHotelRooms']
		},
		accommodationsPrice() {
			return this.$store.getters['getAccommodationsPrice']
		},
		ships() {
			return this.$store.getters['getShips']
		},
		shipsPrice() {
			return (
				(this.ships.there.departureAndArrivalTime &&
					this.ships.back.departureAndArrivalTime &&
					this.ships.there.departureAndArrivalTime.price +
						this.ships.back.departureAndArrivalTime.price) * this.guests.length
			)
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		feedPrice() {
			let result = 0
			this.guests.forEach(guest => {
				result += guest.feed.graph.amount
			})
			return result ? Math.floor(result) : 0
		},
		breakfastAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Завтрак')) result++
			})
			return result
		},
		lunchAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Обед')) result++
			})
			return result
		},
		dinnerAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Ужин')) result++
			})
			return result
		},
		excursions() {
			return this.$store.getters['getExcursions']
		},
		excursionsPrice() {
			return this.excursions.reduce(
				(sum, v) =>
					sum + Number(v.date.amount) * (v.tourist.adults + v.tourist.children),
				0
			)
		},
		services() {
			return this.$store.getters['getServices']
		},
		servicesPrice() {
			return this.services.reduce((sum, v) => sum + Number(v.price), 0)
		},
		totalPrice() {
			let result = 0
			if (this.accommodationsPrice) result += this.accommodationsPrice
			if (this.shipsPrice) result += this.shipsPrice
			if (this.feedPrice) result += this.feedPrice
			if (this.excursionsPrice) result += this.excursionsPrice
			if (this.servicesPrice) result += this.servicesPrice

			return result
		},
	},
	mounted() {
		this.$store.commit('setTotalPrice', this.totalPrice)
	},
	watch: {
		totalPrice: {
			handler() {
				this.$store.commit('setTotalPrice', this.totalPrice)
			},
		},
	},
}
