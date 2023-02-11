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
													<input
														type="text"
														class="vp-input"
														v-model="client.lastName"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !client.lastName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="client.firstName"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !client.firstName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.middleName"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !client.middleName && validationErrors}"														
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														v-model="client.birthdayDate"
														placeholder="Дата рождения*"
														@click.stop="openBdDatepicker"
														:class="{'vp-input_invalid' : !client.birthdayDate && validationErrors}"		
													/>
													<Datepicker v-if="isBdDatepicker" @selectDate="selectBirthday" @close="closeBdDatepicker"/>
												</div>
												<div className="relative flex-1" 	@click.stop="openDocumentsPicker">
													<input 
														type="text" 
														readonly 
														class="vp-input w-100 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !client.document.type && validationErrors}" 
														placeholder="Тип документа*" 
														v-model="client.document.type"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="client.document.id"
														placeholder="Паспорт серия/номер*"
														name="passSN"
														:class="{'vp-input_invalid' : !client.document.id && validationErrors}"															
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="client.document.issuedBy"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !client.document.issuedBy && validationErrors}"	
													/>												
												</div>
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input input-datedocp"
														placeholder="Дата выдачи*"
														v-model="client.document.issueDate"
														:class="{'vp-input_invalid' : !client.document.issueDate && validationErrors}"						
														readonly									
														@click.stop="openIssueDate"
													/>									
													<Datepicker v-if="isIssueDate" @selectDate="selectIssueDate" @close="closeIssueDate"/>			
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														placeholder="Телефон*"
														name="telefon"
														v-model="client.phone"
														:class="{'vp-input_invalid' : !client.phone && validationErrors}"														
													/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="client.email"
														placeholder="E-mail*"
														:class="{'vp-input_invalid' : !client.email && validationErrors}"														
													/>
												</div>
												<div className="flex-1 relative" @click.stop="openAddsPicker">
													<input 
														v-model="client.add" 
														class="vp-input input__icon_right icon_arrowdown" 
														placeholder="Откуда узнали о нас" 
														readonly
													/>
													<Addpicker v-if="isAddsOpen" @selectAdd="selectAdd" @close="closeAddsPicker"/>
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender">
											<div
												class="order-form__field-gender order-form_field-active"
												@click='client.gender = "male"'
											>М</div>
											<div class="order-form__field-gender" @click='client.gender = "female"'>Ж</div>
										</div>
									</div>
								</div>
								<div class="checkbox__label mt-10">
									<input type="checkbox" class="checkbox" v-model="client.isPilgrim" />
									<span class="checkbox__text"
										>Заказчик является Паломником</span
									>
								</div>
								<div class="order-form__title">Данные туристов</div>
								<TouristData v-for="(guest, index) in copyGuests" :key="guest.id" :id="guest.id" :validationErrors="validationErrors" :index="index"/>
								<TotalResult />
								<div class="order-form__title">Способ оплаты</div>
								<div class="order-form__field pos-h">
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Категория оплаты</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Стандартная</span>
										</div>
							<!--  <div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" class="radiobox" />
											<span class="radiobox__text">Пожертвование</span>
										</div> -->
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
									<!-- 	<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">По счету</span>
										</div>
										<div class="radiobox__label mt-20">
											<input name="typepay" type="radio" class="radiobox" />
											<span class="radiobox__text">Наличными в офисе</span>
										</div> -->
									</div>
								</div>
								<div class="order-form__field pos-h align-items-center">
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
		isDocumentsOpen: false,
		isAddsOpen: false,
		validationErrors: false,
		isBdDatepicker: false,
		isIssueDate: false,
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
		originalClient() {
			return this.$store.getters['getClient']
		},
		requestData() {
			return this.$store.getters['getRequestData']
		},
	},
	methods: {
		onClickDatapicker(e) {
			setTimeout(() => {
				$('.popup__blocked').click()
			}, 0)
		},
		openDocumentsPicker() {
			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.client.document.type = doc
		},
		openAddsPicker() {
			this.isAddsOpen = true
		},
		closeAddsPicker() {
			this.isAddsOpen = false
		},
		selectAdd(add) {
			this.client.add = add
		},
		openBdDatepicker() {
			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.client.birthdayDate = date
		},
		openIssueDate() {
			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.client.document.issueDate = date
		},
		async clickToOrder() {
			if (
				!this.originalClient.firstName ||
				!this.originalClient.lastName ||
				!this.originalClient.middleName ||
				!this.originalClient.birthdayDate ||
				!this.originalClient.document.type ||
				!this.originalClient.document.id ||
				!this.originalClient.document.issuedBy ||
				!this.originalClient.document.issueDate ||
				!this.originalClient.phone ||
				!this.originalClient.email
			) {
				return (this.validationErrors = true)
			}
			this.guests.forEach(guest => {
				Object.keys(guest).forEach(key => {
					if (key === 'comment' || key === 'privilege') return
					if (!guest[key]) return (this.validationErrors = true)
				})
			})
			console.log(JSON.stringify(this.requestData))
			await fetch(
				'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/',
				{
					method: 'POST',
					body: JSON.stringify(this.requestData),
				}
			)
		},
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
	},
	mounted() {
		//coping guests
		this.copyGuests = [...this.$store.getters['getGuests']]
		const vm = this
		document.addEventListener('click', function () {
			vm.closeDocumentsPicker()
			vm.closeAddsPicker()
			vm.closeBdDatepicker()
			vm.closeIssueDate()
		})
	},
	watch: {
		client: {
			handler() {
				this.$store.commit('setClient', { ...this.client })
				if (this.client.isPilgrim) {
					this.$store.commit('changeGuest', { id: 1, ...this.client })
				} else {
					this.$store.commit('changeGuest', {
						id: 1,
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
					})
				}
			},
			deep: true,
		},
		guests: {
			handler() {
				this.copyGuests = [...this.$store.getters['getGuests']]
			},
			deep: true,
		},
	},
	components: {
		AmountResult,
		TouristData,
		TotalResult,
		Documentspicker,
		Privilegespicker,
		Addpicker,
		Datepicker,
	},
}
