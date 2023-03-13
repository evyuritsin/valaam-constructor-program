const request = {
	state() {
		return {
			order: {
				tour_id: null,
				total_amount: 0,
				tours_prices_payments_types: [1, 4],
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
			state.ships.push({ ship_schedule_id: action.id, reservations })
		},
		removeAllShips(state) {
			state.ships = []
		},
		addExcursion(state, action) {
			const reservationsAdults = [...Array(action.tourist.adults)].map(i => ({
				...action.date,
				discount_category: 1,
			}))
			const reservationsChildren = [...Array(action.tourist.children)].map(
				i => ({
					...action.date,
					discount_category: 2,
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
		setMeals(state, { guests, arrivalTime, departureTime }) {
			let intermediateResult = []
			guests.forEach(guest => {
				guest.feed.schedules.forEach(schedule => {
					intermediateResult.push({
						...schedule,
						reservations: schedule.reservations
							.filter(r => {
								const mealTime = `${r.date} ${r.time}`

								const datetime_regex =
									/(\d\d)\.(\d\d)\.(\d\d\d\d)\s(\d\d):(\d\d)/

								const mealTime_array = datetime_regex.exec(mealTime)
								const mealTime_date = new Date(
									mealTime_array[3],
									mealTime_array[2],
									mealTime_array[1],
									mealTime_array[4],
									mealTime_array[5]
								)
								const arrivalTime_array = datetime_regex.exec(arrivalTime)
								const arrivalTime_date = new Date(
									arrivalTime_array[3],
									arrivalTime_array[2],
									arrivalTime_array[1],
									arrivalTime_array[4],
									arrivalTime_array[5]
								)
								const departureTime_array = datetime_regex.exec(departureTime)
								const departureTime_date = new Date(
									departureTime_array[3],
									departureTime_array[2],
									departureTime_array[1],
									departureTime_array[4],
									departureTime_array[5]
								)

								return (
									mealTime_date.toLocaleString() >
										arrivalTime_date.toLocaleString() &&
									mealTime_date.toLocaleString() <
										departureTime_date.toLocaleString()
								)
							})
							.map(item => ({
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
			state.meals = result.filter(meal => meal.reservations.length)
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
