const Datapicker = {
	template: /*html*/ `
		<div
			class="popup popup__datepicker datepicker datepicker-lite hide"
			popupobject=""
			:obj="obj"
			ref="datapicker"
			@click="click"
		>
			<div class="datepicker__header bg-while" @click.stop>
				<div class="datepicker_prev-btn datepicker-lite__prev-btn" ></div>
				<div
					class="datepicker_label datepicker-lite__header-label"
					month="11"
					year="2022"
				>
					Декабрь 2022
				</div>
				<div class="datepicker_next-btn datepicker-lite__next-btn"></div>
			</div>
			<div class="datepicker__body border-none" @click="click">
				<div class="datepicker__date datepicker_another-month">26</div>
				<div class="datepicker__date datepicker_another-month">27</div>
				<div class="datepicker__date datepicker_another-month">28</div>
				<div class="datepicker__date datepicker_another-month">29</div>
				<div class="datepicker__date datepicker_another-month">30</div>
				<div class="datepicker__date">1</div>
				<div class="datepicker__date">2</div>
				<div class="datepicker__date">3</div>
				<div class="datepicker__date">4</div>
				<div class="datepicker__date">5</div>
				<div class="datepicker__date">6</div>
				<div class="datepicker__date">7</div>
				<div class="datepicker__date">8</div>
				<div class="datepicker__date">9</div>
				<div class="datepicker__date">10</div>
				<div class="datepicker__date">11</div>
				<div class="datepicker__date">12</div>
				<div class="datepicker__date">13</div>
				<div class="datepicker__date">14</div>
				<div class="datepicker__date">15</div>
				<div class="datepicker__date">16</div>
				<div class="datepicker__date">17</div>
				<div class="datepicker__date">18</div>
				<div class="datepicker__date">19</div>
				<div class="datepicker__date">20</div>
				<div class="datepicker__date">21</div>
				<div class="datepicker__date">22</div>
				<div class="datepicker__date">23</div>
				<div class="datepicker__date">24</div>
				<div class="datepicker__date">25</div>
				<div class="datepicker__date">26</div>
				<div class="datepicker__date">27</div>
				<div class="datepicker__date">28</div>
				<div class="datepicker__date">29</div>
				<div class="datepicker__date">30</div>
				<div class="datepicker__date">31</div>
				<div class="datepicker__date datepicker_another-month">1</div>
				<div class="datepicker__date datepicker_another-month">2</div>
				<div class="datepicker__date datepicker_another-month">3</div>
				<div class="datepicker__date datepicker_another-month">4</div>
				<div class="datepicker__date datepicker_another-month">5</div>
				<div class="datepicker__date datepicker_another-month">6</div>
			</div>
		</div>
		<div
			class="popup popup__datepicker datepicker datepicker-prog p-15 hide"
			popupobject=""
			obj=""
			@click.stop
		>
			<div class="datepicker__header br-20">
				<div class="datepicker_prev-btn datepicker__prev-btn"></div>
				<div
					class="datepicker_label datepicker__header-label"
					month="11"
					year="2022"
				>
					Декабрь 2022
				</div>
				<div class="datepicker_next-btn datepicker__next-btn" ></div>
			</div>
			<div class="datepicker__body border-none p-0" @click="click">
				<div class="datepicker__date datepicker_another-month">26</div>
				<div class="datepicker__date datepicker_another-month">27</div>
				<div class="datepicker__date datepicker_another-month">28</div>
				<div class="datepicker__date datepicker_another-month">29</div>
				<div class="datepicker__date datepicker_another-month">30</div>
				<div class="datepicker__date">1</div>
				<div class="datepicker__date">2</div>
				<div class="datepicker__date">3</div>
				<div class="datepicker__date">4</div>
				<div class="datepicker__date">5</div>
				<div class="datepicker__date">6</div>
				<div class="datepicker__date">7</div>
				<div class="datepicker__date">8</div>
				<div class="datepicker__date">9</div>
				<div class="datepicker__date">10</div>
				<div class="datepicker__date">11</div>
				<div class="datepicker__date">12</div>
				<div class="datepicker__date">13</div>
				<div class="datepicker__date">14</div>
				<div class="datepicker__date">15</div>
				<div class="datepicker__date">16</div>
				<div class="datepicker__date">17</div>
				<div class="datepicker__date">18</div>
				<div class="datepicker__date">19</div>
				<div class="datepicker__date">20</div>
				<div class="datepicker__date">21</div>
				<div class="datepicker__date">22</div>
				<div class="datepicker__date">23</div>
				<div class="datepicker__date">24</div>
				<div class="datepicker__date">25</div>
				<div class="datepicker__date">26</div>
				<div class="datepicker__date">27</div>
				<div class="datepicker__date">28</div>
				<div class="datepicker__date">29</div>
				<div class="datepicker__date">30</div>
				<div class="datepicker__date">31</div>
				<div class="datepicker__date datepicker_another-month">1</div>
				<div class="datepicker__date datepicker_another-month">2</div>
				<div class="datepicker__date datepicker_another-month">3</div>
				<div class="datepicker__date datepicker_another-month">4</div>
				<div class="datepicker__date datepicker_another-month">5</div>
				<div class="datepicker__date datepicker_another-month">6</div>
			</div>
			<div class="datepicker__footer p-0">
				<div class="datepicker__status">
					<div class="datepicker__point bg-green"></div>
					<span class="datepicker__point-label">Много</span>
				</div>
				<div class="datepicker__status">
					<div class="datepicker__point bg-orange"></div>
					<span class="datepicker__point-label">Мало</span>
				</div>
				<div class="datepicker__status">
					<div class="datepicker__point bg-red"></div>
					<span class="datepicker__point-label">Закончились</span>
				</div>
			</div>
		</div>
	`,
	props: ['click', 'obj'],
}
