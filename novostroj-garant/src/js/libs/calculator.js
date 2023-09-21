document.addEventListener('DOMContentLoaded', () => {
	// ФУНКЦИЯ ДЛЯ SELECT И КАЛЬКУЛЯТОРА
	function select() {
		const stItem = document.querySelectorAll('.form .js-select-btn'),
			stText = document.querySelectorAll('.form .js-select-list'),
			inputSelect = document.querySelectorAll('.js-input-select'),
			stListItem = document.querySelectorAll('.form .js-select-item');

		// ЗАКРЫТИЕ ВСЕХ СПИСКОВ SELECT
		stText.forEach((e) => { e.classList.add('overflow-hidden') });

		// ДОБАВЛЕНИЕ ЗНАЧЕНИЯ В INPUT
		inputSelect.forEach(e => {
			e.value = e.parentNode.parentNode.querySelector('.js-select-btn-text').textContent;
		});

		// ОТКРЫТИЕ SELECT
		stItem.forEach((e) => {

			e.addEventListener('click', () => {
				const stContent = e.nextElementSibling;


				if (stContent.style.maxHeight) {
					document.querySelectorAll('.form .js-select-list').forEach(e => {
						e.style.maxHeight = null
						e.classList.remove('active');
					});
					e.classList.remove('active');
				} else {
					document.querySelectorAll('.form .js-select-list').forEach(e => {
						e.style.maxHeight = null;
						e.previousElementSibling.classList.remove('active');
					}
					);
					stContent.style.maxHeight = stContent.scrollHeight + 'px';
					e.classList.add('active');
				}
			});

		});

		// ДОБАВЛЕНИЕ ЗНАЧЕНИЯ ИЗ СПИСКА SELECT В INPUT И КНОПКУ ОТКРЫТИЯ
		stListItem.forEach(e => {
			e.addEventListener('click', () => {
				calculator(valueInput);
				const btn = e.parentNode.parentNode.querySelector('.js-select-btn-text'),
					inputSelect = e.parentNode.parentNode.querySelector('.js-input-select'),
					eText = e.textContent;

				btn.textContent = eText;
				inputSelect.value = eText;

				calculator(valueInput)

				document.querySelectorAll('.form .js-select-list').forEach(e => (e.style.maxHeight = null));
				btn.parentNode.classList.remove('active');
			});
		});

		// ДОБАВЛЕНИЕ МЕТРАЖА В ФУНКЦИЮ calculator
		let valueInput = parseInt(document.querySelector('.js-input').value);
		let input = document.querySelector('.js-input');
		if (input.value === '' || input.value === -1 || input.value === NaN) {
			valueInput = 0
			calculator(valueInput)
		}
		input.addEventListener('input', () => {
			if (input.value === '' || input.value === -1 || input.value === NaN) {
				valueInput = 0
				calculator(valueInput)
			} else {
				valueInput = parseInt(input.value)
				calculator(valueInput)
			}
		});

		// ФУНКЦИЯ КАЛЬКУЛЯТОРА
		function calculator(inputValue) {
			// ПЕРЕМЕННЫЕ ДЛЯ РАСЧЁТА
			let summa = 0,
				valueInput,
				arrayValueInput = [],
				floors,
				doors,
				net,
				finishing,
				front;

			// ФИКСИРОВАННАЯ СТОИМОСТЬ
			const $FLOOR_ONE = 32000,
				$FLOOR_TWO = 29000,
				$DOORS_TOREX = 0,
				$DOORS_OTHER = 30000,
				$NET_NOT = 0,
				$NET_EL = 100000,
				$NET_WELL = 100000,
				$DOORS_SEPTIC = 50000,
				$NOT_FINISHING = 0,
				$FINISHING_ONE = 4000,
				$FINISHING_TWO = 5000,
				$NOT_FRONT = 0,
				$YES_FRONT = 1000;

			// ДОБАВЛЕНИЕ ЗНАЧЕНИЕ В INPUT
			inputSelect.forEach(e => {
				valueInput = e.parentNode.parentNode.querySelector('.js-select-btn-text').textContent;
				let normalizeSting = valueInput.replace(/\s/g, '');
				arrayValueInput.push(normalizeSting);
			});

			// УСЛОВИЯ ДЛЯ КАЛЬКУЛЯТОРА
			arrayValueInput.forEach(e => {
				// ЭТАЖИ
				if (e === '1этаж') {
					floors = $FLOOR_ONE;
					finishing = $FINISHING_ONE;
				} else if (e === '2этаж') {
					floors = $FLOOR_TWO;
					finishing = $FINISHING_TWO;
				};
				// ДВЕРИ
				if (e === 'Torex') {
					doors = $DOORS_TOREX;
				} else if (e === 'Cтерморазрывом') {
					doors = $DOORS_OTHER;
				};
				// СЕТИ
				if (e === 'Безсетей') {
					net = $NET_NOT;
				} else if (e === 'Электричество') {
					net = $NET_EL;
				} else if (e === 'Скважина') {
					net = $NET_WELL;
				} else if (e === 'Септик') {
					net = $DOORS_SEPTIC;
				};
				// БЕЗ ОТДЕЛКИ
				if (e === 'Безотделки') {
					finishing = $NOT_FINISHING;
				}
				// ФАСАД
				if (e === 'Безфасада') {
					front = $NOT_FRONT;
				} else if (e === 'Каменнаявата') {
					front = $YES_FRONT;
				};
			});

			// ФОРМУЛА РАСЧЁТА
			summa = (floors + finishing + front) * inputValue + doors + net

			// ДОБАВЛЕНИЕ ЗНАЧЕНИЯ В DOM
			document.querySelector('.summa__number').textContent = `${summa} ₽`
		}
		calculator(valueInput)
	}

	// ОТКРЫТИЕ INPUT ПО НАЖАТИЮ НА КНОПКУ В КАЛЬКУЛЯТОРЕ
	function submitCalculator() {
		const wrap = document.getElementById('submit-wrap'),
			btnOpen = document.getElementById('submit-calculator'),
			btnForm = document.getElementById('form-calculator-btn'),
			form = document.getElementById('form-calculator');

		btnOpen.addEventListener('click', e => {
			e.currentTarget.classList.add('hidden');
			wrap.style.maxHeight = '100%';
			form.classList.add('open');
		});

		btnForm.addEventListener('click', () => {
			btnOpen.classList.remove('hidden');
			wrap.style.maxHeight = '60px';
			form.classList.remove('open');
		});
	}

	if (document.querySelector('#calculator')) {
		select();
		submitCalculator()
	};
})
