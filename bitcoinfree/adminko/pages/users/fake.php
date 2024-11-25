<?php

// require_once '../functions/faq.php';

if ($_POST['action'] == 'add') {
	$work_status = 0;

	ini_set('display_errors', 1);

	$login = addslashes(htmlspecialchars(trim($_POST['data']['login']), ENT_QUOTES, ''));
	$password = hash('sha256', trim($login.mb_strimwidth(time(), 0, 5)));
	$password = hash('sha256', ($password . $pass_salt));
	$email = clean_string($login.'@asd.com');
	$pin = '1212';

	$find_user = $pdo->prepare('SELECT * FROM users WHERE login LIKE ?');
	$find_user->execute(array('%'.$login.'%'));

	if ($find_user_row = $find_user->fetch() === false) {

		$find_user = $pdo->prepare('SELECT * FROM users WHERE email LIKE ?');

		$find_user->execute(array('%'.$email.'%'));

		if ($find_user_row = $find_user->fetch() === false) {

			$register_user = $pdo->prepare('INSERT INTO users (login, password, pin, email, reg_date, fake) VALUES (?, ?, ?, ?, ?, ?)');

			if ($register_user->execute(array($login, $password, $pin, $email, time(), 1))) {

				$new_user_id = $pdo->lastInsertId();
				
				//	добавляем записи в служебные таблицы и обновляем статистику
				$create_wallets = $pdo->query('INSERT INTO users_wallets (user_id) VALUES ('.$new_user_id.')');
				$create_ref_info = $pdo->query('INSERT INTO referrals_info (user_id) VALUES ('.$new_user_id.')');
				$update_users_counter = $pdo->query('UPDATE project_statistics SET value = value + 1 WHERE name LIKE "users_total" LIMIT 1');
				
				$work_status = 1;

			} else {
				$work_status = 7;
			}
		} else {
			$work_status = 9;
		}
	} else {
		$work_status = 2;
	}

	echo $work_status;
}

if ($_POST['action'] == 'get_page') {
?>

<form class="form-default form-add" data-page-handler="users/fake">
	<button type="button" class="button-d" data-open-form>Добавить</button>
	<div class="form-hidden-section">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Логин</span>
				<input class="form-item__input" type="text" name="login">
				<span class="form-item__description"></span>
			</label>
		</div>
		<br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
		<hr>
	</div>
	<br><br>
</form>

<div class="table-default">
	<div class="table-row table-header">
		<div class="table-column" style="width: 80%">Логин</div>
		<div class="table-column" style="width: 20%">Дата регистрации</div>
	</div>
	<?php
		$get_list = $pdo->query('SELECT id, login, reg_date FROM users WHERE fake = 1 ORDER BY reg_date DESC');
		$list = $get_list->fetchAll();
		
		foreach ($list as $key => $value) {
	?>
		<div class="table-row">
			<div class="table-column" style="width: 80%">
				<span data-edit="users/edit_user" data-id="<?= $value['id']; ?>"><?= $value['login']; ?></span>
			</div>
			<div class="table-column" style="width: 20%"><?= date('d.m.y H:i', $value['reg_date']); ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>