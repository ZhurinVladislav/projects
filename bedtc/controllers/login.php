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

$g_code = addslashes(htmlspecialchars(trim($_POST['g_code']), ENT_QUOTES, ''));

// if (isset($captcha) || $g_code !== 'false') {
// 	$response_captcha = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $captcha);

// 	if (($response_captcha != null && $response_captcha->success) || $g_code !== 'false') {

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
						if ($find_user_row['g_auth'] == 1) {
							if ($g_code === 'false') {
								$response['status'] = 'need_g_auth';
							} else {
								require_once './classes/FixedBitNotation.php';
								require_once './classes/GoogleAuthenticatorInterface.php';
								require_once './classes/GoogleAuthenticator.php';

								$g = new \Sonata\GoogleAuthenticator\GoogleAuthenticator();

								if ($g->checkCode($find_user_row['g_auth_secret'], $g_code)) {
									$user->load_data($find_user_row['login']);

									$log_ip = $pdo->query('INSERT INTO authorization_logs (user_id, ip, date) VALUES ('.$user->id.', "'.$_SERVER['REMOTE_ADDR'].'", '.time().')');

									$update_last_access = $pdo->query('UPDATE users SET access_date = '.time().' WHERE id = '.$user->id.' LIMIT 1');

									$response['status'] = 'ok';
									$response['location'] = 'home';
								} else {
									$response['status'] = 'error';
									$response['placeholder'] = 'error_g_code';
									$response['print'] = $_txt['error_g_code'];
								}
							}
						} else {
							$user->load_data($find_user_row['login']);

							$log_ip = $pdo->query('INSERT INTO authorization_logs (user_id, ip, date) VALUES ('.$user->id.', "'.$_SERVER['REMOTE_ADDR'].'", '.time().')');

							$response['status'] = 'ok';
							$response['location'] = 'home';
						}

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