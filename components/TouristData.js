const TouristData = {
	template: /*html*/ `
	<div class="order-form__field order-form__group" v-if="copyGuest.id">
									<div class="order-form__subtitle">{{guest.type}}</div>
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.lastName"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
													/>
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.firstName"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
													/>
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.middleName"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														placeholder="Дата рождения*"
														:class="{'vp-input_invalid' : !copyGuest.birthdayDate && validationErrors}"		
														readonly							
														v-model="copyGuest.birthdayDate"	
														@click="openBdDatepicker"				
													/>
													<Datepicker v-if="isBdDatepicker" @selectDate="selectBirthday" @close="closeBdDatepicker"/>
												</div>
												<div className="relative flex-1" 	@click="openDocumentsPicker">
													<input 
														type="text" 
														readonly 
														class="vp-input w-100 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !copyGuest.document.type && validationErrors}" 
														placeholder="Тип документа*" 
														v-model="copyGuest.document.type"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="copyGuest.document.id"
														placeholder="Паспорт серия/номер*"
														name="passSN"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="copyGuest.document.issuedBy"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
													/>												
												</div>
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
														placeholder="Дата выдачи*"
														v-model="copyGuest.document.issueDate"
														@click="openIssueDate"
														readonly
													/>				
													<Datepicker v-if="isIssueDate" @selectDate="selectIssueDate" @close="closeIssueDate"/>								
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														:class="{'vp-input_invalid' : !copyGuest.document.id && validationErrors}"															
														v-model="copyGuest.phone"
														placeholder="Телефон*"
														name="telefon"
													/>												
												</div>
												<div className="flex-1 relative" @click="openPrivilegesPicker">
													<input
														type="text"
														class="vp-input input__icon_right icon_arrowdown"
														placeholder="Право на льготы"
														v-model="copyGuest.privilege"
													/>
													<Privilegespicker v-if="isPrivilegesOpen" @selectPrivilege="selectPrivilege" @close="closePrivilegesPicker"/>													
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"														
														v-model="copyGuest.comment"
														placeholder="Комментарий"
													/>												
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender">
											<div
												class="order-form__field-gender order-form_field-active"
												@click="copyGuest.gender = 'male'"
											>
												М
											</div>
											<div class="order-form__field-gender" @click="copyGuest.gender = 'female'">Ж</div>
										</div>
									</div>
								</div>
	`,
	props: ['validationErrors', 'id', 'index'],
	data: () => ({
		copyGuest: {},
		isDocumentsOpen: false,
		isPrivilegesOpen: false,
		isBdDatepicker: false,
		isIssueDate: false,
	}),
	components: {
		Privilegespicker,
		Datepicker,
		Documentspicker,
	},
	mounted() {
		this.copyGuest = { ...this.$store.getters.getGuestById(this.id)[0] }
	},
	methods: {
		openDocumentsPicker() {
			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.copyGuest.document.type = doc
		},
		openPrivilegesPicker() {
			this.isPrivilegesOpen = true
		},
		closePrivilegesPicker() {
			this.isPrivilegesOpen = false
		},
		selectPrivilege(p) {
			this.copyGuest.privilege = p
		},
		openBdDatepicker() {
			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.copyGuest.birthdayDate = date
		},
		openIssueDate() {
			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.copyGuest.document.issueDate = date
		},
	},
	computed: {
		guest() {
			return this.$store.getters.getGuestById(this.id)[0]
		},
	},
	watch: {
		copyGuest: {
			handler() {
				if (this.copyGuest.name !== this.guest.name) {
					this.$store.commit('changeGuest', { ...this.copyGuest })
				}
			},
			deep: true,
		},
		guest: {
			handler() {
				this.copyGuest = { ...this.guest }
				console.log('copy', this.copyGuest, this.guest)
			},
			deep: true,
		},
	},
}
