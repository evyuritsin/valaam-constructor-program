const Ship = {
	template: /*html*/ `
						<div class="program-designer__content" v-if='loaded'>
							<ShipTimetable direction='ТУДА'/>
							<ShipTimetable direction='ОБРАТНО'/>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div v-if="alertSpan" class="red show ml-auto mw-fit pt-10">{{alertSpan}}</div>
						<div class="program-designer__nav">
							<button class="vp-btn" @click="clickToNextStage" :disabled="!loaded">Дальше</button>
						</div>						
					`,
	data: () => ({
		alertSpan: '',
	}),
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		ships() {
			return this.$store.getters['getShips']
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		loaded() {
			return this.$store.getters.getLoaded
		},
	},
	methods: {
		getLowestPrice(amount, id) {
			return this.$store.getters['getLowestAmount']({
				type: 'ships',
				amount: amount,
				discount_category_id: id,
			})
		},
		clickToNextStage() {
			if (!this.ships.there.id || !this.ships.back.id) {
				return (this.alertSpan = 'Выберите теплоходы')
			}
			this.$emit('clickToNext')
			console.log(this.$store.getters['getRequest'])
		},
	},
	mounted() {
		this.$store.commit('removeAllShips')
		this.$store.commit('setShipThere', { price: 0 })
		this.$store.commit('setShipBack', { price: 0 })
	},
	watch: {
		ships: {
			handler() {
				this.$store.commit('removeAllShips')

				let therePrice
				let backPrice

				if (this.ships.there.prices) {
					therePrice = this.ships.there.prices[0].amount
				}
				if (this.ships.back.prices) {
					backPrice =
						this.ships.back.prices[this.ships.back.prices.length - 1].amount
				}

				if (therePrice) {
					this.$store.commit('addShip', {
						date: this.ships.there.prices[0].date,
						id: this.ships.there.id,
						amounts: {
							amount1: therePrice,
							amount2: this.getLowestPrice(therePrice, 2),
							amount3: this.getLowestPrice(therePrice, 3),
						},
						guests: this.guests,
					})
				}
				if (backPrice) {
					this.$store.commit('addShip', {
						date: this.ships.back.prices[this.ships.back.prices.length - 1]
							.date,
						id: this.ships.back.id,
						amounts: {
							amount1: backPrice,
							amount2: this.getLowestPrice(backPrice, 2),
							amount3: this.getLowestPrice(backPrice, 3),
						},
						guests: this.guests,
					})
				}
			},
			deep: true,
		},
	},
	components: {
		ShipTimetable,
		AmountResult,
	},
}
