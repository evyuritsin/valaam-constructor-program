const App = {
	template: /*html*/ `
		<MyHeader />
		<main class="main">
			<div class="crumbs">
				<div class="crumbs__row">
					<ul class="crumbs__list">
						<li class="crumbs__item">
							<a class="crumbs__link" href="#main">Главная</a>
						</li>
						<li class="crumbs__item">
							<a class="crumbs__link" href="#">Теплоходы</a>
						</li>
						<li class="crumbs__item">Теплоход</li>
					</ul>
				</div>
			</div>
			<section class="section program-designer-habitation">
					<div class="main__caption">Конструктор программ</div>
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
			</section>			
		</main>
		<MyFooter />
		<Else />
	`,
	data: () => ({
		selectStage: 1,
	}),
	methods: {
		clickToPervStage() {
			this.selectStage--
		},
		clickToNextStage() {
			if (!this.alertSpan) {
				this.selectStage++
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
		MyHeader,
		MyFooter,
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
