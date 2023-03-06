const Habitation = {
	template: /* html */ `
						<div class="program-designer__content">
							<div class="main__introtext">
								Выберите понравившийся Вам вариант размещения
							</div>
							<div class="list">
								<div class="find-list" v-for="hotel in hotels" :key="hotel.id">
									<img
										class="find-list__img"
										:src="'http://valaamskiy-polomnik.directpr.beget.tech' + hotel.gallery[0]"
										:alt="Hotel"
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
											<span class="find-list__price-value">{{minPriceForHotel(hotel)}} ₽</span>
											/сут.
										</div>
										<div class="find-list__footer-price">
											<button class="find-list__footer-link" @click="clickToShowHabitations(hotel)">{{hotel.id === activeHotel.id ? 'Скрыть' : 'Показать'}}</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="list-grid" v-if="showHabitations">
							<HotelRoom v-for="room in showingRooms" :key="room.id" :room="room.room" :directory="room.directory" :addRoom='addRoom' 				:allRooms="selectRooms" :hotel="activeHotel"/>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<span v-if="alertSpan" class="red show ml-auto mw-fit">{{alertSpan}}</span>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>
	`,
	data: () => ({
		showHabitations: false,
		activeHotel: { id: null, rooms: [] },
		selectRooms: [],
		alertSpan: '',
	}),
	components: { HotelRoom, Tabs, AmountResult, Stages },
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		fetchPlacements() {
			return this.$store.getters.getFetchPlacements
		},
		hotels() {
			return Object.values(this.fetchPlacements.directory.hotels).filter(
				hotel => this.availableHotelsId.includes(hotel.id)
			)
		},
		availableHotelsId() {
			return this.fetchPlacements.schedules.map(room => room.hotel_id)
		},
		showingRooms() {
			return this.fetchPlacements.schedules
				.filter(room => room.hotel_id === this.activeHotel.id)
				.map(room => {
					return {
						room,
						directory: {
							...this.fetchPlacements.directory.rooms[`room${room.room_id}`],
						},
					}
				})
		},
	},
	methods: {
		addRoom(room, directory) {
			if (this.selectRooms.some(r => r.id === room.id)) {
				this.selectRooms = this.selectRooms.filter(r => r.id !== room.id)
			} else {
				this.selectRooms.push({ ...room, directory })
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
			this.selectRooms.forEach(room => {
				this.$store.commit('addPlacement', { id: room.id, prices: room.prices })
			})
			this.$emit('clickToNext')
		},
		clickToPervStage() {
			this.selectRooms = []
			this.$store.commit('setHotelRooms', [])
			this.$emit('clickToPerv')
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
		minPriceForHotel(hotel) {
			let result = 999999999
			this.fetchPlacements.schedules
				.filter(room => room.hotel_id === hotel.id)
				.forEach(room => {
					if (room.prices[0].amount < result) result = room.prices[0].amount
				})
			return result
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
		mainInfo: {
			handler() {
				this.selectRooms = []
				this.activeHotel = { id: null, rooms: [] }
				this.showHabitations = false
			},
			deep: true,
		},
	},
	mounted() {
		this.selectRooms = []
		this.$store.commit('setHotelRooms', [])
	},
}
