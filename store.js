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
			client: {},
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
			state.excursions = state.excursions.filter(ex => ex.id !== action)
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
				client.id === action.id ? { ...action } : { ...client }
			)
		},
	},
	getters: {
		getMainInfo(state) {
			return state.mainInfo
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
			let result = 0
			state.hotelRooms.forEach(r => (result += Number(r.price)))
			return result
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
		getClient(state) {
			return state.client
		},
		getGuestById: state => id => {
			return state.guests.filter(guest => guest.id === id)
		},
	},
})
