const SchemeHotelRoom = {
	template: /*html*/ `
		<div className="scheme-room mb-25">
				<div className="scheme-room__info">
					<h4>{{room.directory.pagetitle}}</h4>
				</div>
				<div className="scheme-room__scheme">
					<div class="popup__composition-list">
						<div class="index-form">
							<div class="index-form__label">
								<span class="index-form__text">Взрослых</span>
							</div>
							<div class="index-form__input">
								<div class="index-form__btn-minus"  @click='deleteAdult'></div>
								<span class="index-form__value">{{room.guests.adults}}</span>
								<div class="index-form__btn-plus" @click='addAdult'></div>
							</div>
						</div>
						<div class="index-form">
							<div class="index-form__label">
								<span class="index-form__text">Дети от 0-6</span>
							</div>
							<div class="index-form__input">
								<div class="index-form__btn-minus" @click='deleteChildren06'></div>
								<span class="index-form__value">{{room.guests.children06}}</span>
								<div class="index-form__btn-plus"  @click='addChildren06'></div>
							</div>
						</div>
						<div class="index-form">
							<div class="index-form__label">
								<span class="index-form__text">Дети 7-12 лет</span>
							</div>
							<div class="index-form__input">
								<div class="index-form__btn-minus" @click='deleteChildren712'></div>
								<span class="index-form__value">{{room.guests.children712}}</span>
								<div class="index-form__btn-plus"  @click='addChildren712' ></div>
							</div>
						</div>
					</div>
				</div>
				<div class="placement-item__prices">
					<div class="placement-item__price-label">
						Стоимость номера за весь период поездки
					</div>
					<div class="placement-item__price">
						<span class="placement-item__value">{{totalAmount}}</span>
						₽
					</div>
				</div>
			</div>
		</div>
	`,
	props: ['room'],
	methods: {
		addAdult() {
			if (
				this.maxAdults > 0 &&
				this.guestsInRoom < Number(this.room.directory.roomPlaces)
			) {
				this.room.guests.adults++
			}
		},
		deleteAdult() {
			if (this.room.guests.adults > 0) this.room.guests.adults--
		},
		addChildren06() {
			if (this.room.guests.adults === 0) return
			if (
				this.maxChildren06 > 0 &&
				Number(this.room.directory.roomPlaces) - this.room.guests.children06 >
					-2
			) {
				this.room.guests.children06++
			}
		},
		deleteChildren06() {
			if (this.room.guests.children06 > 0) this.room.guests.children06--
		},
		addChildren712() {
			if (this.room.guests.adults === 0) return
			if (
				this.maxChildren712 > 0 &&
				this.guestsInRoom < Number(this.room.directory.roomPlaces)
			) {
				this.room.guests.children712++
			}
		},
		deleteChildren712() {
			if (this.room.guests.children712 > 0) this.room.guests.children712--
		},
	},
	computed: {
		guestsObject() {
			return this.$store.getters['getGuestsObject']
		},
		maxAdults() {
			return Number(this.guestsObject['Взрослых']) - this.selectGuests.adults
		},
		maxChildren06() {
			return (
				Number(this.guestsObject['Дети от 0-6']) - this.selectGuests.children06
			)
		},
		maxChildren712() {
			return (
				Number(this.guestsObject['Дети 7-12 лет']) -
				this.selectGuests.children712
			)
		},
		guestsInRoom() {
			return (
				Object.values(this.room.guests).reduce((sum, val) => (sum += val), 0) -
				this.room.guests.children06
			)
		},
		selectGuests() {
			return this.$store.getters['getSelectionGuestsInRoom']
		},
		totalAmount() {
			return this.room.prices.reduce(
				(sum, price) => (sum += price.totalAmount),
				0
			)
				? this.room.prices.reduce((sum, price) => (sum += price.totalAmount), 0)
				: 0
		},
	},
	watch: {
		'room.guests.adults': {
			handler(newVal, oldVal) {
				if (newVal === 0) {
					this.room.guests.children06 = 0
					this.room.guests.children712 = 0
				}
				this.$store.commit('setAdultsInRoom', { newVal, oldVal })
			},
			deep: true,
		},
		'room.guests.children06': {
			handler(newVal, oldVal) {
				this.$store.commit('setChildren06InRoom', { newVal, oldVal })
			},
			deep: true,
		},
		'room.guests.children712': {
			handler(newVal, oldVal) {
				this.$store.commit('setChildren712InRoom', { newVal, oldVal })
			},
			deep: true,
		},
		'room.guests': {
			handler() {
				const isAdultsMoreThenOne = this.room.guests.adults >= 2

				const getAmountForADay = amount => {
					let result = 0
					result += amount * this.room.guests.adults
					result += isAdultsMoreThenOne
						? amount * 0.5 * this.room.guests.children712
						: amount * this.room.guests.children712
					result += isAdultsMoreThenOne
						? 0
						: amount * 0.5 * this.room.guests.children06
					return result
				}

				this.room.prices = this.room.prices.map(price => ({
					...price,
					totalAmount: getAmountForADay(price.amount),
				}))
			},
			deep: true,
		},
	},
	mounted() {
		const swiper = new Swiper('.scheme-room__gallery', {
			loop: true,
			navigation: {
				nextEl: '.gallery__btn-next',
				prevEl: '.gallery__btn-prev',
			},
			effect: 'fade',
		})
	},
}
