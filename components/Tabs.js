const Tabs = {
	template: /*html*/ `
							<div class="vp-tabs-content">
								<div class="vp-tabs">
									<div id-tab="tab-1" class="vp-tab" @click.prevent="info.multiDay = true">Многодневные</div>
									<div id-tab="tab-2" class="vp-tab vp-tab_active" @click.prevent="info.multiDay = false">
										Однодневные
									</div>
								</div>
								<div class="vp-tab-contents">
									<div id-tab-content="tab-1" class="vp-tab-content">
										<form action="">
											<div class="search__filters">
												<div class="search__col flex-2">
													<label for="" class="search__filter-name">Дата заезда</label>
													<input
														type="text"
														ref="input1"
														readonly
														@click="e => arrivalDateOnClick(e)"
														class="search__filter icon_date flatpickr-input active"
														inputobj="12121212"
														showmodal="datepicker-lite"
														placeholder="17 октября 2022"
													/>
													<Datapicker :click="onClickDatapickerFirst" :obj="12121212"/>
												</div>
												<div class="search__col flex-2 ml-20">
													<label for="" class="search__filter-name">Дата отъезда</label>
													<input
														type="text"
														class="search__filter icon_date flatpickr-input active"
														ref="input2"
														readonly
														@click="e => departureDateOnClick(e)"
														inputobj="656222263"
														placeholder="17 октября 2022"
														showmodal="datepicker-lite"													
													/>
													<Datapicker :click="onClickDatapickerFirst" :obj="656222263"/>
												</div>
												<div class="search__col flex-2 ml-20" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														showmodal="count-list"
														readonly
														@focus="e => peopleAmountOnFocus(e)"
														ref="input3"
														inputobj="65663"
														placeholder="Состав гостей"
													/>
													<Peoplepicker :click="onClickPeoplepicker"/>
												</div>
												<div class="search__col flex-2 ml-20" >
													<label for="" class="search__filter-name"
														>Место отправления</label
													>
													<input
														type="text"
														class="search__filter icon_geo_search"
														ref="input4"
														readonly
														@focus="e => departurePointOnFocus(e)"
														showmodal="geo-list"
														inputobj="45634"
														placeholder="Любое"
													/>
													<Citipicker :click="onClickCitipicker"/>
												</div>
												<div class="search__col flex-1 ml-20" >
													<label for="" class="search__filter-name"></label>
													<button @click="find" class="vp-btn pl-50 pr-50">
														Найти
													</button>
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
														readonly
														@click="e => arrivalDateOnClick(e)"
														placeholder="17 октября 2022"
														showmodal="datepicker-lite"
													/>
													<Datapicker :click="onClickDatapickerSecond" :obj="111111"/>
												</div>
												<div class="search__col flex-2 ml-20" >
													<label for="" class="search__filter-name"
														>Количество человек</label
													>
													<input
														type="text"
														class="search__filter icon_count"
														ref="input6"
														readonly
														showmodal="count-list"
														inputobj="65663"
														@focus="e => peopleAmountOnFocus(e)"
														placeholder="Состав гостей"
													/>
													<Peoplepicker :click="onClickPeoplepicker"/>
												</div>
												<div class="search__col flex-2 ml-20">
													<label for="" class="search__filter-name"
														>Место отправления</label
													>
													<input
														type="text"
														class="search__filter icon_geo_search"
														ref="input7"
														readonly
														showmodal="geo-list"
														inputobj="45634"
														@focus="e => departurePointOnFocus(e)"
														placeholder="Любое"
													/>
													<Citipicker :click="onClickCitipicker"/>
												</div>
												<div class="search__col flex-1 ml-20">
													<label for="" class="search__filter-name"></label>
													<button @click="find" class="vp-btn pl-50 pr-50">
														Найти
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>`,
	data: () => ({
		info: {
			multiDay: false,
			arrivalDate: '',
			departureDate: '',
			peopleAmount: '',
			departurePoint: '',
		},
	}),
	methods: {
		find() {
			console.log(this.$data)
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
				console.log(1111)

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
		onClickCitipicker() {
			setTimeout(() => {
				this.$refs.input4.focus()
				this.$refs.input7.focus()
				$('.popup__blocked').click()
			}, 0)
		},
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
		'info.peopleAmount'() {
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
							type: 'default',
							id: '',
							issuedBy: '',
							issueDate: '',
						},
						phone: '',
						privilege: 'default',
						comment: '',
					})
					id++
				}
			}
			this.$store.commit('setGuests', [...result])
		},
	},
}
