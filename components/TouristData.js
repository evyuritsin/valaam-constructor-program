const TouristData = {
	template: /*html*/ `
	<div class="order-form__field order-form__group" v-if="guest.id">
									<div class="order-form__subtitle">{{guest.type}}</div>
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
													<input
														type="text"
														class="vp-input"
														v-model="guest.lastname"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !guest.lastname && validationErrors}"															
													/>
													<input
														type="text"
														class="vp-input"
														v-model="guest.firstname"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !guest.firstname && validationErrors}"															
													/>
													<input
														type="text"
														class="vp-input"
														v-model="guest.patronymic"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !guest.patronymic && validationErrors}"															
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														placeholder="Дата рождения*"
														:class="{'vp-input_invalid' : !guest.birth_date && validationErrors}"		
														v-model="guest.birth_date"	
														:name="'bdDate' + guest.id"				
													/>
												</div>
												<div className="relative flex-1" 	@click.stop="openDocumentsPicker">
													<input 
														type="text" 
														readonly 
														class="vp-input w-100 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !guest.document.type && validationErrors}" 
														placeholder="Тип документа*" 
														v-model="guest.document.type"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="guest.document.id"
														placeholder="Паспорт серия/номер*"
														:name="'passSN' + guest.id"
														:class="{'vp-input_invalid' : !guest.document.id && validationErrors}"															
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="guest.document.issued_by"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !guest.document.issued_by && validationErrors}"															
													/>												
												</div>
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input"
														:class="{'vp-input_invalid' : !guest.document.issue_date && validationErrors}"															
														placeholder="Дата выдачи*"
														v-model="guest.document.issue_date"
														:name="'iDate' + guest.id"				
													/>				
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														:class="{'vp-input_invalid' : !guest.phone && validationErrors}"															
														v-model="guest.phone"
														placeholder="Телефон*"
														:name="'telefon' + guest.id"
													/>												
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"														
														v-model="guest.comment"
														placeholder="Комментарий"
													/>												
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender">
											<div
												class="order-form__field-gender"
												:class="{'order-form_field-active' : guest.gender === 'male'}"
												@click='guest.gender = "male"'
											>
												М
											</div>
											<div 
												class="order-form__field-gender" 
												:class="{'order-form_field-active' : guest.gender === 'female'}"
												@click='guest.gender = "female"'
											>
												Ж
											</div>
										</div>
									</div>
								</div>
	`,
	props: ['validationErrors', 'id', 'index'],
	data: () => ({
		isDocumentsOpen: false,
		isBdDatepicker: false,
		isIssueDate: false,
	}),
	components: {
		Datepicker,
		Documentspicker,
	},
	mounted() {
		const guestId = this.guest.id
		//add masks
		$(`[name=bdDate${guestId}]`).mask('99.99.9999')
		$(`[name=iDate${guestId}]`).mask('99.99.9999')
		$(`[name=passSN${guestId}]`).mask('9999 999999')
		$(`[name=telefon${guestId}]`).mask('+7 (999) 999 99 99')

		const vm = this
		$(`[name=bdDate${guestId}]`).on('input', e => {
			vm.guest.birth_date = e.target.value
		})
		$(`[name=iDate${guestId}]`).on('input', e => {
			vm.guest.document.issue_date = e.target.value
		})
		$(`[name=passSN${guestId}]`).on('input', e => {
			vm.guest.document.id = e.target.value
		})
		$(`[name=telefon${guestId}]`).on('input', e => {
			vm.guest.phone = e.target.value
		})

		//add logic to close picker on click to out of theme
		document.addEventListener('click', function () {
			vm.closeDocumentsPicker()
			vm.closeBdDatepicker()
			vm.closeIssueDate()
		})
	},
	methods: {
		openDocumentsPicker() {
			if (this.isDocumentsOpen) return (this.isDocumentsOpen = false)
			this.isBdDatepicker = false
			this.isIssueDate = false

			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.guest.document.type = doc
		},
		closePrivilegesPicker() {
			this.isPrivilegesOpen = false
		},
		selectPrivilege(p) {
			this.guest.privilege = p
		},
		openBdDatepicker() {
			if (this.isBdDatepicker) return (this.isBdDatepicker = false)
			this.isDocumentsOpen = false
			this.isIssueDate = false

			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.guest.birth_date = date
		},
		openIssueDate() {
			if (this.isIssueDate) return (this.isIssueDate = false)
			this.isDocumentsOpen = false
			this.isBdDatepicker = false

			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.guest.document.issue_date = date
		},
	},
	computed: {
		guest: {
			get() {
				return this.$store.getters.getGuestById(this.id)[0]
			},
			set() {
				this.$store.commit('setGuest', { ...this.guest })
			},
		},
	},
}
