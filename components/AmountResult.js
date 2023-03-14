const AmountResult = {
	template: /* html */ `
							<div class="program-card">
								<div class="program-card__content">
									<div class="program-card__labels">
										<span class="program-card__label">Маршрут:</span>
										<span v-if="mainInfo.departurePoint" class="program-card__label"
											>{{mainInfo.departurePoint.dock_name}} — Валаам — {{mainInfo.departurePoint.dock_name}}</span
										>
										<span v-else class="program-card__label"
											>Не выбрано</span
										>										
									</div>
									<div class="program-card__labels">
										<span class="program-card__label">Даты поездки:</span>
										<span v-if="mainInfo.multiDay" class="program-card__label"
											>{{mainInfo.arrivalDate}} — {{mainInfo.departureDate}}</span
										>
										<span v-else-if="mainInfo.arrivalDate" class="program-card__label"
											>{{mainInfo.arrivalDate}}</span
										>
										<span v-else class="program-card__label"
											>Не выбрано</span
										>	
									</div>
									<div class="program-card__labels">
										<span class="program-card__label">Количество человек:</span>
										<span v-if="mainInfo.peopleAmount" class="program-card__label"
											>{{mainInfo.peopleAmount}}</span
										>
										<span v-else class="program-card__label"
											>Не выбрано</span
										>											
									</div>
									<div v-if="hotelRooms && mainInfo.multiDay" class="program-card__labels">
										<span class="program-card__label">Проживание:</span>
										<div className="program-card__label-container">
										<span v-for="(room, indx) in hotelRooms" :key="room.id" class="program-card__label"
											>{{room.directory.pagetitle}}
											<span v-if="indx !== hotelRooms.length-1">, </span>		
											</span
										>												
										<span v-if="!hotelRooms.length">Не выбрано</span>						
										</div>
									</div>
									<div v-if="ships.there.id" class="program-card__labels">
										<span class="program-card__label">Проезд туда:</span>
										<div className="program-card__label-container">
										<span class="program-card__label"
											>{{ships.there.ship.pagetitle}} отправление {{ships.there.time_start}}
										</span>																	
										</div>
									</div>
									<div v-if="ships.back.id" class="program-card__labels">
										<span class="program-card__label">Проезд обратно:</span>
										<div className="program-card__label-container">
										<span class="program-card__label"
											>{{ships.back.ship.pagetitle}} отправление {{ships.back.time_start}}
										</span>																	
										</div>
									</div>
									<div v-if="feedPrice" class="program-card__labels">
										<span class="program-card__label">Питание:</span>
										<div className="program-card__label-container">
										<span class="program-card__label"
											>{{breakfastAmount}} завтрака | {{lunchAmount}} обеда | {{dinnerAmount}} ужина
										</span>																	
										</div>
									</div>
									<div class="program-card__labels" v-if="excursions.length">
										<span class="program-card__label">Экскурсии:</span>
										<div className="program-card__label-container">
											<span class="program-card__label" v-for="excursion in excursions">{{excursion.pagetitle}} | {{excursion.date.date}} | {{excursion.tourist.adults}} взрослых и {{excursion.tourist.children}} детей</span>
										</div>
									</div>
								</div>
								<div class="program-card__footer">
									<div class="program-card__info">
										<div class="program-card__item" v-if="mainInfo.multiDay && accommodationsPrice">
											<span class="program-card__label">Проживание:</span>
											<span class="program-card__price"><b>{{accommodationsPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="shipsPrice">
											<span class="program-card__label">Теплоход:</span>
											<span class="program-card__price"><b>{{shipsPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="feedPrice">
											<span class="program-card__label">Питание:</span>
											<span class="program-card__price"><b>{{feedPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="excursions.length">
											<span class="program-card__label">Экскурсии:</span>
											<span class="program-card__price"><b>{{excursionsPrice}}</b> ₽</span>
										</div>
									</div>

									<div class="program-card__totals">
										<div class="program-card__paid mb-0">
											<div class="program-card__total">Сумма:</div>
											<div class="program-card__total-price">
												<b>{{totalPrice ? totalPrice : 0}}</b> ₽
											</div>
										</div>
									</div>
								</div>
							</div>
	`,
	computed: {
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		hotelRooms() {
			return this.$store.getters['getHotelRooms']
		},
		accommodationsPrice() {
			return this.$store.getters['getAccommodationsPrice']
		},
		ships() {
			return this.$store.getters['getShips']
		},
		shipsPrice() {
			const ships = this.$store.getters['getRequest'].ships
			let result = 0

			ships.forEach(ship => {
				ship.reservations.forEach(item => {
					result += Number(item.amount)
				})
			})
			return result
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		feedPrice() {
			return this.$store.getters['getFeedsPrice']
		},
		breakfastAmount() {
			return this.$store.getters['getBreakfastAmount']
		},
		lunchAmount() {
			return this.$store.getters['getLunchAmount']
		},
		dinnerAmount() {
			return this.$store.getters['getDinnerAmount']
		},
		excursions() {
			return this.$store.getters['getExcursions']
		},
		excursionsPrice() {
			return this.excursions.reduce(
				(sum, v) =>
					sum + Number(v.date.amount) * (v.tourist.adults + v.tourist.children),
				0
			)
		},
		totalPrice() {
			let result = 0
			if (this.accommodationsPrice) result += this.accommodationsPrice
			if (this.shipsPrice) result += this.shipsPrice
			if (this.feedPrice) result += this.feedPrice
			if (this.excursionsPrice) result += this.excursionsPrice
			if (this.servicesPrice) result += this.servicesPrice

			return result
		},
	},
}
