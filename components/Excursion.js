const Excursion = {
	template: /*html*/ `
								<div class="find-list">
									<img
										class="find-list__img"
										:src="'http://valaamskiy-polomnik.directpr.beget.tech' + excursion.gallery[0]"
										alt="Excursion photo"
									/>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col border-none">
												<div class="find-list__title">
													<a class="find-list__link" href="#">{{excursion.pagetitle}}</a>
												</div>
												<div class="find-list__desc mt-10">
													{{excursion.introtext}}
												</div>
											</div>
										</div>
										<div class="find-list__footer">
											<div class="checkbox__label mr-10" v-for="item in excursionData.prices" :key="item.id">
											  <input 
													type="radio" 
													class="checkbox" 
													:name="'excursionDate' + excursionData.excursion_id" 
													:disabled="!tourist.adults && !tourist.children"
													:value="item"
													v-model="selectDate"
												/>
												<span class="checkbox__text">{{dateFormatter(item.date)}}</span>
											</div>
											<div class="find-list__date-item" v-if="excursionData.prices.length > 6">
												<span class="find-list__date-item-last"
													>Ещё время</span
												>
											</div>
										</div>
									</div>
									<div class="find-list__price">
										<div class="find-list__body-price">
											<div class="index-form justify-between">
												<div class="index-form__label flex-n pl-10">
													<span class="index-form__text index-form_one-line"
														>Взрослых</span
													>
												</div>
												<div
													class="index-form__input flex-n ml-10"
												>
													<div class="index-form__btn-minus" @click="deleteAdults"></div>
													<span class="index-form__value index-form_value-lite"
														>{{tourist.adults}}</span
													>
													<div class="index-form__btn-plus" @click="addAdults"></div>
												</div>
											</div>
											<div class="index-form justify-between">
												<div class="index-form__label flex-n pl-10">
													<span class="index-form__text index-form_one-line"
														>Детей 7-12 лет</span
													>
												</div>
												<div
													class="index-form__input flex-n ml-10"
												>
													<div class="index-form__btn-minus" @click="deleteChildren"></div>
													<span class="index-form__value index-form_value-lite"
														>{{tourist.children}}</span
													>
													<div class="index-form__btn-plus" @click="addChildren"></div>
												</div>
											</div>
											<span class="find-list__price-value mt-40" v-if="lowestPrice === 0">За пожертвование</span>
											<span class="find-list__price-value mt-40" v-else-if="!selectDate">от {{lowestPrice}} ₽</span>
											<span class="find-list__price-value mt-40" v-else-if="selectDate">{{selectDate.amount * (tourist.adults + tourist.children)}} ₽</span>
										</div>
										<div class="find-list__footer-price">
											<a :href="excursion.url" class="find-list__footer-link">Смотреть</a>
										</div>
									</div>
									<div class="excursion-list__duration">
										<img
											src="./img/icon_clock.png"
											alt="icon clock"
											class="excursion-list__icon"
										/>
										<span class="excursion-list__time">{{excursion.excursionDuration}} мин.</span>
									</div>
								</div>
	`,
	props: ['excursionData'],
	data: () => ({
		tourist: {
			adults: 0,
			children: 0,
		},
		selectDate: null,
	}),
	mounted() {
		let excursion
		if (this.allSelectExcursions) {
			excursion = this.allSelectExcursions.filter(
				ex => ex.excursion_id === this.excursionData.excursion_id
			)[0]
		}
		if (excursion) {
			this.selectDate = { ...excursion.date }
		}
	},
	computed: {
		guests() {
			return this.$store.getters['getGuestsObject']
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		directory() {
			return this.$store.getters['getFetchFetchExcursions'].directory
		},
		excursion() {
			return this.directory.excursions[
				`excursion${this.excursionData.excursion_id}`
			]
		},
		allSelectExcursions() {
			return this.$store.getters['getExceptions']
		},
		lowestPrice() {
			let result = 9999999999
			this.excursionData.prices.forEach(price => {
				if (price.amount < result) result = price.amount
			})
			return result
		},
	},
	methods: {
		addAdults() {
			if (this.tourist.adults < Number(this.guests['Взрослых'])) {
				this.tourist.adults++
			}
		},
		deleteAdults() {
			if (this.tourist.adults) {
				this.tourist.adults--
			}
		},
		addChildren() {
			if (this.tourist.children < Number(this.guests['Дети 7-12 лет'])) {
				this.tourist.children++
			}
		},
		deleteChildren() {
			if (this.tourist.children) {
				this.tourist.children--
			}
		},
		addExcursionToStore() {
			this.$store.commit('deleteExcursion', this.excursionData.excursion_id)
			this.$store.commit('addExcursion', {
				...this.excursionData,
				pagetitle: this.excursion.pagetitle,
				date: this.selectDate,
				tourist: { ...this.tourist },
			})
		},
		dateFormatter(date) {
			const arrDate = date.split('.')
			return `${arrDate[0]}.${arrDate[1]}`
		},
	},
	watch: {
		tourist: {
			handler() {
				if (this.selectDate) {
					this.addExcursionToStore()
				}
				if (!this.tourist.adults && !this.tourist.children) {
					this.$store.commit('deleteExcursion', this.excursionData.excursion_id)
					this.selectDate = null
				}
			},
			deep: true,
		},
		selectDate: {
			handler() {
				if (this.selectDate) {
					this.addExcursionToStore()
				}
			},
		},
	},
}
