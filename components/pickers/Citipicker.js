const Citipicker = {
	template: /*html*/ `			
			<div class="popup popup__select geo-list hide" popupobject="" obj="" @click.prevent="click">
				<div class="select__item">Санкт-Петербург</div>
				<div class="select__item">Приозерск</div>
				<div class="select__item">Псков</div>
				<div class="select__item">Великий Новгород</div>
				<div class="select__item">Калуга</div>
			</div>`,
	props: ['click'],
}
