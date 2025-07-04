<?php

function dateRange($first, $last, $step = '+1 day', $format = 'Y-m-d') {
	$dates = array();
	$current = strtotime($first);
	$last = strtotime($last);

	while($current <= $last)
	{
		$dates[] = date($format, $current);
		$current = strtotime($step, $current);
	}

	return $dates;
}

function get_report($date_from, $date_to) {
	global $pdo, $settings;

	$currency_usd = $settings->get('currency_usd');
	$currency_btc_to_rub = $settings->get('currency_btc_to_rub');
	$currency_ltc_to_btc = $settings->get('currency_ltc_to_btc');
	$currency_doge_to_btc = $settings->get('currency_doge_to_btc');
	$currency_dash_to_btc = $settings->get('currency_dash_to_btc');
	$currency_eth_to_btc = $settings->get('currency_eth_to_btc');

	$range = array_reverse(dateRange($date_from, $date_to));

	$get_replenishments = $pdo->query('SELECT date_created, SUM(amount) AS total_sum, currency FROM replenishments WHERE status = 1 AND date_created > '.strtotime($date_from).' AND date_created < '.(strtotime($date_to) + 86400).' AND user_id != 1 AND fake != 1 GROUP BY date_created, currency');
	$replenishments = $get_replenishments->fetchAll();
	foreach ($replenishments as $key => $value) {
		$replenishments[$key]['day'] = date('Y-m-d', $value['date_created']);
		// $value['day'] = date('Y-m-d', $value['date_created']);
	}

	$get_withdrawals = $pdo->query('SELECT date_created, SUM(amount_get) AS total_sum, currency FROM withdrawal WHERE status = 1 AND date_created > '.strtotime($date_from).' AND date_created < '.(strtotime($date_to) + 86400).' AND user_id != 1 AND fake != 1 GROUP BY date_created, currency');
	$withdrawals = $get_withdrawals->fetchAll();
	foreach ($withdrawals as $key => $value) {
		$withdrawals[$key]['day'] = date('Y-m-d', $value['date_created']);
		// $value['day'] = date('Y-m-d', $value['date_created']);
	}

	$money_in = array();
	$money_out = array();
	$totals = array(
		'in_usd' => 0,
		'in_rub' => 0,
		'in_btc' => 0,
		'in_alt' => 0,
		'out_usd' => 0,
		'out_rub' => 0,
		'out_btc' => 0,
		'in_total' => 0,
		'out_total' => 0,
		'balance' => 0
	);

	foreach ($replenishments as $value) {
		if (!isset($money_in[$value['day']]['total'])) {
			$money_in[$value['day']]['total'] = 0;
		}

		switch ($value['currency']) {
			case 'USD':
				$money_in[$value['day']]['USD'] += number_format($value['total_sum'], 2, '.', '');
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] * $currency_usd, 2, '.', '');
				$totals['in_usd'] += number_format($value['total_sum'], 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] * $currency_usd, 2, '.', '');
				break;
			case 'RUB':
				$money_in[$value['day']]['RUB'] += number_format($value['total_sum'], 2, '.', '');
				$money_in[$value['day']]['total'] += number_format($value['total_sum'], 2, '.', '');
				$totals['in_rub'] += number_format($value['total_sum'], 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'], 2, '.', '');
				break;
			case 'BTC':
				$money_in[$value['day']]['BTC'] += format_money($value['total_sum']);
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] * $currency_btc_to_rub, 2, '.', '');
				$totals['in_btc'] += number_format($value['total_sum'], 8, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] * $currency_btc_to_rub, 2, '.', '');
				break;
			case 'LTC':
				$money_in[$value['day']]['ALT'] += format_money($value['total_sum'] / $currency_ltc_to_btc  * $currency_btc_to_rub);
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] / $currency_ltc_to_btc  * $currency_btc_to_rub, 2, '.', '');
				$totals['in_alt'] += number_format($value['total_sum'] / $currency_ltc_to_btc * $currency_btc_to_rub, 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] / $currency_ltc_to_btc * $currency_btc_to_rub, 2, '.', '');
				break;
			case 'DASH':
				$money_in[$value['day']]['ALT'] += format_money($value['total_sum'] / $currency_dash_to_btc  * $currency_btc_to_rub);
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] / $currency_dash_to_btc  * $currency_btc_to_rub, 2, '.', '');
				$totals['in_alt'] += number_format($value['total_sum'] / $currency_dash_to_btc * $currency_btc_to_rub, 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] / $currency_dash_to_btc * $currency_btc_to_rub, 2, '.', '');
				break;
			case 'DOGE':
				$money_in[$value['day']]['ALT'] += format_money($value['total_sum'] / $currency_doge_to_btc  * $currency_btc_to_rub);
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] / $currency_doge_to_btc  * $currency_btc_to_rub, 2, '.', '');
				$totals['in_alt'] += number_format($value['total_sum'] / $currency_doge_to_btc * $currency_btc_to_rub, 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] / $currency_doge_to_btc * $currency_btc_to_rub, 2, '.', '');
				break;
			case 'ETH':
				$money_in[$value['day']]['ALT'] += format_money($value['total_sum'] / $currency_eth_to_btc  * $currency_btc_to_rub);
				$money_in[$value['day']]['total'] += number_format($value['total_sum'] / $currency_eth_to_btc  * $currency_btc_to_rub, 2, '.', '');
				$totals['in_alt'] += number_format($value['total_sum'] / $currency_eth_to_btc * $currency_btc_to_rub, 2, '.', '');
				$totals['in_total'] += number_format($value['total_sum'] / $currency_eth_to_btc * $currency_btc_to_rub, 2, '.', '');
				break;
		}
	}
	
	foreach ($withdrawals as $value) {
		if (!isset($money_out[$value['day']]['total'])) {
			$money_out[$value['day']]['total'] = 0;
		}

		switch ($value['currency']) {
			case 'USD':
				$money_out[$value['day']]['USD'] += number_format($value['total_sum'], 2, '.', '');
				$money_out[$value['day']]['total'] += number_format($value['total_sum'] * $currency_usd, 2, '.', '');
				$totals['out_usd'] += number_format($value['total_sum'], 2, '.', '');
				$totals['out_total'] += number_format($value['total_sum'] * $currency_usd, 2, '.', '');
				break;
			case 'RUB':
				$money_out[$value['day']]['RUB'] += number_format($value['total_sum'], 2, '.', '');
				$money_out[$value['day']]['total'] += number_format($value['total_sum'], 2, '.', '');
				$totals['out_rub'] += number_format($value['total_sum'], 2, '.', '');
				$totals['out_total'] += number_format($value['total_sum'], 2, '.', '');
				break;
			case 'BTC':
				$money_out[$value['day']]['BTC'] += format_money($value['total_sum']);
				$money_out[$value['day']]['total'] += number_format($value['total_sum'] * $currency_btc_to_rub, 2, '.', '');
				$totals['out_btc'] += number_format($value['total_sum'], 8, '.', '');
				$totals['out_total'] += number_format($value['total_sum'] * $currency_btc_to_rub, 2, '.', '');
				break;
		}
	}
