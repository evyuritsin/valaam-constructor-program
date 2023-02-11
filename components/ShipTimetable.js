const ShipTimetable = {
	template: /*html*/ `
							<div class="program-designer__direction" >
								<div class="program-designer__direction-title" v-if="!mainInfo.departurePoint">
									{{direction}}
								</div>
								<div class="program-designer__direction-title" v-else-if="direction === 'ТУДА'">
									{{direction}}: {{mainInfo.departurePoint}} — Валаам
								</div>
								<div class="program-designer__direction-title" v-else-if="direction === 'ОБРАТНО'">
									{{direction}}: Валаам — {{mainInfo.departurePoint}} 
								</div>								
								<div class="program-designer__direction-content">
								<!-- <CalendarSlider :direction="direction"/> -->
									<table class="direction-table" v-if="loaded && ships.length">
										<thead class="direction-table__head">
											<tr>
												<th class="ta-left">Отправление</th>
												<th class="ta-left">Прибытие</th>
												<th class="ta-left">Теплоход</th>
												<th class="ta-left">Наличие</th>
												<th>Цена</th>
												<th></th>
											</tr>
										</thead>
										<tbody class="direction-table__body" v-show="!showDetails">
											<tr v-for="(ship, index) in [...Array(3)]" :key="index" :class="{'direction-table__tr-active' : ships[index].id === selectShip.id}">
												<th class="ta-left">{{ships[index].departureAndArrivalTime.departure}}</th>
												<th class="ta-left">{{ships[index].departureAndArrivalTime.arrival}}</th>
												<th class="ta-left">{{ships[index].pagetitle}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">{{ships[index].shipPlaces}}</span>
													</div>
												</th>
												<th class="fw-700">{{ships[index].departureAndArrivalTime.price}} ₽</th>
												<th 
													class="direction-table__select-ship" 
													@click.prevent="clickToSelectShip(ships[index])" 
													:class="{'direction-table_select-ship-active' : ships[index].id === selectShip.id}"
												>
													ВЫБРАТЬ
												</th>
											</tr>
										</tbody>
										<tbody class="direction-table__body" v-show="showDetails">
											<tr v-for="ship in ships" :key="ship.id" :class="{'direction-table__tr-active' : ship.id === selectShip.id}">
												<th class="ta-left">{{ship.departureAndArrivalTime.departure}}</th>
												<th class="ta-left">{{ship.departureAndArrivalTime.arrival}}</th>
												<th class="ta-left">{{ship.pagetitle}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">{{ship.shipPlaces}}</span>
													</div>
												</th>
												<th class="fw-700">{{ship.departureAndArrivalTime.price}} ₽</th>
												<th 
													class="direction-table__select-ship" 
													@click.prevent="clickToSelectShip(ship)" 
													:class="{'direction-table_select-ship-active' : ship.id === selectShip.id}"
												>
													ВЫБРАТЬ
												</th>
											</tr>
										</tbody>
									</table>		
									<h2 v-if="loaded && !ships.length">На выбранную дату нет доступных теплоходов</h2>							
									<button v-if="loaded && ships.length > 3" class="btn-more-show" @click="clickToShow">{{!showDetails ? 'Показать еще' : 'Скрыть'}}</button>
								</div>
							</div>
	`,
	props: ['direction'],
	data: () => ({
		showDetails: false,
		selectShip: { id: null },
		dates: [],
		schedules: [],
		loaded: false,
	}),
	async mounted() {
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.dates = data.dates
		this.loaded = true
		if (this.direction === 'ТУДА') {
			this.dates.forEach(date => {
				this.schedules.push([...date.ships_schedule_there])
			})
		} else {
			this.dates.forEach(date => {
				this.schedules.push([...date.ships_schedule_back])
			})
		}
		this.schedules = [].concat(...this.schedules)
	},
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		alertSpan() {
			return this.$store.getters['getAlertSpan']
		},
		ships() {
			let result = []
			if (this.direction === 'ТУДА') {
				this.schedules.forEach(s => {
					if (
						moment(s.departureAndArrivalTime.date, 'DD-MM-YYYY').valueOf() ===
							moment(this.mainInfo.arrivalDate, 'DD-MM-YYYY').valueOf() &&
						s.route_id[0].start_dock.title === this.mainInfo.departurePoint
					) {
						s.shipType.ships.forEach(ship => {
							result.push({ ...s, ...ship })
						})
					}
				})
			} else {
				this.schedules.forEach(s => {
					if (
						moment(s.departureAndArrivalTime.date, 'DD-MM-YYYY').valueOf() ===
						moment(
							this.mainInfo.multiDay
								? this.mainInfo.departureDate
								: this.mainInfo.arrivalDate,
							'DD-MM-YYYY'
						).valueOf()
					) {
						s.shipType.ships.forEach(ship => {
							result.push({ ...s, ...ship })
						})
					}
				})
			}
			return result
		},
	},
	methods: {
		clickToShow() {
			this.showDetails = !this.showDetails
		},
		clickToSelectShip(ship) {
			if (!this.selectShip) {
				return (this.selectShip = ship)
			}
			if (this.selectShip.id === ship.id) {
				this.selectShip = { id: null }
			} else {
				this.selectShip = ship
			}
			this.$store.commit('setAlertSpan', '')
		},
	},
	watch: {
		selectShip() {
			if (this.direction === 'ОБРАТНО') {
				this.$store.commit('setShipBack', {
					id: this.selectShip.id,
					route_id: this.selectShip.route_id,
					pagetitle: this.selectShip.pagetitle,
					departureAndArrivalTime: this.selectShip.departureAndArrivalTime,
				})
			} else {
				this.$store.commit('setShipThere', {
					id: this.selectShip.id,
					route_id: this.selectShip.route_id,
					pagetitle: this.selectShip.pagetitle,
					departureAndArrivalTime: this.selectShip.departureAndArrivalTime,
				})
			}
		},
		alertSpan() {
			this.selectShip = { id: 0 }
		},
	},
	components: {
		CalendarSlider,
	},
}
