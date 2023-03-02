const Feed = {
	template: /*html*/ `
						<div class="program-designer__content">
							<div class="program-designer__block">
								<div class="program-designer__menu-title">Питание</div>
								<div class="program-designer__menu-subtitle">
									Меню предоставляется на выбор:
								</div>
								<div class="program-designer__menu-type">
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label"
											>Стандартное</span
										>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Включает как холодные, так и горячие блюда.</span
										>
									</div>
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label">Постное</span>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Исключены мясные, рыбные и молочные продукты. В
											приготовлении используются фрукты, овощи, орехи, грибы.Из
											основы – каши.</span
										>
									</div>
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label">Детское</span>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Рекомендовано для детей от 2 лет. Еда состоит из мягких,
											легких для пережевывания продуктов</span
										>
									</div>
								</div>
							</div>
							<div class="program-designer__calc">
								<div
									class="program-designer__calc-item program-designer_calc-header"
								>
									<div class="program-designer__calc-col">
										<span class="program-designer__calc-title"
											>Задать всем гостям</span
										>
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="toAllFeed.type" @click="isPersonalMeals = false">
											<option selected disabled hidden value="default">Тип меню</option>
											<option class="custom-select__item" v-for="type in menuTypes" :key="type.id" :value="type">{{type.title}}</option>
										</select>									
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="toAllFeed.graph" @click="isPersonalMeals = false">
											<option selected disabled hidden value="default">График питания</option>
											<option 
												class="custom-select__item" 
												v-for="item in graphics" 
												:key="item.id" 
												:value="item"
											>
												{{item.title}}
											</option>
										</select>
									</div>									
									<div
										class="program-designer__calc-col"
										
									>

									</div>
								</div>
								<span class="program-designer__calc-subtitle"
									>Или задать каждому гостю:</span
								>
								<div class="program-designer__calc-item" v-for="(guest, i) in copyGuests" :key="guest.id">
									<div class="program-designer__calc-col">
										<span class="program-designer__calc-title"
											>{{guest.id}}. {{guest.type}}</span
										>
									</div>
									<div class="program-designer__calc-col" >
										<select class="custom-select custom-select__body" v-model="guest.feed.type" @click="isPersonalMeals = true">
											<option selected disabled hidden value="default">Тип меню</option>
											<option class="custom-select__item" v-for="type in menuTypes" :key="type.id" :value="type">{{type.title}}</option>
										</select>									
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="guest.feed.graph" @click="isPersonalMeals = true">
											<option selected disabled hidden value="default">График питания</option>
											<option 
												class="custom-select__item" 
												v-for="item in graphics" 
												:key="item.id" 
												:value="item"
											>
												{{item.title}}
											</option>
										</select>
									</div>
									<div
										class="program-designer__calc-col program-designer__calc-subtitle"
									>
										<span class="program-designer__calc-price"
											><b v-if="guest.feed.graph !== 'default' && guest.feed.graph">{{personalMealPrice(guest)}}</b> ₽</span
										>
									</div>
								</div>
							</div>

							<div class="program-designer__total-details" v-if="isMealsSelected">
								<div class="program-designer__total-detail">
									<div class="program-designer__menu-subtitle" >
										Завтраков: {{breakfastAmount}}
									</div>
									<div class="program-designer__menu-subtitle" >
										Обедов: {{lunchAmount}}
									</div>
									<div class="program-designer__menu-subtitle">
										Ужинов: {{dinnerAmount}}
									</div>
								</div>
								<div class="program-designer__total">
									<div class="program-designer__menu-subtitle flex-1 mt-0">
										ИТОГО:
									</div>
									<span class="program-designer__calc-price ml-20"
										><b>{{feedPrice}}</b> ₽</span
									>
								</div>
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
		toAllFeed: {
			graph: 'default',
			type: 'default',
		},
		graphics: [
			{ id: 1, title: 'Завтрак', mealsId: [1] },
			{ id: 2, title: 'Завтрак + Обед', mealsId: [1, 2] },
			{ id: 3, title: 'Завтрак + Ужин', mealsId: [1, 4] },
			{ id: 4, title: 'Обед + Ужин', mealsId: [2, 4] },
			{ id: 5, title: 'Завтрак + Обед + Ужин', mealsId: [1, 2, 4] },
		],
		copyGuests: [],
		isPersonalMeals: null,
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
		meals() {
			return this.$store.getters['getFetchMeals']
		},
		menuTypes() {
			return this.meals.directory.types
		},
		isMealsSelected() {
			let result = true
			this.guests.forEach(guest => {
				if (guest.feed.graph === 'default' || guest.feed.type === 'default') {
					result = false
				}
			})
			return result
		},
		breakfastAmount() {
			return this.$store.getters['getBreakfastAmount']
		},
		lunchAmount() {
			return this.$store.getters['getLunchAmount']
		},
		dinnerAmount() {
			return this.$store.getters['getDinnerAmount']
		},
		feedPrice() {
			return this.guests.reduce((sum, guest) => sum + guest.feed.price, 0)
		},
	},
	mounted() {
		this.copyGuests = [...this.guests]
	},
	methods: {
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			console.log(this.copyGuests)
			this.$emit('clickToNext')
		},
		personalMealPrice(guest) {
			let result = 0
			if (guest.feed.graph.mealsId && guest.feed.type.id) {
				this.meals.schedules.forEach(meal => {
					if (
						meal.type_id === guest.feed.type.id &&
						guest.feed.graph.mealsId.includes(meal.meal_id)
					) {
						result += meal.prices.reduce((sum, price) => sum + price.amount, 0)
					}
				})
			}
			return result
		},
	},
	watch: {
		toAllFeed: {
			handler() {
				this.copyGuests = this.copyGuests.map(guest => ({
					...guest,
					feed: { ...this.toAllFeed, price: this.personalMealPrice(guest) },
				}))
			},
			deep: true,
		},
		copyGuests: {
			handler() {
				this.$store.commit('setGuests', [
					...this.copyGuests.map(guest => ({
						...guest,
						feed: { ...guest.feed, price: this.personalMealPrice(guest) },
					})),
				])
			},
			deep: true,
		},
	},
	components: { Tabs, AmountResult, Stages },
}
