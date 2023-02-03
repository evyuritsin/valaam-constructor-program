const Services = {
	template: /*html*/ `
						<div class="program-designer__content">
							<div class="list-grid">
								<Service title="Прокат велосипеда" id="1" price="2500"/>
								<Service title="Прокат лодки" id="2" price='5500'/>
								<Service title="Баня на дровах" id="3" price="2000"/>
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
	components: {
		Tabs,
		Service,
		AmountResult,
		Stages,
	},
}
