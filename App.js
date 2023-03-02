const App = {
	template: /*html*/ `
				<section class="section" :class="sectionClass">
					<div class="main__content">
						<div class="program-designer__header">
							<Tabs v-if="selectStage !== 6" :selectStage="selectStage" @goToStage="goToStage"/>
							<Stages :selectId="selectStage"/>
						</div>
						<div class="program-designer__content">
							<Habitation  v-if="selectStage === 1"  @clickToNext="clickToNextStage"/>
							<Ship  v-if="selectStage === 2" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage" @goToStage="goToStage"/>
							<Feed v-if="mainInfo.multiDay && selectStage === 3" @clickToNext="clickToNextStage" @clickToPerv="clickToPervStage"/>
							<Excursions 
								v-if="mainInfo.multiDay ? selectStage === 4 : selectStage === 3" 
								@clickToNext="clickToNextStage" 
								@clickToPerv="clickToPervStage" 
								@goToStage="goToStage"
							/>
							<Services 
								v-if="mainInfo.multiDay ? selectStage === 5 : selectStage === 4" 
								@clickToNext="clickToNextStage" 
								@clickToPerv="clickToPervStage"
							/>
							<Order v-if="mainInfo.multiDay ? selectStage === 6 : selectStage === 5" @clickToPerv="clickToPervStage"/>
						</div>
					</div>
				</section>	
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
			if (this.alertSpan === 'Вы изменили данные') {
				this.selectStage++
				window.scrollTo(0, 250)
				this.$store.commit('setAlertSpan', '')
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
		sectionClass() {
			return this.selectStage === 1
				? 'program-designer-habitation'
				: this.selectStage === 2
				? 'program-designer-ship'
				: this.selectStage === 3
				? 'program-designer-feed'
				: this.selectStage === 4
				? 'program-designer-excursions'
				: this.selectStage === 5
				? 'program-designer-services'
				: 'program-designer-order'
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
