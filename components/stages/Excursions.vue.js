const Excursions = {
	template: /*html*/ `	
						<div class="program-designer__content">
							<div class="list" v-if="loaded">
								<Excursion v-for="excursion in excursions" :key="excursion.id" :excursion="excursion"/>
							</div>
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
