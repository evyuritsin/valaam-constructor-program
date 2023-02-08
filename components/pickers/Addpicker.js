const Addpicker = {
	template: /*html*/ `
		<div class="picker w-100">
			<div class="select__item" v-for='add in adds' :key='add.id'  @click.stop="onClickToAdd(add.name)">{{add.name}}</div>
		</div>
	`,
	data: () => ({
		adds: [
			{ id: 1, name: 'Новости' },
			{ id: 2, name: 'Реклама' },
			{ id: 3, name: 'Соцсети' },
			{ id: 4, name: 'Радио' },
			{ id: 5, name: 'Интернет' },
			{ id: 6, name: 'Другое' },
		],
	}),
	methods: {
		onClickToAdd(add) {
			this.$emit('selectAdd', add)
			this.$emit('close')
		},
	},
}
