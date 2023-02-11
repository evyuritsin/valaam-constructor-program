const Tabs = {
	template: /*html*/ `
							<div class="vp-tabs-content">
								<div class="vp-tabs">
									<div id-tab="tab-2" class="vp-tab vp-tab_active" @click.prevent="onClickToSingleDay">
										Однодневные
									</div>
									<div id-tab="tab-1" class="vp-tab" @click.prevent="onClickToMultiDay">Многодневные</div>
								</div>
								<div class="vp-tab-contents">
									<div id-tab-content="tab-1" class="vp-tab-content">
										<form action="">
											<div class="search__filters">
												<div class="search__col">
													<label for="" class="search__filter-name">Дата заезда</label>
													<input
														type="text"
														ref="input1"
														readonly
														:value="info.arrivalDate"
														@click="e => arrivalDateOnClick(e)"
														class="search__filter icon_date flatpickr-input active"
														inputobj="12121212"
														showmodal="datepicker-lite"
													/>
													<Datapicker :click="onClickDatapickerFirst" :obj="12121212"/>
												</div>
												<div class="search__col flex-2">
													<label for="" class="search__filter-name">Дата отъезда</label>
													<input
														type="text"
														class="search__filter icon_date flatpickr-input active"
														ref="input2"
														readonly
														@click="e => departureDateOnClick(e)"
														inputobj="656222263"
														showmodal="datepicker-lite"		
													/>
													<Datapicker :click="onClickDatapickerFirst" :obj="656222263"/>
												</div>
												<div class="search__col flex-2" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														showmodal="count-list"
														:value="info.peopleAmount"														
														readonly
														@focus="e => peopleAmountOnFocus(e)"
														ref="input3"
														inputobj="65663"
													/>
													<Peoplepicker :click="onClickPeoplepicker"/>
												</div>
												<div class="search__col flex-2" >
													<label for="" class="search__filter-name"
														>Место отправления</label
													>
													<input
														type="text"
														class="search__filter icon_geo_search"
														v-model="info.departurePoint"
														readonly
														@click="openCitypicker"
													/>
													<Citipicker v-if='isCitypicker' :cities="departurePoints" @close="closeCitypicker" @selectCity="selectCity"/>
												</div>
											</div>
										</form>
									</div>
									<div
										id-tab-content="tab-2"
										class="vp-tab-content vp-tab-content_active"
									>
										<form action="">
											<div class="search__filters">
												<div class="search__col flex-2" >
													<label for="" class="search__filter-name"
														>Дата заезда</label
													>
													<input
														type="text"
														class="search__filter icon_date flatpickr-input active"
														ref="input5"
														inputobj="111111"
														:value="info.arrivalDate"
														readonly
														@click="e => arrivalDateOnClick(e)"
														showmodal="datepicker-lite"
													/>
													<Datapicker :click="onClickDatapickerSecond" :obj="111111"/>
												</div>
												<div class="search__col flex-2" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														ref="input6"
														readonly
														:value="info.peopleAmount"
														showmodal="count-list"
														inputobj="65663"
														@focus="e => peopleAmountOnFocus(e)"
													/>
													<Peoplepicker :click="onClickPeoplepicker"/>
												</div>
												<div class="search__col flex-2 relative">
													<label for="" class="search__filter-name"
														>Место отправления</label
													>
													<input
														type="text"
														class="search__filter icon_geo_search"
														v-model="info.departurePoint"
														readonly
														@click="openCitypicker"
													/>
													<Citipicker v-if='isCitypicker' :cities="departurePoints" @close="closeCitypicker" @selectCity="selectCity"/>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>`,
	props: ['selectStage'],
	data: () => ({
		info: {
			multiDay: false,
			arrivalDate: '',
			departureDate: '',
			peopleAmount: '',
			departurePoint: '',
		},
		departurePoints: [],
		loaded: false,
		isCitypicker: false,
	}),
	methods: {
		find() {
			console.log(this.$data)
		},
		onClickToMultiDay() {
			this.info.multiDay = true
			$('.popup__blocked').click()
		},
		onClickToSingleDay() {
			this.info.multiDay = false
			$('.popup__blocked').click()
		},
		arrivalDateOnClick(e) {
			this.info.arrivalDate = e.target.value
		},
		departureDateOnClick(e) {
			this.info.departureDate = e.target.value
		},
		peopleAmountOnFocus(e) {
			this.info.peopleAmount = e.target.value
		},
		departurePointOnFocus(e) {
			this.info.departurePoint = e.target.value
		},
		onClickDatapickerFirst() {
			setTimeout(() => {
				this.$refs.input1.click()
				this.$refs.input2.click()
				$('.popup__blocked').click()
			}, 0)
		},
		onClickDatapickerSecond() {
			setTimeout(() => {
				this.$refs.input5.click()
				$('.popup__blocked').click()
			}, 0)
		},
		onClickPeoplepicker() {
			setTimeout(() => {
				this.$refs.input3.focus()
				this.$refs.input6.focus()
			}, 0)
		},
		openCitypicker() {
			this.isCitypicker = true
		},
		closeCitypicker() {
			this.isCitypicker = false
		},
		selectCity(city) {
			this.info.departurePoint = city
		},
	},
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		data.dates.forEach(date => {
			date.ships_schedule_there.forEach(race => {
				const city = race.route_id[0].start_dock.title
				if (!this.departurePoints.includes(city)) {
					this.departurePoints.push(city)
				}
			})
		})
		this.loaded = true
	},
	components: {
		Datapicker,
		Citipicker,
		Peoplepicker,
	},
	computed: {
		peoples() {
			return this.info.peopleAmount
		},
		guestsObject() {
			return this.$store.getters['getGuestsObject']
		},
	},
	watch: {
		info: {
			handler(nV, oV) {
				this.$store.commit('setMainInfo', { ...this.info })
			},
			deep: true,
		},
		'info.multiDay'() {
			if (this.selectStage > 1) {
				if (this.info.multiDay) {
					this.$store.commit(
						'setAlertSpan',
						'Необходимо выбрать номер(а) в отеле'
					)
					this.$store.commit('setMainInfo', {
						multiDay: true,
						arrivalDate: '',
						departureDate: '',
						peopleAmount: '',
						departurePoint: '',
					})
					this.info = {
						multiDay: true,
						arrivalDate: '',
						departureDate: '',
						peopleAmount: '',
						departurePoint: '',
					}
					this.$emit('goToStage', 1)
				}
			}
		},
		'info.departurePoint'() {
			if (this.selectStage > 2) {
				this.$store.commit(
					'setAlertSpan',
					'Так как город отправления был изменен, необходимо выбрать новые теплоходы'
				)
				this.$store.commit('setShipThere', { price: 0 })
				this.$store.commit('setShipBack', { price: 0 })
				this.$emit('goToStage', 2)
			}
		},
		'info.peopleAmount'() {
			if (this.info.peopleAmount) {
				let result = []
				let id = 1
				for (let i = 0; i < Object.keys(this.guestsObject).length; i++) {
					for (
						let j = 0;
						j <
						[
							...Array(
								Number(this.guestsObject[Object.keys(this.guestsObject)[i]])
							),
						].length;
						j++
					) {
						result.push({
							id: id,
							type:
								Object.keys(this.guestsObject)[i] === 'Взрослых'
									? 'Взрослый'
									: Object.keys(this.guestsObject)[i] === 'Дети от 0-6'
									? 'Ребенок 0-6'
									: 'Ребенок 7-12',
							feed: {
								graph: 'default',
								type: 'default',
							},
							firstName: '',
							lastName: '',
							middleName: '',
							gender: 'male',
							birthdayDate: '',
							document: {
								type: '',
								id: '',
								issuedBy: '',
								issueDate: '',
							},
							phone: '',
							privilege: '',
							comment: '',
						})
						id++
					}
				}
				this.$store.commit('setGuests', [...result])
			}
		},
	},
}
