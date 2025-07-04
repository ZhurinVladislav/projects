<?php

$currency_usd = $settings->get('currency_ratio');
$currency_usd_rub = $settings->get('currency_usd');
$currency_rub = $currency_usd * $currency_usd_rub;

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

	global $pdo;

	$range = array_reverse(dateRange($date_from, $date_to));

	$get_registrations = $pdo->query('SELECT DATE_FORMAT(FROM_UNIXTIME(date), "%Y-%m-%d") AS day, COUNT(id) AS total_buy FROM surfing WHERE date > '.strtotime($date_from).' AND date < '.(strtotime($date_to) + 86400).' GROUP BY day');
	$registrations = $get_registrations->fetchAll();

	$get_authorizations = $pdo->query('SELECT DATE_FORMAT(FROM_UNIXTIME(date), "%Y-%m-%d") AS day, COUNT(id) AS total_viewed FROM surfing_views WHERE date > '.strtotime($date_from).' AND date < '.(strtotime($date_to) + 86400).' GROUP BY day');
	$authorizations = $get_authorizations->fetchAll();

	$site_buy = array();
	$total_buy = 0;
	$viewed = array();
	$total_viewed = 0;

	foreach ($registrations as $value) {
		$site_buy[$value['day']] = $value['total_buy'];
		$total_buy += $value['total_buy'];
	}
	foreach ($authorizations as $value) {
		$viewed[$value['day']] = $value['total_viewed'];
		$total_viewed += $value['total_viewed'];
	}
?>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 33%">Дата</div>
			<div class="table-column" style="width: 33%">Сайтов куплено</div>
			<div class="table-column" style="width: 33%">Просмотрено</div>
		</div>
	<?php
		foreach ($range as $key => $value) {
	?>
			<div class="table-row">
				<div class="table-column" style="width: 33%">
					<?= $value; ?>
				</div>
				<div class="table-column" style="width: 33%"><?= (int) $site_buy[$value]; ?></div>
				<div class="table-column" style="width: 33%"><?= (int) $viewed[$value]; ?></div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 33%">
				Всего:
			</div>
			<div class="table-column" style="width: 33%"><?= $total_buy; ?></div>
			<div class="table-column" style="width: 33%"><?= $total_viewed; ?></div>
		</div>
	</div>
<?php
}

if ($_POST['action'] == 'search') {
	get_report($_POST['from'], $_POST['to']);
}

if ($_POST['action'] == 'get_page') {

	$get_sites = $pdo->query('SELECT * FROM surfing');
	$sites = $get_sites->fetchAll();
	$total_earned = 0;
	foreach ($sites as $site) {
		if ($site['unlim'] == 0) {
			$site_tariff = $surf_tarrifs['tariff'][$site['tariff']];
		} else {
			$site_tariff = $surf_tarrifs['tariff'][1];
		}

		$site_earn = $site_tariff * $site['viewed'];
		$site_earn = $site_earn * 0.1;

		$total_earned += $site_earn;

	}



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

	<p>Всего заработано: <?= format_money($total_earned); ?> BTC | <?= round($total_earned * $currency_usd, 2); ?> USD | <?= round($total_earned * $currency_rub, 2); ?> RUB</p>

<?php
}
?>