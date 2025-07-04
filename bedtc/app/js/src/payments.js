$('body').on('click', '#select-currency .select__head', function() {
	$('#select-currency').toggleClass('active');
});

$('body').on('click', '#select-currency .select__body .item', function() {
	$('#select-currency').removeClass('active');
});

function calculateReplenishmentResultSum(current_currency) {
	replenishment_amount.value = replenishment_amount.value.replace(/,/g, '.');

	current_currency = $('#replenish_select_currency input[type="radio"]:checked').val();

	let enter_money = parseFloat(replenishment_amount.value.replace(/,/g, '.'));
	if (isNaN(enter_money)) {
		enter_money = 0;
	}
	let money_get = 0;

	if (current_currency == 'USD') {
		money_get = (enter_money / rates.currency_ratio).toFixed(rates.money_accuracy);
	} else if (current_currency == 'RUB') {
		money_get = (enter_money / rates.currency_ratio / rates.currency_usd).toFixed(rates.money_accuracy);
	} else if (current_currency == 'BTC') {
		// money_get = (enter_money / rates.currency_ratio * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
		money_get = enter_money.toFixed(rates.money_accuracy);
	} else if (current_currency == 'LTC') {
		money_get = (enter_money / rates.currency_ratio / rates.currency_ltc_to_btc * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
	} else if (current_currency == 'DASH') {
		money_get = (enter_money / rates.currency_ratio / rates.currency_dash_to_btc * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
	} else if (current_currency == 'DOGE') {
		money_get = (enter_money / rates.currency_ratio / rates.currency_doge_to_btc * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
	} else if (current_currency == 'ETH') {
		money_get = (enter_money / rates.currency_ratio / rates.currency_eth_to_btc * rates.currency_btc_to_usd).toFixed(rates.money_accuracy);
	}

	if (action_percent != 0) {
		money_get_action = (money_get * action_percent / 100).toFixed(rates.money_accuracy);
		money_get_total = (Number(money_get) + Number(money_get_action)).toFixed(rates.money_accuracy);

		$('#replenishment_action').text(money_get_action);
	} else {
		money_get_total = money_get;
	}

	$('#replenishment_get').text(money_get);
	$('#replenishment_total_sum').text(money_get_total);
}

$('body').on('click', '#replenish_select_currency input[type="radio"]', function () {
	calculateReplenishmentResultSum();
});

$('body').on('change', '#replenishment_amount', function () {
	replenishment_amount.value = replenishment_amount.value.replace(/,/g, '.');
	let amount = parseFloat($(this).val());
	if (amount > 0) {
		$('*[data-error="wrong_amount"]').removeClass('have-error');
		$('*[data-error="wrong_amount"]').addClass('have-success');
		calculateReplenishmentResultSum();
	} else {
		$('*[data-error="wrong_amount"]').removeClass('have-success');
		$('*[data-error="wrong_amount"]').addClass('have-error');
	}
});

$('body').on('change', '#amount_withdraw', function () {
	let amount = parseFloat($(this).val());
	if (amount > 0) {
		$('*[data-error="wrong_amount"]').removeClass('have-error');
		$('*[data-error="wrong_amount"]').addClass('have-success');
		calculateWithdrawalResultSum();
	} else {
		$('*[data-error="wrong_amount"]').removeClass('have-success');
		$('*[data-error="wrong_amount"]').addClass('have-error');
	}
});

$('body').on('click', '#paymethod .method-item', function () {
	$('#paymethod .method-item').removeClass('active');
	$('#paymethod .method-item input').prop('checked', false);
	$(this).toggleClass('active');
	$('.currencys_item').removeClass('active');

	$(this).find('input').prop('checked', true);
	let system = $(this).find('input').val();
	if (system == 'payeer') {
		$('#currency-rub').addClass('active');
		$('#currency-usd').addClass('active');
		$('#currency-rub input').prop('checked', true);
	} else if (system == 'qiwi') {
		$('#currency-rub').addClass('active');
		$('#currency-rub input').prop('checked', true);
	} else if (system == 'yandex') {
		$('#currency-rub').addClass('active');
		$('#currency-rub input').prop('checked', true);
	} else if (system == 'perfectmoney') {
		$('#currency-usd').addClass('active');
		$('#currency-usd input').prop('checked', true);
	} else if (system == 'advcash') {
		$('#currency-rub').addClass('active');
		$('#currency-usd').addClass('active');
		$('#currency-rub input').prop('checked', true);
	} else if (system == 'bitcoin') {
		$('#currency-btc').addClass('active');
		$('#currency-btc input').prop('checked', true);
	} else if (system == 'litecoin') {
		$('#currency-litecoin').addClass('active');
		$('#currency-litecoin input').prop('checked', true);
	} else if (system == 'dash') {
		$('#currency-dash').addClass('active');
		$('#currency-dash input').prop('checked', true);
	} else if (system == 'doge') {
		$('#currency-doge').addClass('active');
		$('#currency-doge input').prop('checked', true);
	} else if (system == 'ethereum') {
		$('#currency-ethereum').addClass('active');
		$('#currency-ethereum input').prop('checked', true);
	}
	calculateReplenishmentResultSum();
});

function calculateWithdrawalResultSum(current_currency) {
	amount_withdraw.value = amount_withdraw.value.replace(/,/g, '.');

	current_currency = $('#withdrawal_select_currency input[type="radio"]:checked').val();

	let enter_money = parseFloat(amount_withdraw.value.replace(/,/g, '.'));
	if (isNaN(enter_money)) {
		enter_money = 0;
	}
	let total_money = 0;

	if (current_currency == 'USD') {
		total_money = (enter_money * rates.currency_ratio).toFixed(2);
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio).toFixed(2));
	} else if (current_currency == 'RUB') {
		total_money = (enter_money * rates.currency_ratio * rates.currency_usd).toFixed(2);
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
	} else if (current_currency == 'BTC') {
		// total_money = (enter_money * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(4);
		total_money = enter_money.toFixed(8);
		// $('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(4));
		$('.money__form-item .rate .amount').text((1).toFixed(8));
	}

	if (current_currency == 'BTC') {
		var money_comission = ((total_money * 0.05) + 0.0004).toFixed(8);
		console.log(total_money - money_comission);
		var total_get = (total_money - money_comission).toFixed(8);
		if (total_get > 0) {
			$('#withdrawal-total span.amount').text(total_get);
		} else {
			$('#withdrawal-total span.amount').text((0).toFixed(8));
		}
	} else {
		var money_comission = (total_money * 0.05).toFixed(2);
		var total_get = (total_money - money_comission).toFixed(2);
		if (total_get > 0) {
			$('#withdrawal-total span.amount').text(total_get);
		} else {
			$('#withdrawal-total span.amount').text(0);
		}
	}

	$('.money__form-item .rate .currency, #withdrawal-total span.currency').text(current_currency);
}

$('body').on('click', '#withdrawal_select_currency input[type="radio"]', function () {
	calculateWithdrawalResultSum();
});

// $('body').on('change', '#amount_withdraw', function() {
// 	calculateWithdrawalResultSum();
// });

$('body').on('click', '#withdrawal .withdraw-item', function () {
	$('#withdrawal .withdraw-item').removeClass('active');
	$('#withdrawal .withdraw-item input').prop('checked', false);
	$(this).toggleClass('active');
	$('.currencys_item').removeClass('active');

	$(this).find('input').prop('checked', true);
	let system = $(this).find('input').val();
	$('#wallet').prop('value', '');
	$('.money__form-item_body .title, .money__form-item_body .dop_title span').text(system);

	$('.money__form-item .commission_btc').removeClass('active');

	if (system == 'payeer') {
		$('#currency-rub').addClass('active');
		$('#currency-usd').addClass('active');
		$('#currency-rub input').prop('checked', true);
		$('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
		$('#wallet').prop('value', wallets.payeer);
	} else if (system == 'advcash') {
		$('#currency-rub').addClass('active');
		$('#currency-usd').addClass('active');
		$('#currency-rub input').prop('checked', true);
		$('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
		$('#wallet').prop('value', wallets.advcash);
	} else if (system == 'qiwi') {
		$('#currency-rub').addClass('active');
		$('#currency-rub input').prop('checked', true);
		$('.money__form-item .rate .currency, #withdrawal-total span.currency').text('RUB');
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd).toFixed(2));
		$('#wallet').prop('value', wallets.qiwi);
	} else if (system == 'bitcoin') {
		$('#currency-btc').addClass('active');
		$('#currency-btc input').prop('checked', true);
		$('.money__form-item .rate .currency, #withdrawal-total span.currency').text('BTC');
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio * rates.currency_usd_to_btc).toFixed(8));
		$('.money__form-item .commission_btc').addClass('active');
	} else if (system == 'perfectmoney') {
		$('#currency-usd').addClass('active');
		$('#currency-usd input').prop('checked', true);
		$('.money__form-item .rate .currency, #withdrawal-total span.currency').text('USD');
		$('.money__form-item .rate .amount').text((1 * rates.currency_ratio).toFixed(2));
		$('#wallet').prop('value', wallets.perfectmoney);
	}

	calculateWithdrawalResultSum();
});