<?php

require_once '../functions/user.php';
require_once '../functions/users.php';


if ($_POST['action'] == 'login_as') {
	$_SESSION['id'] = $_POST['id'];
	$_SESSION['login'] = $_POST['login'];
	$_SESSION['admin_logged'] = false;
	echo 1;
}

if ($_POST['action'] == 'edit') {
	$arr = $_POST['data'];
	//	17911360dc733f1796ba70b5bc79ea6e5dc85403fc0e4c28fe076be87632e203 - хеш пароля 'admin'
	$pass_string = '';
	if ($arr['password'] != '') {
		$new_password = hash('sha256', trim($arr['password']));
		$new_password = hash('sha256', ($new_password . $pass_salt));
		$pass_string = 'password = "'.$new_password.'",';
	}

	$update_settings = $pdo->prepare('UPDATE users SET '.$pass_string.' pin = ?, email = ?, balance_buy = ?, balance_withdrawal = ?, can_communicate = ?, subscribed = ?, email_confirmed = ?, can_withdrawal = ?, chat_moder = ?, fake = ? WHERE id = ? LIMIT 1');
	$update_ref_settings = $pdo->prepare('UPDATE referrals_info SET type = ?, auto_ref_back = ? WHERE user_id = ? LIMIT 1');
	
	if (
		$update_settings->execute(array($arr['pin'], $arr['email'], $arr['balance_buy'], $arr['balance_withdrawal'], $arr['can_communicate'], $arr['subscribed'], $arr['email_confirmed'], $arr['can_withdrawal'], $arr['chat_moder'], $arr['fake'], $_POST['id']))
		&&
		$update_ref_settings->execute(array($arr['ref_type'], $arr['ref_auto_ref_back'], $_POST['id']))
	) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'send_message') {

	$text = addslashes(
		htmlspecialchars(
			html_remove_attributes(
				strip_tags(
					htmlspecialchars_decode(
						trim(
							$_POST['data']['text']
						)
					), '<img><br><div></div>'
				), ['src']
			)
		)
	);
	$companion_id = (int) $_POST['id'];

	$add_message = $pdo->prepare('INSERT INTO messages (from_id, to_id, text, date) VALUES (?, ?, ?, ?)');
	$add_message->execute(array(1, $companion_id, $text, time()));

	$find_cache = $pdo->prepare('SELECT id FROM messages_cache WHERE (first_id = ? AND second_id = ?) OR (first_id = ? AND second_id = ?) LIMIT 1');
	$find_cache->execute(array(1, $companion_id, $companion_id, 1));

	if (!is_bool($cache = $find_cache->fetch())) {
		$update_cache = $pdo->prepare('UPDATE messages_cache SET text = ?, date = ?, from_id = ?, status = 0 WHERE id = ? LIMIT 1');
		$update_cache->execute(array($text, time(), 1, $cache['id']));
	} else {
		$create_cache = $pdo->prepare('INSERT INTO messages_cache (first_id, second_id, from_id, text, date) VALUES (?, ?, ?, ?, ?)');
		$create_cache->execute(array(1, $companion_id, 1, $text, time()));
	}

	echo 1;
}

