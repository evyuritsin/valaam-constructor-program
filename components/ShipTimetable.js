const ShipTimetable = {
	template: /*html*/ `
							<div class="program-designer__direction" >
								<div class="program-designer__direction-title" v-if="!mainInfo.departurePoint">
									{{direction}}
								</div>
								<div class="program-designer__direction-title" v-else-if="direction === 'ТУДА'">
									{{direction}}: {{mainInfo.departurePoint.dock_name}} — Валаам
								</div>
								<div class="program-designer__direction-title" v-else-if="direction === 'ОБРАТНО'">
									{{direction}}: Валаам — {{mainInfo.departurePoint.dock_name}} 
								</div>								
								<div class="program-designer__direction-content">
								<!-- <CalendarSlider :direction="direction"/> -->
									<table class="direction-table" v-if="ships.length">
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
										<tbody class="direction-table__body" v-if="!showDetails && ships.length > 3">
											<tr v-for="(ship, index) in [...Array(3)]" :key="index" >
												<th class="ta-left">{{ships[index].time_start}}</th>
												<th class="ta-left">{{ships[index].time_end}}</th>
												<th class="ta-left">{{getShipTitle(ships[index].prices[0].ship_id)}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">{{100}}</span>
													</div>
												</th>
												<th class="fw-700">{{ships[index].prices[0].amount}} ₽</th>
												<th 
													class="direction-table__select-ship w-15" 
													@click.prevent="clickToSelectShip(ships[index])" 
													:class="{'direction-table_select-ship-active' : ships[index].id === selectShip.id}"
												>
													{{ships[index].id === selectShip.id ? 'ВЫБРАНО' : 'ВЫБРАТЬ'}}
												</th>
											</tr>
										</tbody>
										<tbody class="direction-table__body" v-if="showDetails || ships.length < 3">
											<tr v-for="ship in ships" :key="ship.id">
												<th class="ta-left">{{ship.time_start}}</th>
												<th class="ta-left">{{ship.time_end}}</th>
												<th class="ta-left">{{getShipTitle(ship.prices[0].ship_id)}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">{{100}}</span>
													</div>
												</th>
												<th class="fw-700">{{ship.prices[0].amount}} ₽</th>
												<th 
													class="direction-table__select-ship w-15" 
													@click.prevent="clickToSelectShip(ship)" 
													:class="{'direction-table_select-ship-active' : ship.id === selectShip.id}"
												>
													{{ship.id === selectShip.id ? 'ВЫБРАНО' : 'ВЫБРАТЬ'}}
												</th>
											</tr>
										</tbody>
									</table>		
									<h2 v-if="!ships.length">На выбранную дату нет доступных теплоходов</h2>							
									<button v-if="ships.length > 3" class="btn-more-show" @click="clickToShow">{{!showDetails ? 'Показать еще' : 'Скрыть'}}</button>
								</div>
							</div>
	`,
	props: ['direction'],
	data: () => ({
		showDetails: false,
		selectShip: { id: null },
	}),
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		fetchShips() {
			return this.$store.getters['getFetchShips']
		},
		ships() {
			if (this.direction === 'ТУДА') {
				return this.fetchShips.schedules.filter(
					ship =>
						this.getShipRoutesDirectory(ship.route_id).direction_id === '1'
				)
			} else {
				return this.fetchShips.schedules.filter(
					ship =>
						this.getShipRoutesDirectory(ship.route_id).direction_id === '2'
				)
			}
		},
	},
	mounted() {
		this.selectShip = { id: null }
	},
	methods: {
		clickToShow() {
			this.showDetails = !this.showDetails
		},
		getShipRoutesDirectory(id) {
			return this.fetchShips.directory.routes[`route${id}`]
		},
		getShipDirectory(id) {
			return this.fetchShips.directory.ships[`ship${id}`]
		},
		getShipTitle(id) {
			return this.fetchShips.directory.ships[`ship${id}`].pagetitle
		},
		clickToSelectShip(ship) {
			if (!this.selectShip) {
				return (this.selectShip = { ...ship })
			}
			if (this.selectShip.id === ship.id) {
				this.selectShip = { id: null }
			} else {
				this.selectShip = { ...ship }
			}
			this.$store.commit('setAlertSpan', '')
		},
	},
	watch: {
		selectShip() {
			if (this.direction === 'ОБРАТНО') {
				this.$store.commit('setShipBack', {
					...this.selectShip,
					route: { ...this.getShipRoutesDirectory(this.selectShip.route_id) },
					ship: { ...this.getShipDirectory(this.selectShip.prices[0].ship_id) },
				})
			} else {
				this.$store.commit('setShipThere', {
					...this.selectShip,
					route: { ...this.getShipRoutesDirectory(this.selectShip.route_id) },
					ship: { ...this.getShipDirectory(this.selectShip.prices[0].ship_id) },
				})
			}
		},
	},
	components: {
		CalendarSlider,
	},
}
