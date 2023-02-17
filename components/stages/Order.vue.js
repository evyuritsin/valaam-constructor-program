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
														v-model="lastNameModel"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !client.lastName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="firstNameModel"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !client.firstName && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input flex-1"
														v-model="middleNameModel"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !client.middleName && validationErrors}"														
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														v-model="birthdayDateModel"
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
														v-model="documentTypeModel"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="documentIdModel"
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
														v-model="documentIssuedByModel"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !client.document.issuedBy && validationErrors}"	
													/>												
												</div>
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input input-datedocp"
														placeholder="Дата выдачи*"
														v-model="documentIssueDateModel"
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
														v-model="phoneModel"
														:class="{'vp-input_invalid' : !client.phone && validationErrors}"														
													/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="emailModel"
														placeholder="E-mail*"
														:class="{'vp-input_invalid' : !client.email && validationErrors}"														
													/>
												</div>
												<div className="flex-1 relative" @click.stop="openAddsPicker">
													<input 
														v-model="addModel" 
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
												class="order-form__field-gender"
												:class="{'order-form_field-active' : isMale}"
												@click='setMale'
											>
												М
											</div>
											<div 
												class="order-form__field-gender" 
												:class="{'order-form_field-active' : !isMale}"
												@click='setFemale'
											>
												Ж
											</div>
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
								<TouristData v-for="(guest, index) in guests" :key="guest.id" :id="guest.id" :validationErrors="validationErrors" :index="index" />
								<TotalResult />
								<div class="order-form__title">Способ оплаты</div>
								<div class="order-form__field pos-h">
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Категория оплаты</div>
										<div class="radiobox__label mt-20">
											<input name="categorypay" type="radio" id="rb_standard" class="radiobox" />
											<label for="rb_standard" class="radiobox__text">Стандартная</label>
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
											<input name="typepay" type="radio" id="rb_card" class="radiobox" />
											<label for="rb_card" class="radiobox__text">Картой он-лайн</label>
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
														<input type="checkbox" class="checkbox" id="cb_agree" checked />
														<label for="cb_agree" class="checkbox__text"
															>Я согласен с условиями передачи информации</label
														>
													</div>
													<div class="checkbox__label">
														<input type="checkbox" id="cb_sub" class="checkbox" />
														<label for="cb_sub" class="checkbox__text"
															>Подписаться на рассылку новостей</label
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
		isMale() {
			if (this.client.isPilgrim) {
				return this.firstGuest.gender === 'male' ? true : false
			} else {
				return this.client.gender === 'male' ? true : false
			}
		},
		firstGuest: {
			get() {
				return this.$store.getters.getGuestById(1)[0]
			},
			set() {
				this.$store.commit('setGuest', { ...this.firstGuest })
			},
		},
		client: {
			get() {
				return this.$store.getters['getClient']
			},
			set() {
				this.$store.commit('setClient', { ...this.client })
			},
		},
		lastNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.lastName
					: this.client.lastName
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.lastName = val)
					: (this.client.lastName = val)
			},
		},
		firstNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.firstName
					: this.client.firstName
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.firstName = val)
					: (this.client.firstName = val)
			},
		},
		middleNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.middleName
					: this.client.middleName
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.middleName = val)
					: (this.client.middleName = val)
			},
		},
		birthdayDateModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.birthdayDate
					: this.client.birthdayDate
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.birthdayDate = val)
					: (this.client.birthdayDate = val)
			},
		},
		documentTypeModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.type
					: this.client.document.type
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.type = val)
					: (this.client.document.type = val)
			},
		},
		documentIdModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.id
					: this.client.document.id
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.id = val)
					: (this.client.document.id = val)
			},
		},
		documentIssuedByModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.issuedBy
					: this.client.document.issuedBy
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.issuedBy = val)
					: (this.client.document.issuedBy = val)
			},
		},
		documentIssueDateModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.issueDate
					: this.client.document.issueDate
			},
			set() {
				this.client.isPilgrim
					? (this.firstGuest.document.issueDate = val)
					: (this.client.document.issueDate = val)
			},
		},
		phoneModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.phone : this.client.phone
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.phone = val)
					: (this.client.phone = val)
			},
		},
		emailModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.email : this.client.email
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.email = val)
					: (this.client.email = val)
			},
		},
		addModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.add : this.client.add
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.add = val)
					: (this.client.add = val)
			},
		},
		requestData() {
			return this.$store.getters['getRequestData']
		},
	},
	methods: {
		openDocumentsPicker() {
			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.client.isPilgrim
				? (this.firstGuest.document.type = doc)
				: (this.client.document.type = doc)
		},
		openAddsPicker() {
			this.isAddsOpen = true
		},
		closeAddsPicker() {
			this.isAddsOpen = false
		},
		selectAdd(add) {
			this.client.isPilgrim
				? (this.firstGuest.add = add)
				: (this.client.add = add)
		},
		openBdDatepicker() {
			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.client.isPilgrim
				? (this.firstGuest.birthdayDate = date)
				: (this.client.birthdayDate = date)
		},
		openIssueDate() {
			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.client.isPilgrim
				? (this.firstGuest.document.issueDate = date)
				: (this.client.document.issueDate = date)
		},
		setMale() {
			this.client.isPilgrim
				? (this.firstGuest.gender = 'male')
				: (this.client.gender = 'male')
		},
		setFemale() {
			this.client.isPilgrim
				? (this.firstGuest.gender = 'female')
				: (this.client.gender = 'female')
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
			$.ajax({
				url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/',
				method: 'post',
				dataType: 'json',
				data: { data: JSON.stringify(this.requestData) },
				success: function (data) {
					console.log(data)
					window.location.href = data['data']['data']['formUrl']
				},
			})
		},
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
	},
	mounted() {
		//coping guests
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
				if (this.client.isPilgrim) {
					this.$store.commit('changeGuest', {
						id: 1,
						...this.firstGuest,
						...this.client,
					})
				}
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
