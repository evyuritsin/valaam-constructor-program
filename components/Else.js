const Else = {
	template: /*html*/ `
	<div id="m-login" class="modals modal login hide">
			<a href="javascript:void(0)" class="modal__close-link">
				<img src="./img/icon_modal_close.png" alt="" class="modal__close" />
			</a>
			<form class="modal__form" action="/">
				<div class="modal__forms">
					<div class="modal__caption">Вход</div>
					<input
						type="text"
						class="modal_username modal__input"
						placeholder="Телефон или email"
					/>
					<span class="modal__invalid-msg hide">Не верный ввод</span>
					<input
						type="password"
						class="modal_password modal__input"
						placeholder="Пароль"
					/>
					<span class="modal__invalid-msg hide">Не верный пароль</span>
					<div class="modal__options">
						<div class="checkbox__label">
							<input type="checkbox" class="checkbox" checked />
							<span class="checkbox__text">Запомнить пароль</span>
						</div>
						<button type="button" class="modal__forgot">Забыли пароль?</button>
					</div>
					<button class="modal__submit">Войти</button>
				</div>
				<div class="modal__info">
					<div class="modal__title">Нет аккаунта?</div>
					<div class="modal__desc">
						На вашу почту будет отправлена инструкция с дальнейшими действиями.
					</div>
					<a href="javascript:void(0)" class="modal__btn">ЗАРЕГИСТРИРОВАТЬСЯ</a>
				</div>
			</form>
		</div>
		<div id="m-register" class="modals modal register hide">
			<a href="javascript:void(0)" class="modal__close-link">
				<img
					src="./img/icon_modal_close_black.png"
					alt=""
					class="modal__close"
				/>
			</a>
			<form class="modal__form" action="/">
				<div class="modal__info modal_br-left">
					<div class="modal__title">Есть аккаунт?</div>
					<div class="modal__desc">
						Если вы зарегистрированы и у вас есть аккаунт, то нажмите кнопку
					</div>
					<a href="javascript:void(0)" class="modal__btn">Войти</a>
				</div>
				<div class="modal__forms">
					<div class="modal__caption">Регистрация</div>
					<div class="modal__subtitle">Для физических лиц</div>
					<input
						type="text"
						class="modal_username modal__input"
						placeholder="Имя"
					/>
					<input
						type="email"
						class="modal_email modal__input"
						placeholder="Email"
					/>
					<input
						type="phone"
						class="modal_phone modal__input"
						placeholder="Телефон"
					/>
					<div class="modal__options modal_pos-v">
						<div class="checkbox__label">
							<input type="checkbox" class="checkbox" checked />
							<span class="checkbox__text"
								>Я согласен с условиями передачи информации</span
							>
						</div>
						<div class="checkbox__label">
							<input type="checkbox" class="checkbox" checked />
							<span class="checkbox__text"
								>Подписаться на рассылку новостей</span
							>
						</div>
					</div>
					<button class="modal__submit">Зарегистрироваться</button>
				</div>
			</form>
		</div>
		<div class="modals modal recovery-password hide">
			<a href="javascript:void(0)" class="modal__close-link">
				<img
					src="./img/icon_modal_close_black.png"
					alt=""
					class="modal__close"
				/>
			</a>
			<form class="modal__form" action="/">
				<div class="modal__forms">
					<div class="modal__caption">Восстановление пароля</div>
					<input
						type="email"
						class="modal_email modal__input"
						placeholder="Email"
					/>
					<div class="modal__captcha"></div>
					<div class="modal__desc gray">
						Это легко исправить! Заполните личные данные и добро пожаловать к
						нам!
					</div>
					<button class="modal__submit">ВОССТАНОВИТЬ ПАРОЛЬ</button>
				</div>
			</form>
		</div>
		<div class="modal__blocked hide"></div>
		<div class="popup__blocked hide"></div>
		<div class="popup popup__listing duration-list hide" popupobject="" obj="">
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Один день</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Два дня</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Три дня</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Четыре дня</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Пять дней</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Шесть дней</span>
			</div>
			<div class="checkbox__label">
				<input type="checkbox" class="checkbox" />
				<span class="checkbox__text">Семь дней и более</span>
			</div>
		</div>
		<div class="popup popup__listing radiobox-list hide" popupobject="" obj="">
			<div class="radiobox__label">
				<input type="radio" class="radiobox" />
				<span class="radiobox__text">Один день</span>
			</div>
			<div class="radiobox__label">
				<input type="radio" class="radiobox" />
				<span class="radiobox__text">Два дня</span>
			</div>
		</div>




		<div class="modals modal edit-order hide">
			<div class="edit-order__content">
				<div class="buy-tickets-form__title">Редактировать ЗАЯВКУ</div>
				<input
					type="text"
					class="search__filter icon_date flatpickr-input active"
					value=""
					placeholder="Дата поездки"
					showmodal="datepicker-prog"
					inputobj="29816"
					readonly
					data=""
				/>
				<div class="index-form">
					<div class="index-form__label">
						<span class="index-form__text">Взрослые</span>
						<span class="index-form__text">6 000 ₽</span>
					</div>
					<div class="index-form__input" minValue="0" maxValue="6">
						<div class="index-form__btn-minus"></div>
						<span class="index-form__value">1</span>
						<div class="index-form__btn-plus"></div>
					</div>
				</div>
				<div class="index-form">
					<div class="index-form__label">
						<span class="index-form__text">Дети 7-12 лет</span>
						<span class="index-form__text">3 000 ₽</span>
					</div>
					<div class="index-form__input" minValue="0" maxValue="6">
						<div class="index-form__btn-minus"></div>
						<span class="index-form__value">1</span>
						<div class="index-form__btn-plus"></div>
					</div>
				</div>
				<div class="index-form">
					<div class="index-form__label">
						<span class="index-form__text">Дети 0-6 лет</span>
						<span class="index-form__text">0 ₽</span>
					</div>
					<div class="index-form__input" minValue="0" maxValue="6">
						<div class="index-form__btn-minus"></div>
						<span class="index-form__value">1</span>
						<div class="index-form__btn-plus"></div>
					</div>
				</div>
				<div class="buy-tickets-form__total">
					<span class="buy-tickets-form__total-label">Итого</span>
					<span class="buy-tickets-form__price">15 000 ₽</span>
				</div>
				<button class="vp-btn">Сохранить</button>
				<div class="edit-order__close">
					<img src="./img/icon_modal_close_red.png" alt="close" />
				</div>
			</div>
		</div>`,
}
