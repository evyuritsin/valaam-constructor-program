const Excursions = {
	template: /*html*/ `	
						<div class="program-designer__content">
							<div class="list">
								<Excursion v-for="excursion in excursions" :key="excursion.id" :excursion="excursion"/>
							</div>
						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>
`,
	data: () => ({
		excursions: [
			{
				id: 1,
				title: 'Экскурсия 1',
				description:
					'Для православного человека Валаамская обитель, с сонмом святых подвижников и старцев, с подворьями, скитами и пустынями, необыкновенно красивой природой, отделенная от мира ладожскими водами, является настоящим «Русским Северным Афоном».',
				schedule: [
					{ date: '21.01', time: '11:00', id: 1 },
					{ date: '21.01', time: '15:00', id: 2 },
					{ date: '21.01', time: '19:00', id: 3 },
					{ date: '22.01', time: '10:00', id: 4 },
				],
				time: '2,5 часа',
				price: 2000,
			},
			{
				id: 2,
				title: 'Экскурсия 2',
				description:
					'Для православного человека Валаамская обитель, с сонмом святых подвижников и старцев, с подворьями, скитами и пустынями, необыкновенно красивой природой, отделенная от мира ладожскими водами, является настоящим «Русским Северным Афоном».',
				schedule: [
					{ date: '21.01', time: '11:00', id: 5 },
					{ date: '21.01', time: '15:00', id: 6 },
					{ date: '21.01', time: '19:00', id: 7 },
					{ date: '22.01', time: '10:00', id: 8 },
				],
				time: '1,5 часа',
				price: 1000,
			},
		],
	}),
	computed: {
		selectExcursions() {
			return this.$store.getters['getExcursions']
		},
	},
	methods: {
		clickToPervStage() {
			if (this.selectExcursions.length) {
				this.$store.commit('setExcursions', [])
			}
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			this.$emit('clickToNext')
		},
	},
	components: {
		AmountResult,
		Excursion,
	},
}
