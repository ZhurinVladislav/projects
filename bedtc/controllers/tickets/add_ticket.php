<?php

//	коды ответа
//	0 - дефолт
//	1 - успешное создание тикета
//	2 - неправильный логин

//require_once './controllers/tickets/recaptchalib.php';
require_once './pages/tickets/'.$user->language.'.php';

//require_once './functions/bot.php';

$response['status'] = 0;
$tickets_info = array();

//Captcha
$secret = $captcha_keys['secret'];
$response_captcha = null;
//$reCaptcha = new ReCaptcha($secret);

//if ($_POST['items']['g-recaptcha-response']) {
//	$response_captcha = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $_POST['items']['g-recaptcha-response']);

//	if ($response_captcha != null && $response_captcha->success) {

		$user_login = clean_string(strip_tags($_POST['items']['login']));
		$user_email = clean_string(strip_tags($_POST['items']['email']));
		$ticket_subject = clean_string(strip_tags($_POST['items']['subject']));
		$ticket_text = clean_string(strip_tags($_POST['items']['text']));
		$ticket_category = (int) $_POST['items']['category'];

		$response['login'] = $user_login;

		//	определяем id пользователя
		if ($user->is_logged() === true) {
			$user_id = $user->id;
		} else {
			$find_user = $pdo->prepare('SELECT id FROM users WHERE login LIKE ? LIMIT 1');
			$find_user->execute(array('%'.$user_login.'%'));

			if (!is_bool($find_user_row = $find_user->fetch())) {
				$user_id = $find_user_row['id'];
			} else {
				$find_user = $pdo->prepare('SELECT id FROM users WHERE email LIKE ? LIMIT 1');
				$find_user->execute(array('%'.$user_email.'%'));
				
				if (!is_bool($find_user_row = $find_user->fetch())) {
					$user_id = $find_user_row['id'];
				} else {
					$response['status'] = 'fail';
				}
			}
		}

		//	если определили пользователя, добавляем тикет и первое сообщение
		if ($response['status'] !== 'fail') {
			$add_ticket = $pdo->prepare('INSERT INTO tickets (user_id, subject, date, category) VALUES (?, ?, ?, ?)');
			if ($add_ticket->execute(array($user_id, $ticket_subject, time(), $ticket_category))) {
				$add_message = $pdo->prepare('INSERT INTO tickets_messages (ticket_id, message, date) VALUES (?, ?, ?)');
				if ($add_message->execute(array($pdo->lastInsertId(), $ticket_text, time()))) {

					// switch ($ticket_category) {
					// 	case '1':
					// 		$tickets_info['category'] = 'Общие вопросы';
					// 		break;

					// 	case '2':
					// 		$tickets_info['category'] = 'Проблемы со входом в аккаунт';
					// 		break;

					// 	case '3':
					// 		$tickets_info['category'] = 'Платежи';
					// 		break;

					// 	case '4':
					// 		$tickets_info['category'] = 'Промоутер';
					// 		break;

					// 	default:
					// 		$tickets_info['category'] = 'Забыли добавить новую тему';
					// 		break;
					// }
					
					$last_ticket_sql = $pdo->query('SELECT * FROM tickets ORDER BY id DESC LIMIT 1');
					$last_ticket = $last_ticket_sql->fetch();

					// $tickets_info['id'] = $last_ticket['id'];
					// $tickets_info['login'] = $user_login;
					// $tickets_info['subject'] = $ticket_subject;
					// $tickets_info['text'] = $ticket_text;
					// notify_new_tickets($tickets_info);

                    $response['redirect_to'] = 'tickets?ticket_id=' . $last_ticket['id'];
					$response['status'] = 'ok';
					$response['print'] = '<div class="success-attr small">
											<div class="success-attr__text">'.$_txt['send_ticket']['success'].'</div>
									  </div>';
				}
			}
		}

//	} else {
//		$response['status'] = 'fail';
//		$response['error'] = 'send_ticket_error';
//		$response['print'] = '<div class="error-attr">
//								<div class="error-attr__text">'.$_txt['send_ticket']['error_1'].'</div>
//						  </div>';
//	}
//} else {
//	$response['status'] = 'fail';
//	$response['error'] = 'send_ticket_error';
//	$response['print'] = '<div class="error-attr">
//								<div class="error-attr__text">'.$_txt['send_ticket']['error_2'].'</div>
//						  </div>';
//}

echo json_encode($response);