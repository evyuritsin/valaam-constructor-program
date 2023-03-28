const Habitation = {
	template: /* html */ `
						<div class="program-designer__content">
							<div class="main__introtext">
								{{hotels.length ? 'Выберите понравившийся Вам вариант размещения' : 'Нет свободных номеров в выбранные даты'}}
							</div>
							<div class="list">
								<div class="find-list" v-for="hotel in hotels" :key="hotel.id">
									<div className="find-list__img find-list__img_bg" :style="{'background-image': 'url(http://valaamskiy-polomnik.directpr.beget.tech' + hotel.gallery[0] + ')'}">
									</div>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col flex-1 border-none">
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
							<HotelRoom v-for="room in showingRooms" :key="room.id" :room="room.room" :directory="room.directory" :addRoom='addRoom' 				:removeRoom="removeRoom" :allRooms="selectRooms" :hotel="activeHotel"/>
						</div>
						<div className="list pt-25" v-if="selectRooms.length">
							<SchemeHotelRoom v-for="room in selectRooms" :key="room.id" :room="room"/>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<span v-if="alertSpan" class="red show ml-auto mw-fit pt-10">{{alertSpan}}</span>
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
	components: { HotelRoom, Tabs, AmountResult, Stages, SchemeHotelRoom },
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
		guestsObject() {
			return this.$store.getters['getGuestsObject']
		},
		maxAdults() {
			return Number(this.guestsObject['Взрослых']) - this.selectGuests.adults
		},
		maxChildren06() {
			return (
				Number(this.guestsObject['Дети от 0-6']) - this.selectGuests.children06
			)
		},
		maxChildren712() {
			return (
				Number(this.guestsObject['Дети 7-12 лет']) -
				this.selectGuests.children712
			)
		},
		guestsInRoom() {
			return Object.values(this.room.guests).reduce(
				(sum, val) => (sum += val),
				0
			)
		},
		selectGuests() {
			return this.$store.getters['getSelectionGuestsInRoom']
		},
	},
	methods: {
		addRoom(room, directory) {
			this.selectRooms.push({
				...room,
				directory,
				guests: { adults: 0, children06: 0, children712: 0 },
				amount: 0,
			})
		},
		removeRoom(room) {
			this.$store.commit('setGuestsInRoom', {
				adults: 0,
				children06: 0,
				children712: 0,
			})
			this.selectRooms = this.selectRooms.filter(r => r.id !== room.id)
			this.selectRooms = this.selectRooms.map(room => ({
				...room,
				guests: {
					adults: 0,
					children06: 0,
					children712: 0,
				},
			}))
		},
		clickToNextStage() {
			if (!this.selectRooms.length && this.mainInfo.multiDay) {
				return (this.alertSpan = 'Выберите комнату')
			}
			if (
				this.maxAdults > 0 ||
				this.maxChildren06 > 0 ||
				this.maxChildren06 > 0
			) {
				return (this.alertSpan = 'Размещены не все гости')
			}
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
				this.alertSpan = ''
				this.$store.commit('setHotelRooms', this.selectRooms)
				this.$store.commit('removeAllPlacements')
				this.selectRooms.forEach(room => {
					this.$store.commit('addPlacement', {
						id: room.id,
						prices: room.prices,
					})
				})
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
		this.$store.commit('setGuestsInRoom', {
			adults: 0,
			children06: 0,
			children712: 0,
		})
	},
}