?>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 10%">Дата</div>
			<div class="table-column" style="width: 8%; background: green;">+ USD</div>
			<div class="table-column" style="width: 9%; background: green;">+ RUB</div>
			<div class="table-column" style="width: 10%; background: green;">+ BTC</div>
			<div class="table-column" style="width: 9%; background: green;">+ ALT</div>
			<div class="table-column" style="width: 8%; background: #d00;">- USD</div>
			<div class="table-column" style="width: 9%; background: #d00;">- RUB</div>
			<div class="table-column" style="width: 10%; background: #d00;">- BTC</div>
			<div class="table-column" style="width: 9%">Всего пополнено</div>
			<div class="table-column" style="width: 9%">Всего выведено</div>
			<div class="table-column" style="width: 9%">Баланс</div>
		</div>
	<?php
		foreach ($range as $key => $value) {
	?>
			<div class="table-row">
				<div class="table-column" style="width: 10%">
					<?= $value; ?>
				</div>
				<div class="table-column" style="width: 8%"><?= number_format($money_in[$value]['USD'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_in[$value]['RUB'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 10%"><?= number_format($money_in[$value]['BTC'], 8, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_in[$value]['ALT'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 8%"><?= number_format($money_out[$value]['USD'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_out[$value]['RUB'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 10%"><?= number_format($money_out[$value]['BTC'], 8, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_in[$value]['total'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_out[$value]['total'], 2, '.', ''); ?></div>
				<div class="table-column" style="width: 9%"><?= number_format($money_in[$value]['total'] - $money_out[$value]['total'], 2, '.', ''); ?></div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 10%">
				Всего:
			</div>
			<div class="table-column" style="width: 8%"><?= number_format($totals['in_usd'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['in_rub'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 10%"><?= number_format($totals['in_btc'], 8, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['in_alt'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 8%"><?= number_format($totals['out_usd'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['out_rub'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 10%"><?= number_format($totals['out_btc'], 8, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['in_total'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['out_total'], 2, '.', ''); ?></div>
			<div class="table-column" style="width: 9%"><?= number_format($totals['in_total'] - $totals['out_total'], 2, '.', ''); ?></div>
		</div>
	</div>
<?php
}

if ($_POST['action'] == 'search') {
	get_report($_POST['from'], $_POST['to']);
}

if ($_POST['action'] == 'get_page') {
?>
	<form class="form-default form-search-date" data-result="result_report">
		<div class="form-item form-item-search">
			<label>
				<!-- <span class="form-item__header">Поиск</span> -->
				От <input class="form-item__input" type="text" name="from" value="<?= date('Y-m-d', strtotime('-6 days')); ?>" style="width: 110px; margin-left: 25px; margin-right: 25px;">
				до <input class="form-item__input" type="text" name="to" value="<?= date('Y-m-d'); ?>" style="width: 110px; margin-left: 25px;">
				<button type="submit" class="form-item__button button-d">Поиск</button>
				<span class="form-item__description"></span>
			</label>
		</div>
	</form>
	<div data-placeholder="result_report">
		<?php
			get_report(date('Y-m-d', strtotime('-6 days')), date('Y-m-d'));
		?>
	</div>
<?php
}
?>