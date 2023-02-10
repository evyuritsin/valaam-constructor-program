const Service = {
	template: /*html*/ `
								<div class="popular-list list-3 h-fit">
									<div class="popular-list__header">
										<img
											:src="'http://valaamskiy-polomnik.directpr.beget.tech' + service.images[0]['sg_image']"
											:alt="service.images[0]['sg_title']"
											class="popular-list__img"
										/>
										<div class="popular-list__link">
											<div class="popular-list__title bg-while blue ta-center">
												{{service.pagetitle}}
											</div>
										</div>
									</div>
									<div class="popular-list__footer">
										<div class="popular-list__price flex-1 bg-blue">
											<span class="popular-list__price-value while"
												>{{service.price}} ₽</span
											>
										</div>
										<div class="popular-list__link flex-1" @click="clickToSelect">
											<div class="popular-list__btn w-100" :class="[isSelected && 'bg-orange']">{{!isSelected ? 'Выбрать' : 'Выбрано'}}</div>
										</div>
									</div>
								</div>
	`,
	props: ['service'],
	methods: {
		clickToSelect() {
			if (!this.isSelected) {
				this.$store.commit('addService', {
					...this.service,
				})
			} else {
				this.$store.commit('removeService', this.service.id)
			}
		},
	},
	computed: {
		services() {
			return this.$store.getters['getServices']
		},
		isSelected() {
			return this.$store.getters.isSelectedService(this.service.id)
		},
	},
}
