const request = {
	state() {
		return {
			order: {
				tour_id: null,
				total_amount: 0,
				tours_prices_payments_types: [],
			},
			ships: [],
			placements: [],
			excursions: [
				// Массив объектов
				{
					// Идентификатор экскурсии
					excursion_schedule_id: 1,
					// Список бронирований экскурсии по каждому туристу
					reservations: [
						// Массив объектов
						{
							// Дата экскурсии
							date: '16.02.2023',
							// Категория посетителей, например Взрослые
							discount_category: 1,
							// Общая стоимость
							amount: 150,
						},
						// ...
					],
				},
				// ...
			],
			services: [],
			meals: [
				{
					meal_schedule_id: 1,
					reservations: [
						{
							date: '16.02.2023',
							discount_category: 1,
							amount: 150,
						},
					],
				},
			],
			// Узел с перечнем данных по туристам
			tourists: [
				// Массив объектов
				{
					// Категория посетителей, например Взрослые
					discount_category: 1,
					// Имя
					firstname: 'Иван',
					// Отчество
					patronymic: 'Иванович',
					// Фамилия
					lastname: 'Иванов',
					// Пол (dictionary.other.genders)
					gender: 1,
					// Дата рождения
					birthdate: '09.02.2023',
					// Узел данных о документе
					document: {
						// Тип документа
						type: 'Свидетельство о рождении',
						// Серия/номер
						id: '1234 567890',
						// Орган, выдавший документа
						issued_by: 'asdadasdasdasdas',
						// Дата выдачи
						issue_date: '07.02.2023',
					},
					// Телефон
					phone: '123123123',
					// Email (хз, надо или нет)
					email: 'adadas@sadas.sad',
					// Комментарий
					comment: '',
				},
				// ...
			],
			// Узел с данными о заказчике (на кого регистрируется заявка)
			client: {
				// Категория посетителей, например Взрослые
				discount_category: 1,
				// Имя
				firstname: 'Иван',
				// Отчество
				patronymic: 'Иванович',
				// Фамилия
				lastname: 'Иванов',
				// Пол (dictionary.other.genders)
				gender: 1,
				// Дата рождения
				birthdate: '09.02.2023',
				// Узел данных о документе
				document: {
					// Тип документа
					type: 'Свидетельство о рождении',
					// Серия/номер
					id: '1234 567890',
					// Орган, выдавший документа
					issued_by: 'asdadasdasdasdas',
					// Дата выдачи
					issue_date: '07.02.2023',
				},
				// Телефон
				phone: '123123123',
				// Email
				email: 'adadas@sadas.sad',
				// ХЗ что такое, но это было в оригинальном input.json
				add: '',
				// Тоже ХЗ
				is_pilgrim: false,
			},
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
			state.ships.push({ room_schedule_id: action.id, reservations })
		},
		removeAllShips(state) {
			state.ships = []
		},
		addExcursion(state, action) {
			const reservationsAdults = [...Array(action.tourist.adults)].map(i => ({
				date: action.date,
				discount_category: 1,
				amount: action.amount,
			}))
			const reservationsChildren = [...Array(action.tourist.children)].map(
				i => ({
					date: action.date,
					discount_category: 2,
					amount: action.amount,
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
		setMeals(state, guests) {
			let intermediateResult = []
			guests.forEach(guest => {
				guest.feed.schedules.forEach(schedule => {
					intermediateResult.push({
						...schedule,
						reservations: schedule.reservations.map(item => ({
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
			state.meals = result
		},
		removeAllMeals(state) {
			state.meals = []
		},
		setTotalAmount(state, action) {
			state.order.total_amount = action
		},
	},
	getters: {
		getRequest(state) {
			return state
		},
	},
	actions: {},
}
