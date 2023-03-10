const { createStore } = Vuex

const store = createStore({
	state() {
		return {
			mainInfo: {
				multiDay: false,
				arrivalDate: '',
				departureDate: '',
				peopleAmount: '',
				departurePoint: '',
			},
			guests: [],
			hotelRooms: [],
			ships: {
				there: { price: 0 },
				back: { price: 0 },
			},
			feedsPrice: 0,
			excursions: [],
			services: [],
			client: {
				firstname: '',
				lastname: '',
				patronymic: '',
				gender: 'male',
				birth_date: '',
				document: {
					type: '',
					id: '',
					issued_by: '',
					issue_date: '',
				},
				phone: '',
				email: '',
				add: '',
				isPilgrim: false,
			},
			alertSpan: '',
		}
	},
	mutations: {
		//main
		setMainInfo(state, action) {
			state.mainInfo = action
		},
		setGuests(state, action) {
			state.guests = action
		},
		//habitation
		setHotelRooms(state, action) {
			state.hotelRooms = action
		},
		//ships
		setShipThere(state, action) {
			state.ships.there = action
		},
		setShipBack(state, action) {
			state.ships.back = action
		},
		//feed
		setFeedsPrice(state, action) {
			state.feedsPrice = action
		},
		//excursions
		addExcursion(state, action) {
			state.excursions.push(action)
		},
		deleteExcursion(state, action) {
			state.excursions = state.excursions.filter(
				ex => ex.excursion_id !== action
			)
		},
		setExcursions(state, action) {
			state.excursions = action
		},
		//order
		setClient(state, action) {
			state.client = action
		},
		changeGuest(state, action) {
			state.guests = state.guests.map(client =>
				client.id === action.id ? { ...client, ...action } : { ...client }
			)
		},
		setAlertSpan(state, action) {
			state.alertSpan = action
		},
	},
	getters: {
		//main
		getMainInfo(state) {
			return state.mainInfo
		},
		getDaysInTrip(state) {
			return moment(state.mainInfo.arrivalDate, 'DD-MM-YYY')
				.to(moment(state.mainInfo.departureDate, 'DD-MM-YYY'), true)
				.split(' ')[0] === 'a'
				? 1
				: moment(state.mainInfo.arrivalDate, 'DD-MM-YYY')
						.to(moment(state.mainInfo.departureDate, 'DD-MM-YYY'), true)
						.split(' ')[0]
		},
		getGuests(state) {
			return state.guests
		},
		getGuestsObject(state) {
			const people = state.mainInfo.peopleAmount.split(';')
			let result = {}
			people.forEach(p => (result[p.split(' - ')[0]] = p.split(' - ')[1]))
			return result
		},
		//habitations
		getHotelRooms(state) {
			return state.hotelRooms
		},
		getAccommodationsPrice(state) {
			let result = 0
			state.hotelRooms.forEach(room => {
				let roomPrice = room.prices.reduce(
					(sum, price) => sum + price.amount,
					0
				)
				if (room.per_person) roomPrice = roomPrice * state.guests.length
				result += roomPrice
			})
			return result
		},
		//ships
		getShips(state) {
			return state.ships
		},
		//feed
		getBreakfastAmount(state) {
			let result = 0
			state.guests.forEach(guest => {
				if (guest.feed.graph.title.split(' + ').includes('Завтрак')) result++
			})
			return result
		},
		getLunchAmount(state) {
			let result = 0
			state.guests.forEach(guest => {
				if (guest.feed.graph.title.split(' + ').includes('Обед')) result++
			})
			return result
		},
		getDinnerAmount(state) {
			let result = 0
			state.guests.forEach(guest => {
				if (guest.feed.graph.title.split(' + ').includes('Ужин')) result++
			})
			return result
		},
		getFeedsPrice(state) {
			function personalPrice(g) {
				const guest = state.guests.filter(guest => guest.id === g.id)[0]
				let result = 0
				guest.feed.schedules.forEach(item => {
					result += item.reservations.reduce((sum, r) => sum + r.amount, 0)
				})
				return result
			}

			return state.guests.reduce((sum, guest) => sum + personalPrice(guest), 0)
		},
		//excursions
		getExcursions(state) {
			return state.excursions
		},
		//order
		getClient(state) {
			return state.client
		},
		getGuestById: state => id => {
			return state.guests.filter(guest => guest.id === id)
		},
		getRequestData(state) {
			return state
		},
		getAlertSpan(state) {
			return state.alertSpan
		},
	},
	modules: {
		getFetchRequests,
		request,
	},
})
