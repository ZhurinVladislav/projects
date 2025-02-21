<?php
	$code = 0;

	if (isset($_POST['login']) && $_POST['login'] == 'admin' && isset($_POST['password']) && !empty($_POST['password'])) {

		//	запрос в базу
		//	запись в сессиию
		//	редирект

		$login = trim(addslashes(htmlspecialchars($_POST['login'], ENT_QUOTES, '')));
		//	чистим пароль от мусора + хешируем с солью
		$password = hash('sha256', trim($_POST['password']));
		$password = hash('sha256', ($password . $pass_salt));

		$find_user = $pdo->prepare('SELECT * FROM users WHERE login LIKE ?');

		$find_user->execute(array('%'.$login.'%'));

		if (!is_bool($find_user_row = $find_user->fetch())) {
			if ($password == $find_user_row['password']) {

				$_SESSION['login'] = $login;
				$_SESSION['id'] = $find_user_row['id'];
				$_SESSION['admin_logged'] = true;
				$_SESSION['language'] = $languages[1];

				$log_ip = $pdo->query('INSERT INTO authorization_logs (user_id, ip, date) VALUES (1, "'.$_SERVER['REMOTE_ADDR'].'", '.time().')');

				$code = 1;
			} else {
				$code = 2;
			}
		} else {
			$code = 2;
		}

	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Adminko | <?= $site_name; ?></title>
	<base href="<?= $root_url; ?>adminko/">
	<link rel="stylesheet" href="/adminko/service/style.css">
</head>
<body class="login-page">
	
	<?php
		if ($code == 0) {
	?>
		<form class="login-form" method="post">
			<input type="text" name="login" placeholder="login" autofocus>
			<input type="password" name="password" placeholder="password">
			<button class="button-d" type="submit">Войти</button>
		</form>
	<?php
		} elseif ($code == 1) {
	?>
			<script>
				window.location = '/adminko/';
			</script>
	<?php
		} elseif ($code == 2) {
	?>
		<form class="login-form" method="post">
			<input type="text" name="login" placeholder="login" autofocus error>
			<input type="password" name="password" placeholder="password" error>
			<button class="button-d" type="submit">Войти</button>
		</form>
	<?php
		}
	?>


</body>
</html>