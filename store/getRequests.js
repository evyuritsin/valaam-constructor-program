const getRequests = {
	state() {
		return {}
	},
	mutations: {},
	getters: {},
	actions: {
		async fetchFirstStage(ctx, data) {
			const response = await fetch(
				'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/firstStage',
				{
					method: 'POST',
					data: JSON.stringify({ ...data }),
				}
			)
			console.log(response)
		},
	},
}
