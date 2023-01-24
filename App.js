const App = {
	template: /*html*/ `
					<div class="main__content">
						<div class="program-designer__header">
							<Tabs v-if="selectStage !== 6" :selectStage="selectStage" @goToStage="goToStage"/>
							<Stages :selectId="selectStage"/>
						</div>
						<div class="program-designer__content">
							<Habitation v-if="selectStage === 1" @clickToNext="clickToNextStage"/>
							<Feed v-if="selectStage === 3" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Excursions v-if="selectStage === 4" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Services v-if="selectStage === 5" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Order v-if="selectStage === 6" @clickToPerv="clickToPervStage"/>
						</div>
						<div class="program-designer__content" :class='[selectStage !== 2 && "hidden"]'>
							<Ship @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
						</div>
					</div>
		<Else />
	`,
	data: () => ({
		selectStage: 1,
	}),
	methods: {
		clickToPervStage() {
			this.selectStage--
			window.scrollTo(0, 250)
		},
		clickToNextStage() {
			if (!this.alertSpan) {
				this.selectStage++
				window.scrollTo(0, 250)
			}
		},
		goToStage(stageNumber) {
			this.selectStage = stageNumber
		},
	},
	computed: {
		alertSpan() {
			return this.$store.getters['getAlertSpan']
		},
	},
	components: {
		AmountResult,
		Habitation,
		Ship,
		Feed,
		Excursions,
		Services,
		Order,
		Else,
		Tabs,
		Stages,
	},
}
