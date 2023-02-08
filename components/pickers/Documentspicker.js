const Documentspicker = {
	template: /*html*/ `
		<div class="picker w-100">
			<div class="select__item" v-for='type in types' :key="type.id" @click.stop="onClickToDoc(type.name)">{{type.name}}</div>
		</div>	
	`,
	data: () => ({
		types: [
			{ id: 1, name: 'Паспорт РФ' },
			{ id: 2, name: 'Свидетельство о рождении' },
			{ id: 3, name: 'Паспорт иностранца' },
		],
	}),
	methods: {
		onClickToDoc(type) {
			this.$emit('selectDoc', type)
			this.$emit('close')
		},
	},
}
