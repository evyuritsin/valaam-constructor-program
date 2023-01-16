const Order = {
	template: /*html*/ `
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__content">
							<div class="order-form">
								<div class="order-form__title">Данные заказчика</div>
								<div class="order-form__field">
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														v-model="client.lastName"
														placeholder="Фамилия*"
													/>
													<input
														type="text"
														class="vp-input ml-20"
														v-model="client.firstName"
														placeholder="Имя*"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.middleName"
														placeholder="Отчество*"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input flex-1 flatpickr-input"
														placeholder="Дата рождения*"
														inputobj="515151515151"
														showmodal="datepicker-lite"
													/>
													<Datapicker :obj="515151515151" :click="onClickDatapicker"/>
													<input
														type="text"
														class="vp-input flex-1 input__icon_right icon_arrowdown ml-20"
														placeholder="Тип документа*"
														inputobj="1234567890987654321"
														showmodal="docs-list"
													/>
													<Documentspicker />
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.document.id"
														placeholder="Паспорт серия/номер*"
														name="passSN"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														v-model="client.document.issuedBy"
														placeholder="Кем выдан*"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input"
														placeholder="Дата выдачи*"
														inputobj="31313131313"
														showmodal="datepicker-lite"
													/>
													<Datapicker :obj="31313131313" :click="onClickDatapicker"/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														placeholder="Телефон*"
														name="telefon"
														v-model="client.phone"
													/>
													<input
														type="text"
														class="vp-input ml-20"
														v-model="client.email"
														placeholder="E-mail*"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input input__icon_right icon_arrowdown flex-1"
														placeholder="Откуда о нас узнали"
														showmodal="findout-list"
														inputobj="90909090"
													/>
													<Addpicker />
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender ml-20">
											<div
												class="order-form__field-gender order-form_field-active"
												@click='client.gender = "male"'
											>М</div>
											<div class="order-form__field-gender" @click='client.gender = "female"'>Ж</div>
										</div>
									</div>
								</div>
								<div class="checkbox__label mt-10">
									<input type="checkbox" class="checkbox" checked="" />
									<span class="checkbox__text"
										>Заказчик является Паломником</span
									>
								</div>
								<div class="order-form__title">Данные туристов</div>
									<TouristData v-for="guest in copyGuests" :key="guest.id" :subtitle="guest.type" :id="guest.id"/>
								<TotalResult />
								<div class="order-form__title">Способ оплаты</div>
								<div class="order-form__field pos-h">
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Категория оплаты</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Стандартная</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Пожертвование</span>
										</div>
										<div class="order-form__help mt-20">
											<a href="#" class="order-form__help-link">Справка</a>
										</div>
									</div>
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Тип платежа</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">Картой он-лайн</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">По счету</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">Наличными в офисе</span>
										</div>
									</div>
								</div>
								<div class="order-form__field pos-h">
								<div className=" d-flex justify-between items-center w-full">
								<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
								<div class="order-form__pay-group">
										<div class="order-form__footer">
											<div class="order-form__agreement">
												<div class="checkbox__label">
													<input type="checkbox" class="checkbox" checked />
													<span class="checkbox__text"
														>Я согласен с условиями передачи информации</span
													>
												</div>
												<div class="checkbox__label">
													<input type="checkbox" class="checkbox" />
													<span class="checkbox__text"
														>Подписаться на рассылку новостей</span
													>
												</div>
											</div>
											<button class="vp-btn flex-1" @click="clickToOrder">Оплатить</button>
										</div>
									</div>
								</div>
									
								</div>
							</div>
						</div>`,
	data: () => ({
		copyGuests: [],
		client: {
			firstName: '',
			lastName: '',
			middleName: '',
			gender: 'male',
			birthdayDate: '',
			document: {
				type: '',
				id: '',
				issuedBy: '',
				issueDate: '',
			},
			phone: '',
			email: '',
			add: '',
			isPilgrim: false,
		},
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
	},
	methods: {
		onClickDatapicker() {},
		clickToOrder() {},
		clickToPervStage() {
			$emit('clickToPerv')
		},
	},
	mounted() {
		//add masks
		$('[name=passSN]').mask('9999 999999')
		$('[name=telefon]').mask('+7 (999) 999 99 99')
		//coping guests
		this.copyGuests = this.$store.getters['getGuests']
	},
	components: {
		AmountResult,
		TouristData,
		TotalResult,
		Datapicker,
		Documentspicker,
		Privilegespicker,
		Addpicker,
	},
}
