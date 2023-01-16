const Peoplepicker = {
	template: /*html*/ `
			<div
				class="popup popup__composition count-list hide"
				popupobject=""
				obj=""
			>
				<div class="popup__composition-list">
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text">Взрослых</span>
						</div>
						<div class="index-form__input" minValue="0" maxValue="6">
							<div class="index-form__btn-minus"></div>
							<span class="index-form__value">0</span>
							<div class="index-form__btn-plus"></div>
						</div>
					</div>
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text" value="0-6">Дети от 0-6</span>
						</div>
						<div class="index-form__input" minValue="0" maxValue="3">
							<div class="index-form__btn-minus"></div>
							<span class="index-form__value">0</span>
							<div class="index-form__btn-plus"></div>
						</div>
					</div>
					<div class="index-form">
						<div class="index-form__label">
							<span class="index-form__text" value="7-12">Дети 7-12 лет</span>
						</div>
						<div class="index-form__input" minValue="0" maxValue="3">
							<div class="index-form__btn-minus"></div>
							<span class="index-form__value">0</span>
							<div class="index-form__btn-plus"></div>
						</div>
					</div>
					<!--div class="index-form">
				<div class="index-form__label">
					<span class="index-form__text">Возраст ребёнка</span>
				</div>
				<div class="index-form__input">
					<select class="index-form__select">
						<option value="1">До 7 лет</option>
						<option value="2">От 7 до 14 лет</option>
						<option value="3">Старше 14 лет</option>
					</select>
				</div>
			</div-->
				</div>
				<button class="popup__composition-btn" @click.prevent="click">Готово</button>
			</div>`,

	props: ['click'],
}
