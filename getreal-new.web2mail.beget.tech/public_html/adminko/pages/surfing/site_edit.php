<?php

require_once '../functions/surf.php';
require_once '../functions/users.php';


if ($_POST['action'] == 'edit') {
	$arr = $_POST['data'];

	$update_settings = $pdo->prepare('UPDATE surfing SET link_name = ?, link_desc = ?, link_address = ?, views = ?, viewed = ?, vip = ?, colored = ?, window = ?, secure = ?, status = ? WHERE id = ? LIMIT 1');

	if ($arr['viewed'] <= $arr['views']) {
		if ($update_settings->execute(array(
			$arr['link_name'], $arr['link_desc'], $arr['link_address'], $arr['views'],
			$arr['viewed'], $arr['vip'], $arr['colored'], $arr['window'], $arr['secure'],
			$arr['status'], $_POST['id'])
		)) {
			echo 1;
		} else {
			echo 0;
		}
	}
}


if ($_POST['action'] == 'get_page') {
	$site = site_search_id($_POST['id']);

	$user = users_search_id($site['user_id']);

	if ($site['unlim'] > 0) {

		switch($site['unlim']) {
			case '2':
				$unlim = 'Неделя ('.format_money($surf_tarrifs['unlim'][2]).' '.$coin.')';
				break;
			case '3':
				$unlim = '10 дней('.format_money($surf_tarrifs['unlim'][3]).' '.$coin.')';
				break;
			case '4':
				$unlim = '20 дней('.format_money($surf_tarrifs['unlim'][4]).' '.$coin.')';
				break;
			case '5':
				$unlim = '30 дней('.format_money($surf_tarrifs['unlim'][5]).' '.$coin.')';
				break;
			case '6':
				$unlim = '40 дней('.format_money($surf_tarrifs['unlim'][6]).' '.$coin.')';
				break;
			default:
				$unlim = 'Не определен';
				break;
		}

		$date_to = date('d.m.Y H:i', $site['date_to']);

	} else {
		// switch ($site['tariff']) {
		// 	case '1':
		// 		$tariff = format_money(0.0011).' за просмотр';
		// 		break;
		// 	case '2':
		// 		$tariff = format_money(0.0012).' за просмотр';
		// 		break;
		// 	case '3':
		// 		$tariff = format_money(0.0015).' за просмотр';
		// 		break;
		// 	case '4':
		// 		$tariff = format_money(0.0017).' за просмотр';
		// 		break;
		// 	case '5':
		// 		$tariff = format_money(0.002).' за просмотр';
		// 		break;
		// 	default:
		// 		$tariff = 'Не определен';
		// 		break;
		// }

		$tariff = $surf_tarrifs['tariff'][$site['tariff']];
	}

?>

	<form class="form-default form-edit" data-callback="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Дата создания</span>
				<input class="form-item__input" type="text" name="date" value="<?= date('d.m.Y H:i', $site['date']); ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">ID</span>
				<input class="form-item__input" type="text" name="id" value="<?= $site['id']; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Логин</span>
				<span data-edit="users/edit_user" data-id="<?= $user['id']; ?>"><?= $user['login']; ?></span>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Название сайта</span>
					<input class="form-item__input" type="text" name="link_name" value="<?= $site['link_name']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Описание сайта</span>
				<textarea name="link_desc" class="form-item__input"><?= $site['link_desc']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Адрес сайта</span>
				<input class="form-item__input" type="text" name="link_address" value="<?= $site['link_address']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<hr>
		<?php if ($site['unlim'] > 0) { ?>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Безлимит</span>
				<input class="form-item__input" type="text" name="unlim" value="<?= $unlim; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Дата окончания</span>
				<input class="form-item__input" type="text" name="unlim" value="<?= $date_to; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<?php } else { ?>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Тариф сайта</span>
				<input class="form-item__input" type="text" name="tariff" value="<?= $tariff; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<?php } ?>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Просмотров куплено</span>
				<input class="form-item__input" type="text" name="views" value="<?= $site['views']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Просмотренно</span>
				<input class="form-item__input" type="text" name="viewed" value="<?= $site['viewed']; ?>">
				<span class="form-item__description" style="color: red;">Не делать больше чем общие кол-во просмотров</span>
			</label>
		</div>
		<hr>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">VIP</span>
				<span class="radio-button-group">
				<?php
					if ($site['vip'] == 1) {
				?>
						<label><input type="radio" name="vip" value="1" checked>Да</label>
						<label><input type="radio" name="vip" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="vip" value="1">Да</label>
						<label><input type="radio" name="vip" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Выделение цветом</span>
				<span class="radio-button-group">
				<?php
					if ($site['colored'] == 1) {
				?>
						<label><input type="radio" name="colored" value="1" checked>Да</label>
						<label><input type="radio" name="colored" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="colored" value="1">Да</label>
						<label><input type="radio" name="colored" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Показ в отдельном окне</span>
				<span class="radio-button-group">
				<?php
					if ($site['window'] == 1) {
				?>
						<label><input type="radio" name="window" value="1" checked>Да</label>
						<label><input type="radio" name="window" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="window" value="1">Да</label>
						<label><input type="radio" name="window" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Безопассный</span>
				<span class="radio-button-group">
				<?php
					if ($site['secure'] == 1) {
				?>
						<label><input type="radio" name="secure" value="1" checked>Да</label>
						<label><input type="radio" name="secure" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="secure" value="1">Да</label>
						<label><input type="radio" name="secure" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">
					<a href="https://transparencyreport.google.com/safe-browsing/search?url=<?= $site['link_address']; ?>" target="_blank">Проверить сайт</a>
				</span>
			</label>
		</div>
		<hr>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Статус</span>
				<span class="radio-button-group">
					<label><input type="radio" name="status" value="1" <?php if ($site['status'] == 1) { echo 'checked'; } ?>>1</label>
					<label><input type="radio" name="status" value="2" <?php if ($site['status'] == 2) { echo 'checked'; } ?>>2</label>
					<label><input type="radio" name="status" value="3" <?php if ($site['status'] == 3) { echo 'checked'; } ?>>3</label>
					<label><input type="radio" name="status" value="4" <?php if ($site['status'] == 4) { echo 'checked'; } ?>>4</label>
					<label><input type="radio" name="status" value="3" <?php if ($site['status'] == 5) { echo 'checked'; } ?>>5</label>
				</span>
				<span class="form-item__description">1 - В работе <br> 2 - остановлен <br> 3 - удален пользователем <br> 4 - закончились просмотры <br> 5 - отключен нами</span>
			</label>
		</div>

		<br><br>
		<input type="hidden" name="id" value="<?= $_POST['id']; ?>" disabled>
		<button type="submit" class="button-d">Сохранить</button>
	</form>

<?php
}
?>