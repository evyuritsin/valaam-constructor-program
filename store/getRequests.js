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

			const response = await $.ajax({
				url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/firstStage/',
				method: 'post',
				dataType: 'json',
				data: { data: JSON.stringify(formData) },
				success: data => data,
			})
			console.log(response)
		},
	},
}
