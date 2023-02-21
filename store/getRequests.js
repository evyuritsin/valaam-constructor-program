const getRequests = {
	state() {
		return {}
	},
	mutations: {},
	getters: {},
	actions: {
		async fetchFirstStage(ctx, inputsData) {
			const formData = {
				date_start: inputsData.arrivalDate,
				date_end: inputsData.departureDate,
				tourist_count: inputsData.guestsCount,
				dock_departure_id: inputsData.departurePoint.start_dock_id,
			}

			const response = await fetch(
				'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/firstStage',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					body: JSON.stringify({ data: formData }),
				}
			).then(r => r.json())
			console.log(response)
		},
	},
}
