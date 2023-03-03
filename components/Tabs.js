const Tabs = {
	template: /*html*/ `
							<div class="vp-tabs-content">
								<div class="vp-tabs">
									<div class="vp-tab" :class='[!info.multiDay &&  "vp-tab_active"]' @click.prevent="onClickToSingleDay">
										Однодневные
									</div>
									<div class="vp-tab" :class='[info.multiDay &&  "vp-tab_active"]' @click.prevent="onClickToMultiDay">Многодневные</div>
								</div>
								<div class="vp-tab-contents">
									<div v-if="info.multiDay" class="vp-tab-content vp-tab-content_active">
										<form action="">
											<div class="search__filters">
												<div class="search__col flex-2 relative">
													<label for="" class="search__filter-name">Дата заезда</label>
													<input
														type="text"
														ref="input1"
														readonly
														v-model="info.arrivalDate"
														@click.stop="openArrivalDate"
														class="search__filter icon_date flatpickr-input active"
													/>
													<Datepicker v-if="isArrivalDate" @close="closeArrivalDate" @selectDate="setArrivalDate"/>
												</div>
												<div class="search__col flex-2 relative">
													<label for="" class="search__filter-name">Дата отъезда</label>
													<input
														type="text"
														ref="input1"
														readonly
														v-model="info.departureDate"
														@click.stop="openDepartureDate"
														class="search__filter icon_date flatpickr-input active"
													/>
													<Datepicker v-if="isDepartureDate" @close="closeDepartureDate" @selectDate="setDepartureDate" />
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
												<div class="search__col flex-2 relative"  >
													<label for="" class="search__filter-name"
														>Место отправления</label
													>
													<input
														type="text"
														class="search__filter icon_geo_search"
														v-model="info.departurePoint.dock_name"
														readonly
														@click.stop="openCitypicker"
													/>
													<Citipicker v-if='isCitypicker' :cities="departurePoints" @close="closeCitypicker" @selectCity="selectCity"/>
												</div>
											</div>
										</form>
									</div>
									<div
										v-if="!info.multiDay"
										class="vp-tab-content vp-tab-content_active"
									>
										<form action="">
											<div class="search__filters">
												<div class="search__col flex-2 relative">
													<label for="" class="search__filter-name">Дата заезда</label>
													<input
														type="text"
														ref="input1"
														readonly
														v-model="info.arrivalDate"
														@click.stop="openArrivalDate"
														class="search__filter icon_date flatpickr-input active"
													/>
													<Datepicker v-if="isArrivalDate" @close="closeArrivalDate" @selectDate="setArrivalDate"/>
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
														v-model="info.departurePoint.dock_name"
														readonly
														@click.stop="openCitypicker"
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
			arrivalDate: '01.03.2023',
			departureDate: '03.03.2023',
			peopleAmount: '',
			departurePoint: '',
		},
		departurePoints: [],
		loaded: false,
		isCitypicker: false,
		isArrivalDate: false,
		isDepartureDate: false,
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
		openDepartureDate() {
			this.isDepartureDate = true
		},
		closeDepartureDate() {
			this.isDepartureDate = false
		},
		setDepartureDate(date) {
			this.info.departureDate = date
		},
		openArrivalDate() {
			this.isArrivalDate = true
		},
		closeArrivalDate() {
			this.isArrivalDate = false
		},
		setArrivalDate(date) {
			this.info.arrivalDate = date
		},
	},
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.departurePoints = Object.values(data.departurePlaces)
		this.loaded = true
		const vm = this
		document.addEventListener('click', function () {
			vm.closeCitypicker()
			vm.closeDepartureDate()
			vm.closeArrivalDate()
		})
	},
	components: {
		Datepicker,
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
		guestsCount() {
			return this.$store.getters['getGuests'].length
		},
	},
	watch: {
		info: {
			async handler(nV, oV) {
				this.$store.commit('setMainInfo', { ...this.info })
				if (!this.info.multiDay) {
					this.info.departureDate = this.info.arrivalDate
				}
				if (this.selectStage > 1) {
					this.$emit('goToStage', 1)
					this.$store.commit('setAlertSpan', 'Вы изменили данные')
				}
				if (
					this.info.arrivalDate &&
					this.info.departureDate &&
					this.info.peopleAmount &&
					this.info.departurePoint
				) {
					await this.$store.dispatch('fetchFirstStage', {
						...this.info,
						guestsCount: this.guestsCount,
					})
				}
			},
			deep: true,
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
								schedules: [],
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
		guestsCount() {
			if (this.guestsCount >= 10) {
				window.location.href = '/zayavka-na-gruppovuyu-programu.html'
			}
		},
	},
}
