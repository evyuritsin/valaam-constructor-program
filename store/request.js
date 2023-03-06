const request = {
	state() {
		return {
			order: {
				tour_id: null,
				total_amount: 0,
				tours_prices_payments_types: [],
			},
			ships: [],
			placements: [],
			excursions: [],
			services: [],
			meals: [],
			tourists: [],
			client: {},
		}
	},
	mutations: {
		setTotalAmount(state, action) {
			state.order.total_amount = action
		},
		addPlacement(state, action) {
			const reservations = action.prices
			state.placements.push({
				room_schedule_id: action.id,
				reservations,
			})
		},
		removeAllPlacements(state) {
			state.placements = []
		},
		addShip(state, action) {
			const reservations = action.guests.map(guest => ({
				date: action.date,
				discount_category:
					guest.type === 'Взрослый' ? 1 : guest.type === 'Ребенок 7-12' ? 3 : 2,
				amount: action.amount,
			}))
			state.ships.push({ room_schedule_id: action.id, reservations })
		},
		removeAllShips(state) {
			state.ships = []
		},
		addExcursion(state, action) {
			const reservationsAdults = [...Array(action.tourist.adults)].map(i => ({
				date: action.date,
				discount_category: 1,
				amount: action.amount,
			}))
			const reservationsChildren = [...Array(action.tourist.children)].map(
				i => ({
					date: action.date,
					discount_category: 2,
					amount: action.amount,
				})
			)

			state.excursions.push({
				excursion_schedule_id: action.id,
				reservations: [...reservationsAdults, ...reservationsChildren],
			})
		},
		removeAllExcursions(state) {
			state.excursions = []
		},
		setMeals(state, guests) {
			let intermediateResult = []
			guests.forEach(guest => {
				guest.feed.schedules.forEach(schedule => {
					intermediateResult.push({
						...schedule,
						reservations: schedule.reservations.map(item => ({
							...item,
							discount_category:
								guest.type === 'Взрослый'
									? 1
									: guest.type === 'Ребенок 7-12'
									? 3
									: 2,
						})),
					})
				})
			})
			const result = []
			intermediateResult.forEach(item => {
				if (
					result.filter(i => i.meal_schedule_id === item.meal_schedule_id)
						.length
				) {
					result
						.filter(i => i.meal_schedule_id === item.meal_schedule_id)[0]
						.reservations.push(...item.reservations)
				} else {
					result.push({ ...item })
				}
			})
			state.meals = result
		},
		removeAllMeals(state) {
			state.meals = []
		},
		setTotalAmount(state, action) {
			state.order.total_amount = action
		},
		setTourists(state, action) {
			state.tourists = action
		},
		setRequestClient(state, action) {
			state.client = action
		},
	},
	getters: {
		getRequest(state) {
			return state
		},
	},
	actions: {},
}
