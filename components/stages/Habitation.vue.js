const Habitation = {
	template: /* html */ `
						<div class="program-designer__content" v-if="mainInfo.multiDay">
							<div class="main__introtext">
								Выберите понравившийся Вам вариант размещения
							</div>
							<div class="list">
								<div class="find-list">
									<img
										class="find-list__img"
										src="./img/list_img_1.png"
										alt="list img"
									/>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col border-none">
												<div class="find-list__title">
													<a class="find-list__link" href="#"
														>ДОМ ПАЛОМНИКА «ВАЛААМ»</a
													>
												</div>
												<div class="find-list__desc">
													Дом паломника "Валаам" располагается в пяти минутах
													ходьбы от Спасо-Преображенского собора монастыря в
													историческом здании Зимней гостиницы. Оно было
													построено в середине XIX века для многочисленных
													путешественников. В наши дни после пятилетней
													реконструкции двери Дома паломника вновь открыты для
													всех гостей острова. Добро пожаловать!
												</div>
											</div>
										</div>
									</div>
									<div class="find-list__price">
										<div class="find-list__body-price">
											от
											<span class="find-list__price-value">5 849 ₽</span>
											/сут.
										</div>
										<div class="find-list__footer-price">
											<button class="find-list__footer-link" data-id="1" @click="e => clickToShowHabitations(e)">Показать</button>
										</div>
									</div>
								</div>
								<div class="find-list">
									<img
										class="find-list__img"
										src="./img/list_img_1.png"
										alt="list img"
									/>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col border-none">
												<div class="find-list__title">
													<a class="find-list__link" href="#"
														>Паломнический дом «Игуменский»</a
													>
												</div>
												<div class="find-list__desc">
													Дом паломника "Игуменский" располагается во внешнем
													каре келейных корпусов Центральной усадьбы монастыря,
													что в непосредственной близости от
													Спасо-Преображенского собора. Бывшие монашеские келии,
													переделанные в уютные номера, сохранили следы строгого
													монастырского быта.
												</div>
											</div>
										</div>
									</div>
									<div class="find-list__price">
										<div class="find-list__body-price">
											от
											<span class="find-list__price-value">5 849 ₽</span>
											/сут.
										</div>
										<div class="find-list__footer-price">
											<button class="find-list__footer-link" data-id="2" @click="e => clickToShowHabitations(e)">Показать</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="list-grid" v-bind:class="[!showHabitations && 'hidden']">
								<HotelRoom v-for="room in rooms" :key="room.id" :addRoom='addRoom' :room="room" :allRooms="selectRooms"/>
						</div>
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
		rooms: [
			{
				id: 1,
				price: 25800,
				name: '4х местный в номере 1,2,3 этажи',
			},
			{
				id: 2,
				price: 5890,
				name: '1 местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 3,
				price: 12800,
				name: '2х местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 4,
				price: 10800,
				name: '2х местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 5,
				price: 9900,
				name: '2х местный в номере 1,2,3 этажи',
			},
			{
				id: 6,
				price: 11000,
				name: '2х местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 7,
				price: 15000,
				name: '3х местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 8,
				price: 13000,
				name: '1х местный с удобствами в номере 1,2,3 этажи',
			},
			{
				id: 9,
				price: 13490,
				name: '2х местный с удобствами в номере 1,2,3 этажи',
			},
		],
		activeHotel: null,
		selectRooms: [],
		alertSpan: '',
	}),
	components: { HotelRoom, Tabs, AmountResult, Stages },
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
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
		clickToShowHabitations(e) {
			if (e.target.dataset.id !== this.activeHotel) {
				this.showHabitations = true
			} else {
				this.showHabitations = !this.showHabitations
			}
			this.activeHotel = e.target.dataset.id
		},
	},
	watch: {
		selectRooms: {
			handler() {
				this.$store.commit('setHotelRooms', this.selectRooms)
			},
			deep: true,
		},
	},
}
