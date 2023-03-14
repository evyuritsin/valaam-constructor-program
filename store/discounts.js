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
	getters: {
		getLowestAmount: state => action => {
			const discounts = Object.values(state.discounts[action.type]).filter(
				item => item.discount_category_id == action.discount_category_id
			)

			const absDiscounts = discounts.filter(
				discount => discount.discount_type_id === '1'
			)
			const perDiscounts = discounts.filter(
				discount => discount.discount_type_id === '2'
			)

			const prices = []

			absDiscounts.forEach(item => {
				prices.push(Number(Number(action.amount) - item.discount))
			})

			perDiscounts.forEach(item => {
				prices.push(
					Number(Number(action.amount) - (action.amount / 100) * item.discount)
				)
			})

			return Math.min(...prices)
		},
	},
	actions: {},
}
