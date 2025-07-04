<?php

require_once './pages/remind/'.$user->language.'.php';

// require_once './controllers/tickets/recaptchalib.php';

//	Генерация нового пароля
function generator($limit) {
	$password = '';

	$large='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$small='abcdefghijklmnopqrstuvwxyz';
	$numbers='1234567890';
	mt_srand((double) microtime() * 1000000);

	for ($i=0; $i < $limit; $i++) {

		$type = mt_rand(1,3);
		switch ($type) {
			case 1:
				$password .= $large[mt_rand(0,25)];
				break;
			case 2:
				$password .= $small[mt_rand(0,25)];
				break;
			case 3:
				$password .= $numbers[mt_rand(0,9)];
				break;
		}
	}
	return $password;
}

//	коды ответа
//	0 - дефолт
//	1 - успешное восстановление пароля
//	2 - не нашли пользователя
//	3 - письмо не отправили
//	4 - не прошел проверку капчей
//	5 - не получили капчу

//Captcha
// $secret = $captcha_keys['secret'];
// $response_captcha = null;
// $reCaptcha = new ReCaptcha($secret);


$response['status'] = 0;

if ($user->is_logged() === false) {

	// if ($_POST['captcha']) {
	// 	$response_captcha = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $_POST['captcha']);

	// 	if ($response_captcha != null && $response_captcha->success) {

			if (isset($_POST['login']) && isset($_POST['email'])) {

				$login = addslashes(htmlspecialchars(trim($_POST['login']), ENT_QUOTES, ''));
				$email = clean_string($_POST['email']);

				$find_user = $pdo->prepare('SELECT * FROM users WHERE login LIKE ? AND email LIKE ? LIMIT 1');
				$find_user->execute(array($login, $email));

				if (!is_bool($find_user_row = $find_user->fetch())) {

					$new_password = generator(8);

					$subject = 'Reset password on site '.$site_name;
					$body = '<p style="color: #fff; font-size: 18px;">Hello, '.$login.' </p>
					<p style="color: #fff">
						You have successfully reset your password in <a href="'.$root_url.'" style="color: #ffc90d; font-weight: 800;">'.$site_name.'</a>! <br>
						Your new password: '.$new_password.'
					</p>

					<p style="color: #fff">
						Sincerely, the administration of the project <a href="'.$root_url.'" style="color: #ffc90d; font-weight: 800;">'.$site_name.'</a>
					</p>';

					require_once './classes/PHPmailer.php';
					require_once './classes/Exception.php';
					require_once './classes/SMTP.php';
					require_once './functions/mail.php';

					if (send_mail($email, $subject, $body, 'support')) {
						$response['status'] = 'ok';
						$response['print'] = '
							<div class="remind__form-success_img"></div>

							<div class="remind__form-success_text">
								'.$_txt['text'].'
							</div>

							<div class="remind__form-success_btn">
								<a data-href="main" data-template="main">'.$_txt['btn_to_main'].'</a>
							</div>
						';

						$new_password = hash('sha256', trim($new_password));
						$new_password = hash('sha256', ($new_password . $pass_salt));
						
						$find_user = $pdo->prepare('UPDATE users SET password = ? WHERE login LIKE ?');
						$find_user->execute(array($new_password, $login));
					} else {
						$response['status'] = 'error';
						$response['code'] = '3';
						$code = 3;
					}
				} else {
					$response['status'] = 'error';
					$response['placeholder'] = 'error_login';
					$response['print'] = $_txt['error'][2];
				}
			}
	// 	} else {
	// 		$response['status'] = 'error';
	// 		$response['placeholder'] = 'error_captcha';
	// 		$response['print'] = $_txt['error'][4];
	// 	}
	// } else {
	// 	$response['status'] = 'error';
	// 	$response['placeholder'] = 'error_captcha';
	// 	$response['print'] = $_txt['error'][5];
	// }
}


echo json_encode($response);