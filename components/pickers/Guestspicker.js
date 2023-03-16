const Guestspicker = {
	template: /*html*/ `
			<div
				class="popup popup__composition count-list w-100 absolute picker"
				@click.stop
			>
				<div class="popup__composition-list">
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text">Взрослых</span>
						</div>
						<div class="index-form__input">
							<div class="index-form__btn-minus"  @click='deleteAdult'></div>
							<span class="index-form__value">{{guests.adults}}</span>
							<div class="index-form__btn-plus" @click='addAdult'></div>
						</div>
					</div>
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text">Дети от 0-6</span>
						</div>
						<div class="index-form__input">
							<div class="index-form__btn-minus" @click='deleteChildren06'></div>
							<span class="index-form__value">{{guests.children06}}</span>
							<div class="index-form__btn-plus"  @click='addChildren06'></div>
						</div>
					</div>
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text">Дети 7-12 лет</span>
						</div>
						<div class="index-form__input">
							<div class="index-form__btn-minus" @click='deleteChildren712'></div>
							<span class="index-form__value">{{guests.children712}}</span>
							<div class="index-form__btn-plus"  @click='addChildren712' ></div>
						</div>
					</div>
				</div>
				<button class="popup__composition-btn" @click.prevent="onClickToDone">Готово</button>
			</div>`,
	data: () => ({
		guests: {
			adults: 0,
			children06: 0,
			children712: 0,
		},
		maxValue: 50,
	}),
	methods: {
		addAdult() {
			if (this.guests.adults < this.maxValue) this.guests.adults++
		},
		deleteAdult() {
			if (this.guests.adults > 0) this.guests.adults--
		},
		addChildren06() {
			if (this.guests.children06 < this.maxValue) this.guests.children06++
		},
		deleteChildren06() {
			if (this.guests.children06 > 0) this.guests.children06--
		},
		addChildren712() {
			if (this.guests.children712 < this.maxValue) this.guests.children712++
		},
		deleteChildren712() {
			if (this.guests.children712 > 0) this.guests.children712--
		},
		onClickToDone() {
			this.$emit('setGuests', this.returnsString)
			this.$emit('close')
		},
	},
	mounted() {
		if (Object.values(this.guestsObject).filter(item => item).length) {
			this.guests.adults = Number(this.guestsObject['Взрослых'])
				? Number(this.guestsObject['Взрослых'])
				: 0
			this.guests.children06 = Number(this.guestsObject['Дети от 0-6'])
				? Number(this.guestsObject['Дети от 0-6'])
				: 0
			this.guests.children712 = Number(this.guestsObject['Дети 7-12 лет'])
				? Number(this.guestsObject['Дети 7-12 лет'])
				: 0
		}
	},
	computed: {
		returnsString() {
			const adults =
				this.guests.adults > 0 && `Взрослых - ${this.guests.adults}`
			const children06 =
				this.guests.children06 > 0 && `Дети от 0-6 - ${this.guests.children06}`
			const children712 =
				this.guests.children712 > 0 &&
				`Дети 7-12 лет - ${this.guests.children712}`

			const result = [adults, children06, children712].filter(item => item)
			return result.join(';')
		},
		guestsObject() {
			return this.$store.getters['getGuestsObject']
		},
	},
}
