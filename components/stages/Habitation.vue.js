const Habitation = {
	template: /* html */ `
						<div class="program-designer__content" v-if="mainInfo.multiDay && mainInfo.arrivalDate && mainInfo.departureDate && loaded">
							<div class="main__introtext">
								Выберите понравившийся Вам вариант размещения
							</div>
							<div class="list">
								<div class="find-list" v-for="hotel in hotels" :key="hotel.id">
									<img
										class="find-list__img"
										:src="hotel.images[0]['sg_image']"
										:alt="hotel.images[0]['sg_title']"
									/>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col border-none">
												<div class="find-list__title">
													<a class="find-list__link" href="#"
														>{{hotel.pagetitle}}</a
													>
												</div>
												<div class="find-list__desc">
													{{hotel.introtext}}
												</div>
											</div>
										</div>
									</div>
									<div class="find-list__price">
										<div class="find-list__body-price">
											от
											<span class="find-list__price-value">{{hotel['price_from']}} ₽</span>
											/сут.
										</div>
										<div class="find-list__footer-price">
											<button class="find-list__footer-link" @click="clickToShowHabitations(hotel)">{{hotel.id === activeHotel.id ? 'Скрыть' : 'Показать'}}</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="list-grid" v-bind:class="[!showHabitations && 'hidden']">
								<HotelRoom v-for="room in showingRooms" :key="room.id" :addRoom='addRoom' :room="room" :allRooms="selectRooms" :hotel="activeHotel"/>
						</div>
						<h2 v-if="!showingRooms.length && showHabitations">Нет номеров в выбранной вами дате</h2>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__nav program-designer__nav_habitation">
							<span v-if="alertSpan" class="red">{{alertSpan}}</span>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>
	`,
	data: () => ({
		showHabitations: false,
		activeHotel: { id: null, rooms: [] },
		selectRooms: [],
		alertSpan: '',
		hotels: [],
		loaded: false,
	}),
	components: { HotelRoom, Tabs, AmountResult, Stages },
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.hotels = data.hotels
		this.loaded = true
	},
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		showingRooms() {
			let rooms = []
			this.activeHotel.rooms.forEach(room => {
				room.schedules.forEach(time => {
					if (
						moment(this.mainInfo.arrivalDate, 'DD-MM-YYYY').valueOf() >=
							moment(time.date_from, 'YYYY-MM-DD').valueOf() &&
						moment(this.mainInfo.departureDate, 'DD-MM-YYYY').valueOf() <=
							moment(time.date_to, 'YYYY-MM-DD').valueOf()
					) {
						rooms.push({ ...room })
					}
				})
			})
			let result = []
			rooms.forEach(room => {
				if (!result.some(item => item.id === room.id)) {
					result.push({ ...room })
				}
			})
			return result
		},
	},
	methods: {
		addRoom(room) {
			if (this.selectRooms.some(r => r.id === room.id)) {
				this.selectRooms = this.selectRooms.filter(r => r.id !== room.id)
			} else {
				this.selectRooms.push(room)
			}
		},
		clickToNextStage() {
			if (!this.selectRooms.length && this.mainInfo.multiDay) {
				return (this.alertSpan = 'Выберите комнату')
			}
			if (this.mainInfo.multiDay) {
				if (!this.mainInfo.arrivalDate || !this.mainInfo.departureDate) {
					return (this.alertSpan = 'Выберите дату')
				}
			} else {
				if (!this.mainInfo.arrivalDate) {
					return (this.alertSpan = 'Выберите дату')
				}
			}
			if (!this.mainInfo.peopleAmount) {
				return (this.alertSpan = 'Выберите кол-во гостей')
			}
			if (!this.mainInfo.departurePoint) {
				return (this.alertSpan = 'Выберите место отправления')
			}
			this.$emit('clickToNext')
		},
		clickToShowHabitations(hotel) {
			if (hotel.id !== this.activeHotel.id) {
				this.showHabitations = true
				this.activeHotel = hotel
			} else {
				this.showHabitations = false
				this.activeHotel = { id: null, rooms: [] }
			}
		},
	},
	watch: {
		selectRooms: {
			handler() {
				this.$store.commit('setHotelRooms', this.selectRooms)
				this.$store.commit('setAlertSpan', '')
			},
			deep: true,
		},
	},
}
