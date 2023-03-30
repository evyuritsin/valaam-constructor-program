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
												<div class="search__col flex-2 relative" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														v-model='info.peopleAmount'
														@click.stop="openGuestspicker"
														readonly
													/>
													<Guestspicker v-if="isGuestspicker" @close='closeGuestspicker' @setGuests="setGuests"/>
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
												<div class="search__col flex-2 relative" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														v-model='info.peopleAmount'
														@click.stop="openGuestspicker"
														readonly
													/>
													<Guestspicker v-if="isGuestspicker" @close='closeGuestspicker' @setGuests="setGuests"/>
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
			arrivalDate: '',
			departureDate: '',
			peopleAmount: '',
			departurePoint: '',
		},
		departurePoints: [],
		loaded: false,
		isCitypicker: false,
		isArrivalDate: false,
		isGuestspicker: false,
		isDepartureDate: false,
	}),
	methods: {
		find() {
			console.log(this.$data)
		},
		onClickToMultiDay() {
			if (this.firstFetchIsLoaded) return

			this.info.multiDay = true
		},
		onClickToSingleDay() {
			if (this.firstFetchIsLoaded) return

			this.info.multiDay = false
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
		onClickPeoplepicker() {
			if (this.info.multiDay) {
				setTimeout(() => {
					this.$refs.input3.focus()
				}, 0)
			} else {
				setTimeout(() => {
					this.$refs.input6.focus()
				}, 0)
			}
		},
		openCitypicker() {
			if (this.isCitypicker) return (this.isCitypicker = false)

			this.isArrivalDate = false
			this.isDepartureDate = false
			this.isGuestspicker = false

			if (this.loaded) this.isCitypicker = true
		},
		closeCitypicker() {
			this.isCitypicker = false
		},
		selectCity(city) {
			this.info.departurePoint = city
		},
		openDepartureDate() {
			if (this.isDepartureDate) return (this.isDepartureDate = false)

			this.isArrivalDate = false
			this.isCitypicker = false
			this.isGuestspicker = false

			this.isDepartureDate = true
		},
		closeDepartureDate() {
			this.isDepartureDate = false
		},
		setDepartureDate(date) {
			const formateDate = date.toLocaleDateString().includes('/')
				? date.toLocaleDateString().split('/').join('.')
				: date.toLocaleDateString()

			const arrivalDateArray = this.info.arrivalDate
				.split('.')
				.map(item => Number(item))
			if (
				date >
				new Date(
					arrivalDateArray[2],
					arrivalDateArray[1] - 1,
					arrivalDateArray[0],
					0,
					0,
					0
				)
			)
				this.info.departureDate = formateDate
		},
		openArrivalDate() {
			if (this.isArrivalDate) return (this.isArrivalDate = false)

			this.isCitypicker = false
			this.isDepartureDate = false
			this.isGuestspicker = false

			this.isArrivalDate = true
		},
		closeArrivalDate() {
			this.isArrivalDate = false
		},
		setArrivalDate(date) {
			alert(date)
			if (date > new Date()) {
				const formateDate = date.toLocaleDateString().includes('/')
					? date.toLocaleDateString().split('/').join('.')
					: date.toLocaleDateString()
				this.info.arrivalDate = formateDate
			}
		},
		openGuestspicker() {
			if (this.isGuestspicker) return (this.isGuestspicker = false)

			this.isArrivalDate = false
			this.isDepartureDate = false
			this.isCitypicker = false

			this.isGuestspicker = true
		},
		closeGuestspicker() {
			this.isGuestspicker = false
		},
		setGuests(string) {
			this.info.peopleAmount = string
		},
		getLocateDate(date) {
			const datetime_regex = /(\d\d)\.(\d\d)\.(\d\d\d\d)\s(\d\d):(\d\d)/

			const date_array = datetime_regex.exec(`${date} 23:59`)
			return new Date(
				date_array[3],
				date_array[2],
				date_array[1],
				date_array[4],
				date_array[5]
			).toLocaleString()
		},
	},
	async mounted() {
		this.info.arrivalDate = moment().format('DD.MM.YYYY')
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
			vm.closeGuestspicker()
		})
	},
	components: {
		Datepicker,
		Citipicker,
		Guestspicker,
	},
	computed: {
		peoples() {
			return this.info.peopleAmount
		},
		guestsObject() {
			return this.$store.getters['getGuestsObject']
		},
		guestsCount() {
			return this.guests.length
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		firstFetchIsLoaded() {
			return this.$store.getters['getIsLoaded']
		},
	},
	watch: {
		info: {
			async handler(nV, oV) {
				this.$store.commit('setMainInfo', { ...this.info })
				this.$store.commit('setData', {})
				this.$store.commit('setLoaded', false)

				if (this.selectStage > 1) {
					this.$emit('goToStage', 1)
					this.$store.commit('setAlertSpan', 'Вы изменили данные')
				}
				if (
					(!this.info.multiDay &&
						this.info.arrivalDate &&
						this.info.peopleAmount &&
						this.info.departurePoint) ||
					(this.info.multiDay &&
						this.info.arrivalDate &&
						this.info.departureDate &&
						this.info.peopleAmount &&
						this.info.departurePoint)
				) {
					await this.$store.dispatch('fetchFirstStage', {
						...this.info,
						guestsCount: this.guestsCount,
					})
					this.$store.commit(
						'setDiscounts',
						this.$store.getters['getData'].directory.other.discounts
					)
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
							discount_category:
								Object.keys(this.guestsObject)[i] === 'Взрослых'
									? 1
									: Object.keys(this.guestsObject)[i] === 'Дети от 0-6'
									? 2
									: 3,
							feed: {
								graph: 'default',
								type: 'default',
								schedules: [],
							},
							firstname: '',
							lastname: '',
							patronymic: '',
							gender: 'male',
							birth_date: '',
							document: {
								type: '',
								id: '',
								issued_by: '',
								issue_date: '',
							},
							address: '',
							phone: '',
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
				this.info.multiDay = false
				this.info.departureDate = ''
				this.info.peopleAmount = ''
				this.info.departurePoint = ''
				window.location.href = '/zayavka-na-gruppovuyu-programu.html'
			}
		},
	},
}
