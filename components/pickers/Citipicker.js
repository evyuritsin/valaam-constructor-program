const Citipicker = {
	template: /*html*/ `			
			<div class="picker w-100">
				<div class="select__item" v-for="city in cities" :key="city" @click.stop="clickToCity(city)">{{city.dock_name}}</div>
			</div>`,
	props: ['cities'],
	methods: {
		clickToCity(city) {
			this.$emit('selectCity', city)
			this.$emit('close')
		},
	},
}
