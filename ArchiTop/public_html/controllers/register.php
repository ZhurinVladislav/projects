<?php

require_once './pages/registration/'.$user->language.'.php';

//	коды ответа
//	0 - дефолт
//	1 - успешная регистрация
//	2 - пользователь уже существует
//	3 - ошибка записи в базу

// ini_set('display_errors', 1);

$response['status'] = 0;

if ($user->is_logged() == false) {
	if (!isset($_POST['login']) || $_POST['login'] == '') {

		$response['status'] = 6;

	} elseif (preg_match("/^[a-z0-9]{3,20}$/i", $_POST['login']) === 0) {

		$response['status'] = 'error';
		$response['placeholder'] = 'error_login';
		$response['print'] = $_txt['error_login_symbols'];

	} elseif (preg_match('/[а-яА-ЯёЁ]/', $_POST['login']) == 1) {
		
		$response['status'] = 'error';
		$response['placeholder'] = 'error_login';
		$response['print'] = $_txt['error_login_cyrillic'];

	} elseif (!isset($_POST['password']) || $_POST['password'] == '') {

		$response['status'] = 6;

	} elseif (!isset($_POST['password_confirm']) || $_POST['password_confirm'] == '') {

		$response['status'] = 6;

	} elseif ($_POST['password'] != $_POST['password_confirm']) {
		
		$response['status'] = 'error';
		$response['placeholder'] = 'error_password_match';
		$response['print'] = $_txt['error_password_match'];

	} elseif (!isset($_POST['email']) || $_POST['email'] == '') {

		$response['status'] = 6;

	} elseif (!isset($_POST['pin']) || $_POST['pin'] == '') {

		$response['status'] = 6;

	} elseif (!preg_match('/^[0-9]{4,6}$/', $_POST['pin'])) {

		$response['status'] = 'error';
		$response['placeholder'] = 'error_pin_type';
		$response['print'] = $_txt['error_pin_type'];

	} elseif (!isset($_POST['pin_confirm']) || $_POST['pin_confirm'] == '') {
		$response['status'] = 6;
	} elseif ($_POST['pin'] != $_POST['pin_confirm']) {
		
		$response['status'] = 'error';
		$response['placeholder'] = 'error_pin_match';
		$response['print'] = $_txt['error_pin_match'];

	} else {
		$login = addslashes(htmlspecialchars(trim($_POST['login']), ENT_QUOTES, ''));
		//	пароль для отправки по почте
		$password_for_email = trim($_POST['password']);
		//	чистим пароль от мусора + хешируем с солью
		$password = hash('sha256', trim($_POST['password']));
		$password = hash('sha256', ($password . $pass_salt));

		$email = clean_string($_POST['email']);

		$pin = (int) $_POST['pin'];

		$find_user = $pdo->prepare('SELECT * FROM users WHERE login LIKE ?');

		$find_user->execute(array('%'.$login.'%'));

		if ($find_user_row = $find_user->fetch() === false) {

			$find_user = $pdo->prepare('SELECT * FROM users WHERE email LIKE ?');

			$find_user->execute(array('%'.$email.'%'));

			if ($find_user_row = $find_user->fetch() === false) {

				$register_user = $pdo->prepare('INSERT INTO users (login, password, pin, email, reg_date) VALUES (?, ?, ?, ?, ?)');

				if ($register_user->execute(array($login, $password, $pin, $email, time()))) {
					$user->load_data($login);

					$log_ip = $pdo->query('INSERT INTO authorization_logs (user_id, ip, date) VALUES ('.$user->id.', "'.$_SERVER['REMOTE_ADDR'].'", '.time().')');

					//	добавляем записи в служебные таблицы и обновляем статистику
					$create_wallets = $pdo->query('INSERT INTO users_wallets (user_id) VALUES ('.$user->id.')');
					$create_ref_info = $pdo->query('INSERT INTO referrals_info (user_id) VALUES ('.$user->id.')');
					$update_users_counter = $pdo->query('UPDATE project_statistics SET value = value + 1 WHERE name LIKE "users_total" LIMIT 1');

					//	махинации с рефералкой
					if (isset($_COOKIE['referal'])) {
						$ref_id_first = (int) $_COOKIE['referal'];
						$ref_source = mb_strimwidth(clean_string($_COOKIE['referal_source']), 0, 10);
						if (isset($_COOKIE['referal_url'])) {
							$ref_url = clean_string($_COOKIE['referal_url']);
						} else {
							$ref_url = '';
						}
						

						if ($ref_id_first > 0) {
							$find_ref_id = $pdo->prepare('SELECT ref_id_first, ref_id_second FROM users_referrals WHERE user_id = ? LIMIT 1');
							$find_ref_id->execute(array($ref_id_first));
							$ref_account_id = $find_ref_id->fetch();

							$ref_id_second = $ref_account_id['ref_id_first'];
							$ref_id_third = $ref_account_id['ref_id_second'];

							if ($ref_id_second === NULL) {
								$ref_id_second = 0;
							}
							if ($ref_id_third === NULL) {
								$ref_id_third = 0;
							}

							$write_ref = $pdo->prepare('INSERT INTO users_referrals (user_id, ref_id_first, ref_id_second, ref_id_third, source, url) VALUES (?, ?, ?, ?, ?, ?)');
							$write_ref->execute(array($user->id, $ref_id_first, $ref_id_second, $ref_id_third, $ref_source, $ref_url));

							$update_regcounter_first = $pdo->prepare('UPDATE referrals_info SET referrals_first = referrals_first + 1 WHERE user_id = ?');
							$update_regcounter_first->execute(array($ref_id_first));

							//	https://scam-game.com/?r=1&s=ref

							//	отправляем сообщение в лс, если оно есть
								
							$get_message = $pdo->query('SELECT message_'.$user->language.' FROM referrals_messages WHERE user_id = '.$ref_id_first);
							if (!is_bool($message = $get_message->fetch()) && ($message['message_'.$user->language] !== '' || $message['message_en'] !== '')) {
								
								if ($message['message_'.$user->language] !== '') {
									$message_text = $message['message_'.$user->language];
								} else {
									$message_text = $message['message_en'];
								}

								$add_message = $pdo->prepare('INSERT INTO messages (from_id, to_id, text, date) VALUES (?, ?, ?, ?)');
								$add_message->execute(array($ref_id_first, $user->id, $message_text, time()));
								
								$create_cache = $pdo->prepare('INSERT INTO messages_cache (first_id, second_id, from_id, text, date) VALUES (?, ?, ?, ?, ?)');
								$create_cache->execute(array($ref_id_first, $user->id, $ref_id_first, $message_text, time()));

							}

							if ($ref_id_second > 0) {
								$update_regcounter_second = $pdo->prepare('UPDATE referrals_info SET referrals_second = referrals_second + 1 WHERE user_id = ?');
								$update_regcounter_second->execute(array($ref_id_second));
							}
							if ($ref_id_third > 0) {
								$update_regcounter_third = $pdo->prepare('UPDATE referrals_info SET referrals_third = referrals_third + 1 WHERE user_id = ?');
								$update_regcounter_third->execute(array($ref_id_third));
							}
						}
					}

					$subject = 'Welcome to '.$site_name;

					$email_hash = md5($email.'emailconfirm'.$email_salt);
					$confirm_link = $root_url.'email_confirm.php?email='.$email.'&hash='.$email_hash;
					$body = '
						<h1 style="margin-bottom: 37px; color: #ffc90d; font-size: 30px; text-align: center; letter-spacing: 0.13em;">Welcome to<br>'.$site_name.'</h1>
							
						<p style="margin-top: 0; margin-bottom: 0; color: #f5f4eb; font-size: 14px; font-weight: 700; line-height: 25px; font-family: Courier, arial;">
							Congratulations on your successful registration in <a style="color: #ffc90d; text-decoration: underline;" href="'.$root_url.'">'.$site_name.'</a>
							<br><br>
							To become a full member of the project, please confirm your mail
						</p>
						
						<a href="'.$confirm_link.'" style="display: block; width: 235px; margin-top: 55px; margin-bottom: 60px; color: #f5f4eb; font-size: 14px; font-weight: 700; font-family: Courier, arial; line-height: 13px; text-decoration: none;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="235">
								<tr>
									<td width="5" height="5"></td>
									<td width="5" height="5" style="background-color: #265276; border-top-left-radius: 5px;"></td>
									<td width="210" height="5" style="background-color: #265276;"></td>
									<td width="5" height="5" style="background-color: #265276;"></td>
									<td width="5" height="5" style="background-color: #265276; border-top-right-radius: 5px;"></td>
								</tr>
								<tr>
									<td width="5" height="5" style="background-color: #318dbf; border-top-left-radius: 5px;"></td>
									<td width="5" height="5" style="background-color: #318dbf;"></td>
									<td width="210" height="5" style="background-color: #318dbf;"></td>
									<td width="5" height="5" style="background-color: #265276;">
										<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="5">
											<tr>
												<td width="5" height="5" style="background-color: #318dbf; border-top-right-radius: 5px;"></td>
											</tr>
										</table>
									</td>
									<td width="5" height="5" style="background-color: #265276;"></td>
								</tr>
								<tr>
									<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="18" border="0" align="center" style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding-top: 5px; color: #f5f4eb; font-size: 14px; font-weight: 700; font-family: Courier, arial; line-height: 13px; text-decoration: none; background-color: #318dbf;">Let&apos;s go!</td>
									<td width="5" height="18" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="18" border="0" style="background-color: #265276;"></td>
								</tr>
								<tr>
									<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" align="center" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" style="background-color: #265276; border-bottom-right-radius: 5px;"></td>
								</tr>
								<tr>
									<td width="5" height="5" border="0" style="background-color: #318dbf; border-bottom-left-radius: 5px;"></td>
									<td width="5" height="5" border="0" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" align="center" style="background-color: #318dbf;"></td>
									<td width="5" height="5" border="0" style="background-color: #318dbf; border-bottom-right-radius: 5px;"></td>
									<td width="5" height="5" border="0"></td>
								</tr>
							</table>
						</a>

						<p>
							Can\'t see the button? Follow this link:<br>
							<a href="'.$confirm_link.'"></a>
						</p>

						<h2 style="font-size: 20px;">Login details:</h2>
						<p style="margin-top: 0; margin-bottom: 0; color: #f5f4eb; font-size: 14px; font-weight: 700; line-height: 25px; font-family: Courier, arial;">
							Login: <span style="color: #ffc90d">'.$login.'</span>
							<br>
							Password: <span style="color: #ffc90d">'.$password_for_email.'</span>
							<br>
							PIN-code: <span style="color: #ffc90d">'.$pin.'</span>
							<br><br>
							<span style="color: #ffc90d">Please keep your username, password and PIN-code specified during registration in a safe place. PIN-code recovery is impossible!</span>
						</p>
					';
					
					require_once './classes/PHPmailer.php';
					require_once './classes/Exception.php';
					require_once './classes/SMTP.php';
					require_once './functions/mail.php';

					if (send_mail($email, $subject, $body)) {
						$response['status'] = 'ok';
					} else {
						// $response['status'] = 8;
						$response['status'] = 'ok';
						$pdo->query('UPDATE project_statistics SET value = value + 1 WHERE name LIKE "mails_unsended_register" LIMIT 1');
					}
					
				} else {
					$response['status'] = 7;
				}
			} else {
				$response['status'] = 'error';
				$response['placeholder'] = 'error_email';
				$response['print'] = $_txt['error_email_exist'];
			}
		} else {
			$response['status'] = 'error';
			$response['placeholder'] = 'error_login';
			$response['print'] = $_txt['error_login_exist'];
		}
	}
}

echo json_encode($response);
