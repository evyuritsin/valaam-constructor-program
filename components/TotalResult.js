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
										<div class="order-form__item" v-if="mainInfo.multiDay">
											<span class="order-form__text"><b>Питание</b></span>
											<span class="order-form__price"><b>{{feedPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Экскурсии</b></span>
											<span class="order-form__price"><b>{{excursionsPrice}}</b> ₽</span>
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
				this.ships.there.prices &&
				this.ships.back.prices &&
				(Number(this.ships.there.prices[0].amount) +
					Number(
						this.ships.back.prices[this.ships.back.prices.length - 1].amount
					)) *
					this.guests.length
			)
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		feedPrice() {
			return this.$store.getters['getFeedsPrice']
		},
		breakfastAmount() {
			return this.$store.getters['getBreakfastAmount']
		},
		lunchAmount() {
			return this.$store.getters['getLunchAmount']
		},
		dinnerAmount() {
			return this.$store.getters['getDinnerAmount']
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
		this.$store.commit('setTotalAmount', this.totalPrice)
	},
	watch: {
		totalPrice: {
			handler() {
				this.$store.commit('setTotalAmount', this.totalPrice)
			},
		},
	},
}
