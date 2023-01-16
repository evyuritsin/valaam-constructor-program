const Privilegespicker = {
	template: /*html*/ `
		<div class="popup popup__select benefits-list hide" popupobject="" obj="" @click="click">
			<div class="select__item">Студент</div>
			<div class="select__item">Инвалид</div>
			<div class="select__item">Пенсионер</div>
		</div>
	`,
	props: ['click'],
}
