<?php

require_once './functions/users.php';
require_once './functions/tickets.php';

$ticket_id = (int) $_POST['items']['id'];
$text = clean_string(strip_tags($_POST['items']['text']));

$array = tickets_input_message($ticket_id, $text);

if ($array['status'] == 'ok') {

	$current_ticket_sql = $pdo->query('SELECT * FROM tickets WHERE id = '.$ticket_id);
	$current_ticket = $current_ticket_sql->fetch();

	// switch ($current_ticket['category']) {
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
	// 		$tickets_info['category'] = 'Забыли добавить новую тему для БОТА';
	// 		break;
	// }


	// $tickets_info['id'] = $current_ticket['id'];

	$find_user = users_search_id($current_ticket['user_id'], 'login');
	$login = $find_user['login'];

	// $tickets_info['login'] = $login;
	// $tickets_info['subject'] = $current_ticket['subject'];
	// $tickets_info['text'] = $text;
	// notify_new_tickets($tickets_info);

	$response['status'] = 'ok';
	$response['message'] = $array['message'];

	echo json_encode($response);
} else {
	echo '0';
}