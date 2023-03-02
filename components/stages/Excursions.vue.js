const Excursions = {
	template: /*html*/ `	
						<div class="program-designer__content">
							<div class="list">
								<Excursion v-for="excursion in excursions.schedules" :key="excursion.id" :excursionData="excursion"/>
							</div>
							<h2 v-if="!excursions.schedules.length">В выбранные вами даты нет экскурсий</h2>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>
`,
	computed: {
		selectExcursions() {
			return this.$store.getters['getExcursions']
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		excursions() {
			return this.$store.getters['getFetchFetchExcursions']
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
