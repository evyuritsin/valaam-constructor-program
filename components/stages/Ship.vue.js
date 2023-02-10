const Ship = {
	template: /*html*/ `
						<div class="program-designer__content">
							<ShipTimetable direction='ТУДА'/>
							<ShipTimetable direction='ОБРАТНО'/>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div v-if="alertSpan" class="red show ml-auto mw-fit">{{alertSpan}}</div>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
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
	},
	methods: {
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			if (!this.ships.there.pagetitle || !this.ships.back.pagetitle) {
				return (this.alertSpan = 'Выберите теплоходы')
			}
			this.$emit('clickToNext')
		},
	},
	components: {
		ShipTimetable,
		AmountResult,
	},
}
