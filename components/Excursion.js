const Excursion = {
	template: /*html*/ `
								<div class="find-list">
									<img
										class="find-list__img"
										:src="'http://valaamskiy-polomnik.directpr.beget.tech' + excursion.images[0]['sg_image']"
										:alt="excursion.images[0]['sg_image']"
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
											<div class="checkbox__label mr-10" v-for="item in excursion.availableSchedules" :key="item.id">
												<input 
													type="checkbox" 
													class="checkbox" 
													@change="e => clickToCheckbox(e, item)" 
													:checked="!tourist.adults && !tourist.children ? false : isSelected(item.id)"
													:disabled="!tourist.adults && !tourist.children"
												/>
												<span class="checkbox__text">{{item.day}}.{{item.month.length === 2 ? item.month : '0' + item.month}}</span>
											</div>
											<div class="find-list__date-item" v-if="excursion.availableSchedules.length > 6">
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
														>Детей</span
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
											<span class="find-list__price-value mt-40">{{this.excursion.schedules[0].amount}} ₽</span>
										</div>
										<div class="find-list__footer-price">
											<a :href="excursion.url" class="find-list__footer-link">Смотреть</ф>
										</div>
									</div>
									<div class="excursion-list__duration">
										<img
											src="./img/icon_clock.png"
											alt="icon clock"
											class="excursion-list__icon"
										/>
										<span class="excursion-list__time">{{excursion.duration.formatted}}</span>
									</div>
								</div>
	`,
	props: ['excursion'],
	data: () => ({
		tourist: {
			adults: 0,
			children: 0,
		},
		selectExcursions: [],
	}),
	mounted() {
		this.selectExcursions = [...this.$store.getters['getExcursions']]
	},
	computed: {
		guests() {
			return this.$store.getters['getGuestsObject']
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		schedules() {
			let result = []
			if (!this.mainInfo.multiDay) {
				Object.values(this.excursion.featureSchedules).forEach(e => {
					if (
						moment(e.formatted_date).valueOf() ===
						moment(this.mainInfo.arrivalDate).valueOf()
					) {
						result.push({ ...e })
					}
				})
			} else {
				Object.values(this.excursion.featureSchedules).forEach(e => {
					if (
						moment(e.formatted_date, 'DD-MM-YYY').valueOf() >=
							moment(this.mainInfo.arrivalDate, 'DD-MM-YYY').valueOf() &&
						moment(e.formatted_date, 'DD-MM-YYY').valueOf() <=
							moment(this.mainInfo.departureDate, 'DD-MM-YYY').valueOf()
					) {
						result.push({ ...e })
					}
				})
			}
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
		isSelected(id) {
			let result = false
			this.selectExcursions.forEach(ex => {
				if (ex.id === id) result = true
			})
			return result
		},
		addChildren() {
			if (
				Number(this.guests['Дети 7-12 лет']) &&
				Number(this.guests['Дети от 0-6'])
			) {
				if (
					this.tourist.children <
					Number(this.guests['Дети 7-12 лет']) +
						Number(this.guests['Дети от 0-6'])
				) {
					this.tourist.children++
				}
			} else {
				if (Number(this.guests['Дети 7-12 лет'])) {
					if (this.tourist.children < Number(this.guests['Дети 7-12 лет'])) {
						this.tourist.children++
					}
				} else if (this.tourist.children < Number(this.guests['Дети от 0-6'])) {
					this.tourist.children++
				}
			}
		},
		deleteChildren() {
			if (this.tourist.children) {
				this.tourist.children--
			}
		},
		clickToCheckbox(e, date) {
			if (e.target.checked) {
				this.$store.commit('addExcursion', {
					idEx: `${this.excursion.id}${date.timestamp}`,
					id: this.excursion.id,
					pagetitle: this.excursion.pagetitle,
					date,
					tourist: { ...this.tourist },
				})
				this.selectExcursions.push({
					idEx: `${this.excursion.id}${date.timestamp}`,
					id: this.excursion.id,
					pagetitle: this.excursion.pagetitle,
					date,
					tourist: { ...this.tourist },
				})
			} else {
				this.$store.commit(
					'deleteExcursion',
					`${this.excursion.id}${date.timestamp}`
				)
				this.selectExcursions = this.selectExcursion.filter(
					e => e.idEx !== `${this.excursion.id}${date.timestamp}`
				)
			}
		},
	},
	watch: {
		tourist: {
			handler() {
				this.selectExcursions.forEach(e =>
					this.$store.commit('deleteExcursion', e.id)
				)
				this.selectExcursions.forEach(ex =>
					this.$store.commit('addExcursion', { ...ex, tourist: this.tourist })
				)
				if (!this.tourist.adults && !this.tourist.children) {
					this.selectExcursions.forEach(e =>
						this.$store.commit('deleteExcursion', e.id)
					)
					this.selectExcursions = []
				}
			},
			deep: true,
		},
	},
}
