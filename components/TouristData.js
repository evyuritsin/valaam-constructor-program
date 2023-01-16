const TouristData = {
	template: /*html*/ `
	<div class="order-form__field order-form__group">
									<div class="order-form__subtitle">{{subtitle}}</div>
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														value=""
														placeholder="Фамилия*"
													/>
													<input
														type="text"
														class="vp-input ml-20"
														value=""
														placeholder="Имя*"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														value=""
														placeholder="Отчество*"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input flex-1"
														value=""
														placeholder="Дата рождения*"
														inputobj="123453234123453"
														showmodal="datepicker-lite"
													/>
													<input
														type="text"
														class="vp-input flex-1 input__icon_right icon_arrowdown ml-20"
														placeholder="Тип документа*"
														:inputobj="id+12343234345345"
														showmodal="docs-list"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														value=""
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
														value=""
														placeholder="Кем выдан*"
													/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input"
														value=""
														placeholder="Дата выдачи*"
														inputobj="5465654656456"
														showmodal="datepicker-lite"
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div class="order-form__field-contact-col flex-2">
													<input
														type="text"
														class="vp-input"
														value=""
														placeholder="Телефон*"
														name="telefon"
													/>
													<input
														type="text"
														class="vp-input input__icon_right icon_arrowdown ml-20"
														value=""
														placeholder="Право на льготы"
														:inputobj="id+12343223"
														showmodal="benefits-list"
													/>
													<Privilegespicker :click="clickToPrivileges"/>
												</div>
												<div class="order-form__field-contact-col flex-1 ml-20">
													<input
														type="text"
														class="vp-input flex-1"
														value=""
														placeholder="Комментарий"
													/>
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender ml-20">
											<div
												class="order-form__field-gender order-form_field-active"
											>
												М
											</div>
											<div class="order-form__field-gender">Ж</div>
										</div>
									</div>
								</div>
	`,
	props: ['subtitle', 'id'],
	components: {
		Privilegespicker,
	},
	methods: {
		clickToPrivileges() {
			$('.popup__blocked').click()
		},
	},
}
