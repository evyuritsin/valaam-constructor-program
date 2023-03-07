const Ship = {
	template: /*html*/ `
						<div class="program-designer__content" v-if='loaded'>
							<ShipTimetable direction='ТУДА'/>
							<ShipTimetable direction='ОБРАТНО'/>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div v-if="alertSpan" class="red show ml-auto mw-fit">{{alertSpan}}</div>
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
		clickToNextStage() {
			if (!this.ships.there.id || !this.ships.back.id) {
				return (this.alertSpan = 'Выберите теплоходы')
			}
			this.$store.commit('addShip', {
				date: this.ships.there.prices[0].date,
				id: this.ships.there.id,
				amount: this.ships.there.prices[0].amount,
				guests: this.guests,
			})
			this.$store.commit('addShip', {
				date: this.ships.back.prices[this.ships.back.prices.length - 1].date,
				id: this.ships.back.id,
				amount:
					this.ships.back.prices[this.ships.back.prices.length - 1].amount,
				guests: this.guests,
			})
			this.$emit('clickToNext')
		},
	},
	mounted() {
		this.$store.commit('setShipThere', { price: 0 })
		this.$store.commit('setShipBack', { price: 0 })
		this.$store.commit('removeAllShips')
	},
	components: {
		ShipTimetable,
		AmountResult,
	},
}
