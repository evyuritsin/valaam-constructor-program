const Excursions = {
	template: /*html*/ `	
						<div class="program-designer__content">
							<div class="list" v-if="availableExcursions.length && loaded">
								<Excursion v-for="excursion in availableExcursions" :key="excursion.id" :excursion="excursion"/>
							</div>
							<h2 v-if="!availableExcursions.length && loaded">В выбранные вами даты нет экскурсий</h2>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>
`,
	data: () => ({
		excursions: [],
		loaded: false,
	}),
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.excursions = data.excursions
		this.loaded = true
	},
	computed: {
		selectExcursions() {
			return this.$store.getters['getExcursions']
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		availableExcursions() {
			const result = []
			this.excursions.forEach(excursion => {
				const availableSchedules = []
				if (!this.mainInfo.multiDay) {
					Object.values(excursion.featureSchedules).forEach(e => {
						if (
							moment(e.formatted_date, 'DD-MM-YYY').valueOf() ===
							moment(this.mainInfo.arrivalDate, 'DD-MM-YYY').valueOf()
						) {
							availableSchedules.push({ ...e })
						}
					})
				} else {
					Object.values(excursion.featureSchedules).forEach(e => {
						if (
							moment(e.formatted_date, 'DD-MM-YYY').valueOf() >=
								moment(this.mainInfo.arrivalDate, 'DD-MM-YYY').valueOf() &&
							moment(e.formatted_date, 'DD-MM-YYY').valueOf() <=
								moment(this.mainInfo.departureDate, 'DD-MM-YYY').valueOf()
						) {
							availableSchedules.push({ ...e })
						}
					})
				}
				if (availableSchedules.length) {
					result.push({ ...excursion, availableSchedules })
				}
			})
			return result
		},
	},
	methods: {
		clickToPervStage() {
			if (this.selectExcursions.length) {
				this.$store.commit('setExcursions', [])
			}
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			this.$emit('clickToNext')
		},
	},
	components: {
		AmountResult,
		Excursion,
	},
}
