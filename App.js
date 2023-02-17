const App = {
	template: /*html*/ `
				<section class="section" :class="[selectStage === 1 ? 'program-designer-habitation' : selectStage === 2 ? 'program-designer-ship' : selectStage === 3 ? 'program-designer-feed' : selectStage === 4 ? 'program-designer-excursions' : selectStage === 5 ? 'program-designer-services' : 'program-designer-order']">
					<div class="main__content">
						<div class="program-designer__header">
							<Tabs v-if="selectStage !== 6" :selectStage="selectStage" @goToStage="goToStage"/>
							<Stages :selectId="selectStage"/>
						</div>
						<div class="program-designer__content">
							<Ship  v-if="selectStage === 2" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage" @goToStage="goToStage"/>
							<Feed v-if="mainInfo.multiDay && selectStage === 3" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Excursions v-if="mainInfo.multiDay ? selectStage === 4 : selectStage === 3" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage" @goToStage="goToStage"/>
							<Services v-if="mainInfo.multiDay ? selectStage === 5 : selectStage === 4 " @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Order v-if="mainInfo.multiDay ? selectStage === 6 : selectStage === 5" @clickToPerv="clickToPervStage"/>
						</div>
						<div class="program-designer__content" :class='[selectStage !== 1 && "hidden"]'>
							<Habitation  @clickToNext="clickToNextStage"/>
						</div>
					</div>
				</section>	
		<Else />
	`,
	data: () => ({
		selectStage: 4,
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
		mainInfo() {
			return this.$store.getters['getMainInfo']
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
