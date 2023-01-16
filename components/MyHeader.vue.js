const MyHeader = {
	template: /*html*/ `
			<header class="header">
				<div class="header__row">
					<div class="header__top">
						<div class="header__phones">
							<span class="header__phone">
								<a class="header__phone-link" href="tel:+78129028611"
									>8 (812) 902-8611</a
								>
							</span>
							<span class="header__phone">
								<a class="header__phone-link" href="tel:+74992509799"
									>8 (499) 250-9799</a
								>
							</span>
						</div>
						<div class="header__logins">
							<div class="header__login">
								<img
									class="header__login-icon"
									src="./img/icon_login.png"
									alt="login icon"
								/>
								<a class="header__login-auth" href="javascript:void(0)"
									>Войти</a
								>
								/
								<a class="header__login-reg" href="javascript:void(0)"
									>Зарегистрироваться</a
								>
							</div>
							<div class="header__langs">
								<ul class="header__lang">
									<li class="header__lang-content">
										<img
											class="header__lang-icon"
											src="./img/icon_langs_rus.png"
											alt="lang list"
										/>
										<img
											class="header__lang-arrow"
											src="./img/icon_arrow_langs.png"
											alt="lang arrow"
										/>
										<ul class="header__langs-list">
											<li class="header__lang-item">
												<img
													class="header__lang-icon"
													src="./img/icon_langs_rus.png"
													alt="lang list"
												/>
												<img
													class="header__lang-arrow transform-180"
													src="./img/icon_arrow_langs.png"
													alt="lang arrow"
												/>
											</li>
											<li class="header__lang-item">
												<a class="header__lang-link" href="#">
													<img
														class="header__lang-icon"
														src="./img/icon_langs_fin.png"
														alt="lang list"
													/>
													<span class="header__lang-name">fi</span>
												</a>
											</li>
											<li class="header__lang-item">
												<a class="header__lang-link" href="#">
													<img
														class="header__lang-icon"
														src="./img/icon_langs_eng.png"
														alt="lang list"
													/>
													<span class="header__lang-name">en</span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="header__row">
					<div class="header-bottom">
						<img class="header-bottom__logo" src="./img/logo.svg" alt="logo" />
						<ul class="header-bottom__nav">
							<li class="header-bottom__submenu">
								<a class="header-bottom__link" href="#">Программы</a>
								<ul class="header-bottom__sub-menu">
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Расписание</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Однодневные</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Многодневные</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Индивидуальные</a
										>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Приходам</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Организованным группам</a
										>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Услуги</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Оставить заявку</a
										>
									</li>
								</ul>
							</li>
							<li class="header-bottom__submenu">
								<a class="header-bottom__link" href="#">На валааме</a>
								<ul class="header-bottom__sub-menu">
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Экскурсии</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Размещение</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Теплоходы</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Правила поведения в монастыре</a
										>
									</li>
								</ul>
							</li>
							<li class="header-bottom__submenu">
								<a class="header-bottom__link" href="#">Информация</a>
								<ul class="header-bottom__sub-menu">
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Условия оплаты
										</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">Реквизиты </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Возврат денежных средств
										</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"
											>Обучение экскурсоводов
										</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">
											Волонтёром на Валаам
										</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">
											Часто задаваемые вопросы
										</a>
									</li>
								</ul>
							</li>
							<li class="header-bottom__submenu">
								<a class="header-bottom__link" href="#">О нас</a>
								<ul class="header-bottom__sub-menu">
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#">
											Паломническая служба
										</a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Статьи </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Новости </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Подписка </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Вакансии </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Отзывы </a>
									</li>
									<li class="header-bottom__sub-item">
										<a class="header-bottom__sub-link" href="#"> Контакты </a>
									</li>
								</ul>
							</li>
							<li class="header-bottom__menu header-bottom_order">
								<a class="header-bottom__link" href="#">Заказ</a>
							</li>
						</ul>
					</div>
				</div>
			</header>`,
}
