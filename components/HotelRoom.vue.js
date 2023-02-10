const HotelRoom = {
	template: /*html*/ `
<div class="placement-item" :class="[isSelectRoom && 'placement-item_selected']" >
	<div class="placement-item__gallery slider-for swiper">
		<div className="swiper-wrapper">
			<img
				v-for="image in room.images"
				:key="image.id"
				:src="'http://valaamskiy-polomnik.directpr.beget.tech' + image['sg_image']"
				:alt="image['sg_title']"
				class="placement-item__gallery-item swiper-slide"
			/>
		</div>
		<img src="../img/arrow_prev_slider.png" alt="btn prev" class="gallery__btn-prev" v-if="room.images.length > 1">
		<img src="../img/arrow_next_slider.png" alt="btn next" class="gallery__btn-next" v-if="room.images.length > 1">
	</div>
	<div class="placement-item__geo">
		<div class="icon-list pt-0">
			<!--img class="icon-list__icon while" src="./img/icons-svg/geo.svg" alt=""-->
			<svg
				class="icon-list__icon icon-h-16"
				viewBox="0 0 25 30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="while"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12.7005 5.53857C9.28007 5.53857 6.50692 8.15953 6.50692 11.3922C6.50692 14.6249 9.28007 17.2459 12.7005 17.2459C16.1209 17.2459 18.894 14.6249 18.894 11.3922C18.894 8.15953 16.1209 5.53857 12.7005 5.53857ZM9.17205 11.352C9.17205 9.53681 10.7354 8.0593 12.6559 8.0593C14.5777 8.0593 16.1396 9.53672 16.1398 11.3518C16.1407 13.178 14.6113 14.6849 12.7005 14.6849C10.7796 14.6849 9.17205 13.1673 9.17205 11.352Z"
					fill="#1D3054"
				/>
				<path
					class="while"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12.7774 0C6.21324 0 0.666626 5.27577 0.666626 11.5285C0.666626 14.805 2.27388 18.0836 4.36992 21.0866C6.29461 23.844 8.66192 26.4104 10.6529 28.5689L10.6885 28.6075C10.8565 28.7895 11.0217 28.9687 11.1837 29.1448C11.2288 29.1937 11.4226 29.3877 11.7128 29.5773C12.0183 29.7768 12.4742 30 13.0039 30H13.0779C13.6079 30 14.0627 29.7767 14.3674 29.5769C14.6764 29.3742 14.8727 29.1681 14.8942 29.1448C16.867 27.0014 19.3034 24.1526 21.2482 21.0726C23.1881 18.0005 24.6666 14.6557 24.6666 11.5285C24.6666 8.42354 23.5908 5.5411 21.5554 3.43081C19.5156 1.31602 16.5338 0 12.7774 0ZM3.3763 11.5285C3.3763 6.66818 7.68882 2.56052 12.7774 2.56052C15.9752 2.56052 18.2558 3.69008 19.7432 5.35521C21.2388 7.02951 21.9569 9.27404 21.9569 11.5285C21.9569 13.4915 21.2146 15.8119 19.6975 18.4811C18.2096 21.099 15.989 24.0306 13.0375 27.2587L12.6957 26.8872C10.7059 24.7298 8.37042 22.1965 6.53056 19.5339C4.68628 16.8649 3.3763 14.116 3.3763 11.5285Z"
					fill="#1D3054"
				/>
			</svg>
			<span class="icon-list__label while">{{hotel.pagetitle}}</span>
		</div>
	</div>
	<div class="placement-item__title">
		{{room.pagetitle}}
	</div>
	<div class="placement-item__desc">
		{{room.introtext}}
	</div>
	<div class="placement-item__prices">
		<div class="placement-item__price-label">
			Стоимость номера за весь период поездки
		</div>
		<div class="placement-item__price">
			<span class="placement-item__value">{{daysInTrip * room.schedules[0].amount}}</span>
			₽
		</div>
	</div>
	<div
		obj="habitation"
		class="placement-item__btn"
		:selectedOrder="isSelectRoom"
		@click="addRoom(room)"
	>
		{{isSelectRoom ? 'ОТМЕНИТЬ' : 'ДОБАВИТЬ В ЗАЯВКУ'}}
	</div>
	<div class="placement-item__included" v-if="room.facilities.length">
		<img
			v-for="item in room.facilities"
			:src="'http://valaamskiy-polomnik.directpr.beget.tech' +  item.iconPath"
			:alt="item.title"
			class="placement-item__icon"
		/>
	</div>
</div>
`,
	props: ['addRoom', 'room', 'allRooms', 'hotel'],
	computed: {
		isSelectRoom() {
			return this.allRooms.some(r => r.id === this.room.id)
		},
		mainInfo() {
			return this.$store.getters['getMainInfo']
		},
		daysInTrip() {
			return this.$store.getters['getDaysInTrip']
		},
	},
	mounted() {
		const swiper = new Swiper('.placement-item__gallery', {
			loop: true,
			navigation: {
				nextEl: '.gallery__btn-next',
				prevEl: '.gallery__btn-prev',
			},
			effect: 'fade',
		})
	},
}