if ($_POST['action'] == 'get_page') {

	$user = users_search_id($_POST['id']);

	$user_ref_info = $pdo->prepare('SELECT type, auto_ref_back FROM referrals_info WHERE user_id = ? LIMIT 1');
	$user_ref_info->execute(array($_POST['id']));
	$user_ref_info = $user_ref_info->fetch();
	$user_ref_type = $user_ref_info['type'];
	$user_auto_ref_back = $user_ref_info['auto_ref_back'];
	
	$get_referral_info = $pdo->query('SELECT * FROM users_referrals WHERE user_id = '.intval($_POST['id']));
	$referral_info = $get_referral_info->fetch();
	$referrer = $referral_info;

?>
	<button id="user_login_as" class="button-d" data-id="<?= $user['login']; ?>" data-login="<?= $user['login']; ?>">Войти под ним</button>&nbsp;&nbsp;<span style="color: red">Не менять язык после входа!</span>
	<br><br>
	<form class="form-default form-edit" data-callback="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">ID</span>
				<input class="form-item__input" type="text" name="id" value="<?= $user['id']; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Логин</span>
				<input class="form-item__input" type="text" name="login" value="<?= $user['login']; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Пароль</span>
				<input class="form-item__input" type="text" name="password" value="">
				<span class="form-item__description">Здесь можно сменить пароль пользователя</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">E-mail</span>
				<input class="form-item__input" type="text" name="email" value="<?= $user['email']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Зарегистрирован</span>
				<input class="form-item__input" type="text" name="reg_date" value="<?= date('d.m.Y H:i', $user['reg_date']); ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">PIN-код</span>
				<input class="form-item__input" type="text" name="pin" value="<?= $user['pin']; ?>">
				<span class="form-item__description">4-6 символов</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Счёт для покупок</span>
				<input class="form-item__input" type="text" name="balance_buy" value="<?= format_money($user['balance_buy']); ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Счёт для вывода</span>
				<input class="form-item__input" type="text" name="balance_withdrawal" value="<?= format_money($user['balance_withdrawal']); ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<!-- <div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Доверие</span>
				<input class="form-item__input" type="text" name="trust" value="<?= $user['trust']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Авторитет</span>
				<input class="form-item__input" type="text" name="authority" value="<?= $user['authority']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div> -->
		<hr>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Коммуникации</span>
				<span class="radio-button-group">
				<?php
					if ($user['can_communicate'] == 1) {
				?>
						<label><input type="radio" name="can_communicate" value="1" checked>Да</label>
						<label><input type="radio" name="can_communicate" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="can_communicate" value="1">Да</label>
						<label><input type="radio" name="can_communicate" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Определяет, может ли пользователь оставлять отзывы, предложения, писать в чат и личные сообщения</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Подписка</span>
				<span class="radio-button-group">
				<?php
					if ($user['subscribed'] == 1) {
				?>
						<label><input type="radio" name="subscribed" value="1" checked>Да</label>
						<label><input type="radio" name="subscribed" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="subscribed" value="1">Да</label>
						<label><input type="radio" name="subscribed" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Подписка на Email-рассылку</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Почта подтверждена</span>
				<span class="radio-button-group">
				<?php
					if ($user['email_confirmed'] == 1) {
				?>
						<label><input type="radio" name="email_confirmed" value="1" checked>Да</label>
						<label><input type="radio" name="email_confirmed" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="email_confirmed" value="1">Да</label>
						<label><input type="radio" name="email_confirmed" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Подтвердил ли пользователь свою почту, нажав на кнопку в письме</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вывод средств</span>
				<span class="radio-button-group">
				<?php
					if ($user['can_withdrawal'] == 1) {
				?>
						<label><input type="radio" name="can_withdrawal" value="1" checked>Да</label>
						<label><input type="radio" name="can_withdrawal" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="can_withdrawal" value="1">Да</label>
						<label><input type="radio" name="can_withdrawal" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Может ли пользователь выводить средства из игры</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Уровень рефералки</span>
				<span class="radio-button-group">
					<label><input type="radio" name="ref_type" value="1" <?php if ($user_ref_type == 1) { echo 'checked'; } ?>>Обычный</label>
					<label><input type="radio" name="ref_type" value="2" <?php if ($user_ref_type == 2) { echo 'checked'; } ?>>Улучш.</label>
					<label><input type="radio" name="ref_type" value="3" <?php if ($user_ref_type == 3) { echo 'checked'; } ?>>VIP</label>
				</span>
				<span class="form-item__description">Тип реферального тарифа</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Авторефбек</span>
				<span class="radio-button-group">
					<label><input type="radio" name="ref_auto_ref_back" value="0" <?php if ($user_auto_ref_back == 0) { echo 'checked'; } ?>>0%</label>
					<label><input type="radio" name="ref_auto_ref_back" value="25" <?php if ($user_auto_ref_back == 25) { echo 'checked'; } ?>>25%.</label>
					<label><input type="radio" name="ref_auto_ref_back" value="50" <?php if ($user_auto_ref_back == 50) { echo 'checked'; } ?>>50%</label>
					<label><input type="radio" name="ref_auto_ref_back" value="75" <?php if ($user_auto_ref_back == 75) { echo 'checked'; } ?>>75%</label>
				</span>
				<span class="form-item__description">Авто-возврат части суммы, полученной с реферальных начислений</span>
			</label>
		</div>
		<hr>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Откуда пришел</span>
				<input class="form-item__input" type="text" name="ref_url" value="<?= $referral_info['url']; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Язык</span>
				<input class="form-item__input" type="text" name="language" value="<?= $user['language']; ?>" disabled>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Модератор чата</span>
				<span class="radio-button-group">
				<?php
					if ($user['chat_moder'] == 1) {
				?>
						<label><input type="radio" name="chat_moder" value="1" checked>Да</label>
						<label><input type="radio" name="chat_moder" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="chat_moder" value="1">Да</label>
						<label><input type="radio" name="chat_moder" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Может удалять сообщения из чата и банить игроков</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Фейк</span>
				<span class="radio-button-group">
				<?php
					if ($user['fake'] == 1) {
				?>
						<label><input type="radio" name="fake" value="1" checked>Да</label>
						<label><input type="radio" name="fake" value="0">Нет</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="fake" value="1">Да</label>
						<label><input type="radio" name="fake" value="0" checked>Нет</label>
				<?php
					}
				?>
				</span>
				<span class="form-item__description">Пополнения и выводы фейковых пользователей не отображаются в отчетах по датам, но видны обычным игрокам</span>
			</label>
		</div>
		<br><br>
		<input type="hidden" name="id" value="<?= $_POST['id']; ?>" disabled>
		<button type="submit" class="button-d">Сохранить</button>
	</form>

	<form class="form-default form-send-message">
		<h2>Отправить сообщение в ЛС</h2>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст</span>
				<textarea name="text" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<input type="hidden" name="id" value="<?= $_POST['id']; ?>" disabled>
		<button type="submit" class="button-d">Отправить</button>
	</form>

	<br><hr><br>
	<h2>Авторизации (последние 10)</h2>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 50%">Дата</div>
			<div class="table-column" style="width: 50%">IP</div>
		</div>
	<?php
		$authorizations = $pdo->query('SELECT * FROM authorization_logs WHERE user_id = '.intval($_POST['id']).' ORDER BY date DESC LIMIT 10');
		while ($row = $authorizations->fetch()) {
	?>
			<div class="table-row">
				<div class="table-column" style="width: 50%"><?= date('Y-m-d H:i', $row['date']); ?></div>
				<div class="table-column" style="width: 50%"><?= $row['ip']; ?></div>
			</div>
	<?php
		}
	?>
	</div>

	<br><hr><br>
	<h2>Пополнения</h2>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 6%">ID</div>
			<div class="table-column" style="width: 14%">Сумма</div>
			<div class="table-column" style="width: 20%">Сумма к получению</div>
			<div class="table-column" style="width: 20%">Платежка</div>
			<div class="table-column" style="width: 10%">Акция</div>
			<div class="table-column" style="width: 15%">Дата</div>
			<div class="table-column" style="width: 15%">Статус</div>
		</div>
	<?php
		$replenisments = $pdo->query('SELECT * FROM replenishments WHERE user_id = '.intval($_POST['id']).' ORDER BY date_created DESC');
		$total_replenishments = 0;
		while ($row = $replenisments->fetch()) {
			if ($row['status'] == 1) {
				$total_replenishments += $row['amount_get'];
			}
	?>
			<div class="table-row">
				<div class="table-column" style="width: 6%"><?= $row['id']; ?></div>
				<div class="table-column" style="width: 14%">
				<?php
					if ($row['currency'] == 'RUB' || $row['currency'] == 'USD') {
						echo number_format($row['amount'], 2, '.', '');
					} else {
						echo $row['amount'];
					}
					echo ' '.$row['currency'];
				?>
				</div>
				<div class="table-column" style="width: 20%"><?= format_money($row['amount_get']).' '.$coin; ?></div>
				<div class="table-column" style="width: 20%"><?= $row['paysystem']; ?></div>
				<div class="table-column" style="width: 10%"><?= $row['action_percent']; ?></div>
				<div class="table-column" style="width: 15%">
					<span title="<?= date('Y-m-d H:i', $row['date_confirmed']); ?>">
						<?= date('Y-m-d H:i', $row['date_created']); ?>
					</span>
				</div>
				<div class="table-column" style="width: 15%">
				<?php
					if ($row['status'] == 0) {
						echo 'В ожидании';
					} elseif ($row['status'] == 1) {
						echo 'Выполнено';
					} elseif ($row['status'] == 2) {
						echo 'Удалено';
					}
				?>
				</div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 6%">Всего:</div>
			<div class="table-column" style="width: 14%"></div>
			<div class="table-column" style="width: 20%"></div>
			<div class="table-column" style="width: 20%"></div>
			<div class="table-column" style="width: 10%"></div>
			<div class="table-column" style="width: 15%"></div>
			<div class="table-column" style="width: 15%"><?= format_money($total_replenishments).' '.$coin; ?></div>
		</div>
	</div>

	<br><hr><br>
	<h2>Выводы</h2>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 20%">Дата</div>
			<div class="table-column" style="width: 20%">Сумма</div>
			<div class="table-column" style="width: 20%">Сумма к получению</div>
			<div class="table-column" style="width: 20%">Кошелек</div>
			<div class="table-column" style="width: 20%">Статус</div>
		</div>
	<?php
		$withdrawal = $pdo->query('SELECT * FROM withdrawal WHERE user_id = '.intval($_POST['id']).' ORDER BY date_created DESC');
		$total_withdrawal = 0;
		while ($row = $withdrawal->fetch()) {
			if ($row['status'] == 1) {
				$total_withdrawal += $row['amount'];
			}
	?>
			<div class="table-row">
				<div class="table-column" style="width: 20%">
					<span title="<?= date('Y-m-d H:i', $row['date_confirmed']); ?>">
						<?= date('Y-m-d H:i', $row['date_created']); ?>
					</span>
				</div>
				<div class="table-column" style="width: 20%"><?= format_money($row['amount']).' '.$coin; ?></div>
				<div class="table-column" style="width: 20%">
				<?php
					if ($row['currency'] == 'RUB' || $row['currency'] == 'USD') {
						echo number_format($row['amount_get'], 2, '.', '');
					} else {
						echo $row['amount_get'];
					}
					echo ' '.$row['currency'];
				?>
				</div>
				<div class="table-column" style="width: 20%"><?= $row['wallet']; ?></div>
				<div class="table-column" style="width: 20%">
					<?php
						if ($row['status'] == 0) {
							echo 'В ожидании';
						} elseif ($row['status'] == 1) {
							echo 'Выполнено';
						} elseif ($row['status'] == 2) {
							echo 'Удалено';
						}
					?>
				</div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 20%">Всего:</div>
			<div class="table-column" style="width: 20%"></div>
			<div class="table-column" style="width: 20%"></div>
			<div class="table-column" style="width: 20%"></div>
			<div class="table-column" style="width: 20%"><?= format_money($total_withdrawal).' '.$coin; ?></div>
		</div>
	</div>

	<br><hr><br>
	<h2>Последние операции</h2>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 35%">Операция</div>
			<div class="table-column" style="width: 20%">Дата</div>
			<div class="table-column" style="width: 15%">Сумма</div>
			<div class="table-column" style="width: 15%">Счёт покупок</div>
			<div class="table-column" style="width: 15%">Счёт вывода</div>
		</div>
	<?php
		$logs = $pdo->query('SELECT * FROM users_logs WHERE user_id = '.intval($_POST['id']).' ORDER BY date DESC LIMIT 20');
		while ($row = $logs->fetch()) {
	?>
			<div class="table-row">
				<div class="table-column" style="width: 35%">
				<?php
					echo $log_codes[$row['code']];
					if ($row['code'] == '02011' || $row['code'] == '02012' || $row['code'] == '02013') {
						echo ' ('.$row['info'].')';
					}
				?>
				</div>
				<div class="table-column" style="width: 20%"><?= date('Y-m-d H:i', $row['date']); ?></div>
				<div class="table-column" style="width: 15%"><?= format_money($row['money']); ?></div>
				<div class="table-column" style="width: 15%"><?= format_money($row['balance_buy']); ?></div>
				<div class="table-column" style="width: 15%"><?= format_money($row['balance_withdrawal']); ?></div>
			</div>
	<?php
		}
	?>
	</div>

	<br><hr><br>
	<h2>Рефералы первого уровня</h2>
	<?php
		if (!is_bool($referrer) && $referrer != 0) {
			$referrer_info = users_search_id($referrer['ref_id_first'], 'login');
			echo '<p>Upline: <span data-edit="users/edit_user" data-id="'.$referrer['ref_id_first'].'">
						'.$referrer_info['login'].'
					</span></p>';
		} else {
			echo '<p>Upline: - </p>';
		}
	?>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 50%">Логин</div>
			<div class="table-column" style="width: 25%">Зарегистрирован</div>
			<div class="table-column" style="width: 25%">Заработано</div>
		</div>
	<?php
		$user_referrals = $pdo->query('SELECT * FROM users_referrals WHERE ref_id_first = '.intval($_POST['id']));
		$count_user_referrals = 0;
		while ($row = $user_referrals->fetch()) {
			$count_user_referrals++;
			$referral_info = users_search_id($row['user_id']);
	?>
			<div class="table-row">
				<div class="table-column" style="width: 50%">
					<span data-edit="users/edit_user" data-id="<?= $referral_info['id']; ?>">
						<?= $referral_info['login']; ?>
					</span>
				</div>
				<div class="table-column" style="width: 25%"><?= date('Y-m-d H:i', $referral_info['reg_date']); ?></div>
				<div class="table-column" style="width: 25%"><?= format_money($row['money_to_first']); ?></div>
			</div>
	<?php
		}
	?>
		<div class="table-row">
			<div class="table-column" style="width: 50%">Всего:</div>
			<div class="table-column" style="width: 25%"></div>
			<div class="table-column" style="width: 25%"><?= $count_user_referrals; ?></div>
		</div>
	</div>




<?php
}
?>