const Documentspicker = {
	template: /*html*/ `
		<div class="popup popup__select docs-list hide" popupobject="" obj="" @click.prevent='click'>
			<div class="select__item">Паспорт РФ</div>
			<div class="select__item">Свидетельство о рождении</div>
			<div class="select__item">Паспорт иностранца</div>
		</div>	
	`,
	props: ['click'],
}
