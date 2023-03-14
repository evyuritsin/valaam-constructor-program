const discounts = {
	state() {
		return {
			discounts: {},
		}
	},
	mutations: {
		setDiscounts(state, action) {
			state.discounts = { ...action }
		},
	},
	getters: {},
	actions: {
		getLowestAmount({ state }, action) {
			console.log(state.discounts[action.type])
		},
	},
}
