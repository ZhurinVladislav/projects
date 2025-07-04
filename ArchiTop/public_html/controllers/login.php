<?php

require_once './pages/login/'.$user->language.'.php';

// require_once './controllers/tickets/recaptchalib.php';

// global $captcha_keys;
//	коды ответа
//	0 - дефолт
//	1 - успешная авторизация
//	2 - неправильный логин
//	3 - неправильный пароль
//	4 - не прошел проверку капчей
//	5 - не получили капчу

// captcha
// $captcha = $_POST['captcha'];
// $response_captcha = null;
// $reCaptcha = new ReCaptcha($captcha_keys['secret']);

$response['status'] = 0;

// if ($captcha) {
// 	$response_captcha = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $captcha);

// 	if ($response_captcha != null && $response_captcha->success) {

		if ($user->is_logged() == false) {
			if (isset($_POST['email']) && isset($_POST['password'])) {
				$email = addslashes(htmlspecialchars(trim($_POST['email']), ENT_QUOTES, ''));
				//	чистим пароль от мусора + хешируем с солью
				global $pass_salt;
				$password = hash('sha256', trim($_POST['password']));
				$password = hash('sha256', ($password . $pass_salt));

				$find_user = $pdo->prepare('SELECT * FROM users WHERE email LIKE ? LIMIT 1');

				$find_user->execute(array($email));

				if (!is_bool($find_user_row = $find_user->fetch())) {
					if ($password == $find_user_row['password']) {
						$user->load_data($find_user_row['login']);

						$log_ip = $pdo->query('INSERT INTO authorization_logs (user_id, ip, date) VALUES ('.$user->id.', "'.$_SERVER['REMOTE_ADDR'].'", '.time().')');

						$response['status'] = 'ok';

					} else {
						$response['status'] = 'error';
						$response['placeholder'] = 'error_password';
						$response['print'] = $_txt['error_password'];
					}

				} else {
					$response['status'] = 'error';
					$response['placeholder'] = 'error_email';
					$response['print'] = $_txt['error_login'];
				}
			}
		}

// 	} else {
// 		$code = 4;
// 		// Капча не совпадает
// 	}
// } else {
// 	$code = 5;
// 	//Не получили капчу
// }

echo json_encode($response);