const ShipTimetable = {
	template: /*html*/ `
							<div class="program-designer__direction">
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
									<CalendarSlider :direction="direction"/>
									<table class="direction-table">
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
											<tr v-for="(ship, index) in [...Array(3)]" :key="index">
												<th class="ta-left">{{ships[index].sailing}}</th>
												<th class="ta-left">{{ships[index].arrival}}</th>
												<th class="ta-left">{{ships[index].name}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">много мест</span>
													</div>
												</th>
												<th class="fw-700">{{ships[index].price}} ₽</th>
												<th class="direction-table__select-ship" @click.prevent="clickToSelectShip(ships[index])">ВЫБРАТЬ</th>
											</tr>
										</tbody>
										<tbody class="direction-table__body" v-show="showDetails">
											<tr v-for="ship in ships" :key="ship.id">
												<th class="ta-left">{{ship.sailing}}</th>
												<th class="ta-left">{{ship.arrival}}</th>
												<th class="ta-left">{{ship.name}}</th>
												<th class="ta-left">
													<div class="find-list__date-item ml-0">
														<div class="find-list__point find-list_green"></div>
														<span class="find-list__date">много мест</span>
													</div>
												</th>
												<th class="fw-700">{{ship.price}}</th>
												<th class="direction-table__select-ship" @click.prevent="clickToSelectShip(ship)">ВЫБРАТЬ</th>
											</tr>
										</tbody>
									</table>
									<button  class="btn-more-show" @click="clickToShow">{{!showDetails ? 'Показать еще' : 'Скрыть'}}</button>
								</div>
							</div>
	`,
	props: ['direction'],
	data: () => ({
		showDetails: false,
		selectShip: null,
		ships: [
			{
				id: 1,
				name: '«Северный Афон»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
			{
				id: 2,
				name: '«Преподобный Серафим»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
			{
				id: 3,
				name: '«Андрей Первозванный»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
			{
				id: 4,
				name: '«Северный Афон»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
			{
				id: 5,
				name: '«Преподобный Серафим»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
			{
				id: 6,
				name: '«Андрей Первозванный»',
				sailing: '09:00',
				arrival: '11:00',
				price: 2000,
			},
		],
	}),
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
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
				this.selectShip = null
			} else {
				this.selectShip = ship
			}
		},
	},
	watch: {
		selectShip() {
			if (this.direction === 'ОБРАТНО') {
				this.$store.commit('setShipBack', { ...this.selectShip })
			} else {
				this.$store.commit('setShipThere', { ...this.selectShip })
			}
		},
	},
	components: {
		CalendarSlider,
	},
}
