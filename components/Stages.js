const Stages = {
	template: /*html*/ `
							<div class="program-designer__stages">
								<div className="program-designer__stage" v-for="stage in stages" :key="stage.id">
									<div className="program-designer__stage-item" v-if="stage.id <= selectId">
										<div class="program-designer__stage-subitem program-designer_active-line"></div>
										<div class="program-designer__stage-subitem" :class="[stage.id < selectId && 'program-designer_active-line']"></div>
										<div class="program-designer__stage-circle program-designer_completed-circle" v-if="stage.id < selectId">
										</div>
										<div class="program-designer__stage-circle program-designer_active-circle" v-else>{{selectId}}</div>
									</div>
									<div className="program-designer__stage-item" v-else>
										<div class="program-designer__stage-subitem"></div>
										<div class="program-designer__stage-subitem"></div>
										<div class="program-designer__stage-circle">{{stage.id}}</div>
									</div>
									<div v-if="stage.id < selectId" class="program-designer__stage-label program-designer_completed-label">{{stage.name}}</div>
									<div v-else-if="stage.id === selectId" class="program-designer__stage-label program-designer_active-label">{{stage.name}}</div>
									<div v-else class="program-designer__stage-label">{{stage.name}}</div>
								</div>
							</div>
							<h4 class="red" v-if="alertSpan">{{alertSpan}}</h4>
							<h4 v-if="mainInfo.multiDay ? selectId === 4 : selectId === 2" class="green">Детям до 6 лет проход на любую экскурсию - бесплатно</h4>
	`,
	data: () => ({
		stages: [
			{ id: 1, name: 'Теплоход' },
			{ id: 2, name: 'Экскурсии' },
			{ id: 3, name: 'Дополнительные услуги' },
			{ id: 4, name: 'Оформление' },
		],
	}),
	props: ['selectId'],
	computed: {
		alertSpan() {
			return this.$store.getters['getAlertSpan']
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
	},
	watch: {
		mainInfo(val) {
			if (val.multiDay) {
				this.stages = [
					{ id: 1, name: 'Теплоход' },
					{ id: 2, name: 'Проживание' },
					{ id: 3, name: 'Питание' },
					{ id: 4, name: 'Экскурсии' },
					{ id: 5, name: 'Дополнительные услуги' },
					{ id: 6, name: 'Оформление' },
				]
			} else {
				this.stages = [
					{ id: 1, name: 'Теплоход' },
					{ id: 2, name: 'Экскурсии' },
					{ id: 3, name: 'Дополнительные услуги' },
					{ id: 4, name: 'Оформление' },
				]
			}
		},
	},
}
