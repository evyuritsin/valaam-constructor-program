const getRequests = {
	state() {
		return {}
	},
	mutations: {},
	getters: {},
	actions: {
		async fetchFirstStage(ctx, inputsData) {
			const formData = new FormData()

			formData.append('date_start', inputsData.arrivalDate)
			formData.append('date_end', inputsData.departureDate)
			formData.append('tourist_count', inputsData.guestsCount)
			formData.append(
				'dock_departure_id',
				inputsData.departurePoint.start_dock_id
			)

			const response = await fetch(
				'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/firstStage',
				{
					method: 'POST',
					body: formData,
				}
			).then(r => r.json())
			console.log(response)
		},
	},
}
