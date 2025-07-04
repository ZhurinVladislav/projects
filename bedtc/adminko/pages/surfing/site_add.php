<?php

require_once '../functions/surf.php';
require_once '../functions/users.php';

if ($_POST['action'] == 'add') {

	$work_status = 0;

	ini_set('display_errors', 1);

	$user_id = 1;
	$link_name = $_POST['data']['link_name'];
	$link_desc = $_POST['data']['link_desc'];
	$link_address = $_POST['data']['link_address'];
	$tariff = 1;
	$unlim = 1;
	$views = 1;
	$vip = 1;
	$colored = 0;
	$window = 0;
	$secure = 1;
	$price = format_money(1);
	$date = time();
	$date_to = 0;

	$add_site = $pdo->prepare('INSERT INTO surfing(user_id, link_name, link_desc, link_address, tariff, unlim, views, vip, colored, window, secure, price, date, date_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
	if ($add_site->execute(array($user_id, $link_name, $link_desc, $link_address, $tariff, $unlim, $views, $vip, $colored, $window, $secure, $price, time(), $date_to))) {
		$work_status = 1;
	}

	echo $work_status;
}

if ($_POST['action'] == 'get_page') {
?>

	<form class="form-default form-add" data-page-handler="surfing/site_add" data-result="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок</span>
				<input class="form-item__input" type="text" name="link_name">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Описание</span>
				<textarea name="link_desc" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ссылка</span>
				<input class="form-item__input" type="text" name="link_address">
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
	</form>

<?php
}
?>