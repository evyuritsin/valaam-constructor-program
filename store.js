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
				firstName: '',
				lastName: '',
				middleName: '',
				gender: 'male',
				birthdayDate: '',
				document: {
					type: '',
					id: '',
					issuedBy: '',
					issueDate: '',
				},
				phone: '',
				email: '',
				add: '',
				isPilgrim: false,
			},
			totalPrice: 0,
			payments: [
				{
					payment_type: 1,
					payment_method: 3,
				},
			],
			alertSpan: '',
		}
	},
	mutations: {
		setMainInfo(state, action) {
			state.mainInfo = action
		},
		setGuests(state, action) {
			state.guests = action
		},
		setHotelRooms(state, action) {
			state.hotelRooms = action
		},
		setShipThere(state, action) {
			state.ships.there = action
		},
		setShipBack(state, action) {
			state.ships.back = action
		},
		setFeedsPrice(state, action) {
			state.feedsPrice = action
		},
		addExcursion(state, action) {
			state.excursions.push(action)
		},
		deleteExcursion(state, action) {
			state.excursions = state.excursions.filter(ex => ex.idEx !== action)
		},
		setExcursions(state, action) {
			state.excursions = action
		},
		addService(state, action) {
			state.services.push(action)
		},
		removeService(state, action) {
			state.services = state.services.filter(service => service.id !== action)
		},
		setServices(state, action) {
			state.services = action
		},
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
		setTotalPrice(state, action) {
			state.totalPrice = action
		},
	},
	getters: {
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
		getHotelRooms(state) {
			return state.hotelRooms
		},
		getAccommodationsPrice(state) {
			const days =
				moment(state.mainInfo.arrivalDate, 'DD-MM-YYY')
					.to(moment(state.mainInfo.departureDate, 'DD-MM-YYY'), true)
					.split(' ')[0] === 'a'
					? 1
					: moment(state.mainInfo.arrivalDate, 'DD-MM-YYY')
							.to(moment(state.mainInfo.departureDate, 'DD-MM-YYY'), true)
							.split(' ')[0]
			let result = 0
			state.hotelRooms.forEach(r => (result += Number(r.schedules[0].amount)))
			return result * days
		},
		getShips(state) {
			return state.ships
		},
		getFeedsPrice(state) {
			return state.feedsPrice
		},
		getExcursions(state) {
			return state.excursions
		},
		getServices(state) {
			return state.services
		},
		isSelectedService: state => id => {
			let result = false
			state.services.forEach(service => {
				if (service.id === id) result = true
			})
			return result
		},
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
})
