const TotalResult = {
	template: /*html*/ `
								<div class="order-form__total">
									<div class="order-form__caption">ИТОГО:</div>
									<div class="order-form__items">
										<div class="order-form__item">
											<span class="order-form__text"><b>Проживание</b></span>
											<span class="order-form__price"><b>{{accommodationsPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Теплоход</b></span>
											<span class="order-form__price"><b>{{shipsPrice}}</b> ₽</span>
										</div>
										<div class="order-form__item">
											<span class="order-form__text"><b>Питание</b></span>
											<span class="order-form__price"><b>{{feedsPrice}}</b> ₽</span>
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
		accommodationsPrice() {
			return this.$store.getters['getAccommodationsPrice']
		},
		ships() {
			return this.$store.getters['getShips']
		},
		shipsPrice() {
			return this.ships.there.price + this.ships.back.price
		},
		feedsPrice() {
			return this.$store.getters['getFeedsPrice']
		},
		excursions() {
			return this.$store.getters['getExcursions']
		},
		excursionsPrice() {
			return this.excursions.reduce((sum, v) => sum + Number(v.price), 0)
		},
		services() {
			return this.$store.getters['getServices']
		},
		servicesPrice() {
			return this.services.reduce((sum, v) => sum + Number(v.price), 0)
		},
		totalPrice() {
			return (
				this.accommodationsPrice +
				this.shipsPrice +
				this.feedsPrice +
				this.excursionsPrice +
				this.servicesPrice
			)
		},
	},
}
