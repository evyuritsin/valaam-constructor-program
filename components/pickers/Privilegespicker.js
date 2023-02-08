const Privilegespicker = {
	template: /*html*/ `
		<div class="picker w-100">
			<div class="select__item" v-for="p in privileges" :key="p.id" @click.stop="onClickToPrivilege(p.name)">{{p.name}}</div>
		</div>
	`,
	data: () => ({
		privileges: [
			{ id: 1, name: 'Студент' },
			{ id: 2, name: 'Инвалид' },
			{ id: 3, name: 'Пенсионер' },
		],
	}),
	methods: {
		onClickToPrivilege(p) {
			this.$emit('selectPrivilege', p)
			this.$emit('close')
		},
	},
}
