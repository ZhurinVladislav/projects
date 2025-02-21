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

	global $pdo;

	$range = array_reverse(dateRange($date_from, $date_to));

	$get_registrations = $pdo->query('SELECT DATE_FORMAT(FROM_UNIXTIME(reg_date), "%Y-%m-%d") AS day, COUNT(id) AS total_reg FROM users WHERE reg_date > '.strtotime($date_from).' AND reg_date < '.(strtotime($date_to) + 86400).' GROUP BY day');
	$registrations = $get_registrations->fetchAll();

	$get_authorizations = $pdo->query('SELECT DATE_FORMAT(FROM_UNIXTIME(date), "%Y-%m-%d") AS day, COUNT(DISTINCT(user_id)) AS total_auth FROM authorization_logs WHERE date > '.strtotime($date_from).' AND date < '.(strtotime($date_to) + 86400).' GROUP BY day');
	$authorizations = $get_authorizations->fetchAll();

	$reg_array = array();
	$total_reg = 0;
	$auth_array = array();
	$total_auth = 0;

	foreach ($registrations as $value) {
		$reg_array[$value['day']] = $value['total_reg'];
		$total_reg += $value['total_reg'];
	}
	foreach ($authorizations as $value) {
		$auth_array[$value['day']] = $value['total_auth'];
		$total_auth += $value['total_auth'];
	}
?>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 33%">Дата</div>
			<div class="table-column" style="width: 33%">Регистраций</div>
			<div class="table-column" style="width: 33%">Авторизаций</div>
		</div>
	<?php
		foreach ($range as $key => $value) {
	?>
			<div class="table-row">
				<div class="table-column" style="width: 33%">
					<?= $value; ?>
				</div>
				<div class="table-column" style="width: 33%"><?= (int) $reg_array[$value]; ?></div>
				<div class="table-column" style="width: 33%"><?= (int) $auth_array[$value]; ?></div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 33%">
				Всего:
			</div>
			<div class="table-column" style="width: 33%"><?= $total_reg; ?></div>
			<div class="table-column" style="width: 33%"><?= $total_auth; ?></div>
		</div>
	</div>
<?php
}

if ($_POST['action'] == 'search') {
	get_report($_POST['from'], $_POST['to']);
}

if ($_POST['action'] == 'get_page') {

	$total_users = $pdo->query('SELECT COUNT(id) as count FROM users');
	$count = $total_users->fetch();

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

	<p>Всего пользователей зарегистрировано: <?= $count['count']; ?></p>

<?php
}
?>