const Service = {
	template: /*html*/ `
								<div class="popular-list list-3 h-fit">
									<div class="popular-list__header">
										<img
											src="./img/popular_item_1.png"
											alt=""
											class="popular-list__img"
										/>
										<div class="popular-list__link">
											<div class="popular-list__title bg-while blue ta-center">
												{{title}}
											</div>
										</div>
									</div>
									<div class="popular-list__footer">
										<div class="popular-list__price flex-1 bg-blue">
											<span class="popular-list__price-value while"
												>{{price}} ₽</span
											>
										</div>
										<div class="popular-list__link flex-1" @click="clickToSelect">
											<div class="popular-list__btn w-100" :class="[isSelected && 'bg-orange']">{{!isSelected ? 'Выбрать' : 'Выбрано'}}</div>
										</div>
									</div>
								</div>
	`,
	data: () => ({
		isSelected: false,
	}),
	props: ['title', 'id', 'price'],
	methods: {
		clickToSelect() {
			this.isSelected = !this.isSelected
		},
	},
	watch: {
		isSelected() {
			if (this.isSelected) {
				this.$store.commit('addService', {
					title: this.title,
					id: this.id,
					price: this.price,
				})
			} else {
				this.$store.commit('removeService', this.id)
			}
		},
	},
}
