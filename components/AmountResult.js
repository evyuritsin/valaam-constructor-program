const AmountResult = {
	template: /* html */ `
							<div class="program-card">
								<div class="program-card__content">
									<div class="program-card__labels">
										<span class="program-card__label">Маршрут:</span>
										<span v-if="mainInfo.departurePoint" class="program-card__label"
											>{{mainInfo.departurePoint}} — Валаам — {{mainInfo.departurePoint}}</span
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
									<div v-if="hotelRooms" class="program-card__labels" v-if="mainInfo.multiDay">
										<span class="program-card__label">Проживание:</span>
										<div className="program-card__label-container">
										<span v-for="(room, indx) in hotelRooms" :key="room.id" class="program-card__label"
											>{{room.name}}
											<span v-if="indx !== hotelRooms.length-1">, </span>		
											</span
										>												
										<span v-if="!hotelRooms.length">Не выбрано</span>						
										</div>
									</div>
									<div v-if="ships.there.name" class="program-card__labels">
										<span class="program-card__label">Проезд туда:</span>
										<div className="program-card__label-container">
										<span class="program-card__label"
											>{{ships.there.name}} отправление {{ships.there.sailing}}
										</span>																	
										</div>
									</div>
									<div v-if="ships.back.name" class="program-card__labels">
										<span class="program-card__label">Проезд обратно:</span>
										<div className="program-card__label-container">
										<span class="program-card__label"
											>{{ships.back.name}} отправление {{ships.back.sailing}}
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
											<span class="program-card__label" v-for="excursion in excursions">{{excursion.title}} | {{excursion.date}} {{excursion.time}} | {{excursion.tourist.adults}} взрослых и {{excursion.tourist.children}} детей</span>
										</div>
									</div>
									<div class="program-card__labels" v-if="services.length">
										<span class="program-card__label">Дополнительно:</span>
										<div className="program-card__label-container">
											<span class="program-card__label" v-for="service in services">{{service.title}}</span>
										</div>
									</div>
								</div>
								<div class="program-card__footer">
									<div class="program-card__info">
										<div class="program-card__item" v-if="mainInfo.multiDay">
											<span class="program-card__label">Проживание:</span>
											<span class="program-card__price"><b>{{accommodationsPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="ships.there.price && ships.back.price">
											<span class="program-card__label">Теплоход:</span>
											<span v-if class="program-card__price"><b>{{shipsPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="feedPrice">
											<span class="program-card__label">Питание:</span>
											<span class="program-card__price"><b>{{feedPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="excursions.length">
											<span class="program-card__label">Экскурсии:</span>
											<span class="program-card__price"><b>{{excursionsPrice}}</b> ₽</span>
										</div>
										<div class="program-card__item" v-if="services.length">
											<span class="program-card__label">Допуслуги:</span>
											<span class="program-card__price"><b>{{servicesPrice}}</b> ₽</span>
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
			return this.ships.there.price + this.ships.back.price
		},
		guests() {
			return this.$store.getters['getGuests']
		},
		feedPrice() {
			let result = 0
			this.guests.forEach(guest => {
				result += guest.feed.graph.split(' + ').length * guest.feed.type * 500
			})
			return result ? Math.floor(result) : 0
		},
		breakfastAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.split(' + ').includes('Завтрак')) result++
			})
			return result
		},
		lunchAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (
					guest.feed.graph.split(' + ').includes('Обед') ||
					guest.feed.graph.split(' + ').includes('обед')
				)
					result++
			})
			return result
		},
		dinnerAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.split(' + ').includes('ужин')) result++
			})
			return result
		},
		excursions() {
			return this.$store.getters['getExcursions']
		},
		excursionsPrice() {
			return this.excursions.reduce(
				(sum, v) =>
					sum + Number(v.price) * (v.tourist.adults + v.tourist.children),
				0
			)
		},
		services() {
			return this.$store.getters['getServices']
		},
		servicesPrice() {
			return this.services.reduce((sum, v) => sum + Number(v.price), 0)
		},
		totalPrice() {
			return (
				this.accommodationsPrice +
				this.shipsPrice +
				this.feedPrice +
				this.excursionsPrice +
				this.servicesPrice
			)
		},
	},
}
