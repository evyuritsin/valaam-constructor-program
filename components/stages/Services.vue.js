const Services = {
	template: /*html*/ `
						<div class="program-designer__content" v-if='loaded'>
							<div class="list-grid">
								<Service v-for="service in services" :key="service.id" :service="service"/>
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
		services: [],
		loaded: false,
	}),
	methods: {
		clickToPervStage() {
			if (this.services.length) {
				this.$store.commit('setServices', [])
			}
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			this.$emit('clickToNext')
		},
	},
	computed: {
		services() {
			return this.$store.getters['getServices']
		},
	},
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.services = data.services
		this.loaded = true
	},
	components: {
		Tabs,
		Service,
		AmountResult,
		Stages,
	},
}
