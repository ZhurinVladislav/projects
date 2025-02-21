<?php

function tickets_get_list(int $status = 1, $page = 1, $limit = 0) {
	global $pdo;

	$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM tickets WHERE status = ?');
	$total_rows->execute(array($status));
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM tickets WHERE status = ? ORDER BY date DESC LIMIT ?, ?');
		$items_list->execute(array($status, $start, $limit));

		$items = array();
		while ($item = $items_list->fetch()) {
			$items[] = $item;
		}
		$array['items'] = $items;

		$pagination = array();

		$pagination['prev'] = $page != 1 ? $page - 1 : false;
		$pagination['minustwo'] = $page - 2 > 0 ? $page - 2 : false;
		$pagination['minusone'] = $page - 1 > 0 ? $page - 1 : false;
		$pagination['current'] = $page;
		$pagination['plusone'] = $page + 1 <= $total ? $page + 1 : false;
		$pagination['plustwo'] = $page + 2 <= $total ? $page + 2 : false;
		$pagination['next'] = $page != $total ? $page + 1 : false;

		$array['pagination'] = $pagination;

		return $array;

	} else {
		return 'empty';
	}
}

function tickets_get_list_user(int $user_id) {
	global $pdo;

	$array = array();

	$items_list = $pdo->prepare('SELECT * FROM tickets WHERE user_id = ? ORDER BY id DESC');
	$items_list->execute(array($user_id));
	while ($tickets_list_row = $items_list->fetch()) {
		$array[] = $tickets_list_row;
	}
	return $array;
}

function tickets_get_ticket(int $id) {
	global $pdo;

	$array = array();

	$ticket = $pdo->prepare('SELECT * FROM tickets WHERE id = ? ORDER BY id DESC');
	$ticket->execute(array($id));
	$array = $ticket->fetch();

	$ticket_messages = $pdo->prepare('SELECT * FROM tickets_messages WHERE ticket_id = ? ORDER BY id DESC');
	$ticket_messages->execute(array($array['id']));

	while ($message = $ticket_messages->fetch()) {
		$array['messages'][] = $message;
	}
	return $array;
}

function tickets_input_message($id, $text, $answer = 0) {
	global $user, $pdo;


	if ($_SESSION['admin_logged'] == true || $user->is_logged()) {
		$find_ticket = $pdo->prepare('SELECT * FROM tickets WHERE id = ?');
		$find_ticket->execute(array($id));

		$ticket_messages = $pdo->prepare('SELECT * FROM tickets_messages WHERE ticket_id = ? ORDER BY id DESC LIMIT 1');
		$ticket_messages->execute(array($id));

		$last_message = $ticket_messages->fetch();
		$is_answer = $last_message['is_answer'];

		//	проверяем, найден ли такой тикет и чтобы отправитель запроса был владельцем тикета или уполномоченным лицом
		if (
			!is_bool($ticket_info = $find_ticket->fetch()) &&
			($answer == 1 || $ticket_info['user_id'] == $user->id)
		) {
			$add_message = $pdo->prepare('INSERT INTO tickets_messages (ticket_id, message, date, is_answer) VALUES (?, ?, ?, ?)');
			if ($add_message->execute(array($id, $text, time(), $answer))) {
				if ($answer == 1) {
					$set_status = $pdo->prepare('UPDATE tickets SET status = 2 WHERE id = ?');
					$set_status->execute(array($id));
				} else {
					$set_status = $pdo->prepare('UPDATE tickets SET status = 1 WHERE id = ?');
					$set_status->execute(array($id));
				}

				if ($is_answer == 1) {
					$last_sender = 3;
				} else {
					$last_sender = $user->id;
				}


				$find_user = users_search_id($ticket_info['user_id']);

				if ($find_user['avatar'] != '0') {
					$avatar = '<img src="/images/avatars/'.$find_user['id'].'.'.$find_user['avatar'].'">';
				} else {
					$avatar = '<img src="/app/images/avatar-default.png">';
				}

				$login = $find_user['login'];
				$level = $find_user['level'];

				$array['status'] = 'ok';

				if ($_SESSION['admin_logged'] == false) {
					require_once './pages/tickets/'.$user->language.'.php';
				}

				if ($last_sender == $user->id) {
					$current_user = 'current_user';
					
				} else {
					$current_user = '';
				}
				
				$array['message'] = '
					<div class="chat__item '.$current_user.'">
						<div class="chat__item-head">
							<div class="chat__item-head_avatar">'.$avatar.'</div>
							<div class="chat__item-head_info">
								<div class="left">
									<div class="login">'.$login.'</div>
									<div class="level">'.$_txt['chat']['level'].' '.$level.'</div>
								</div>

								<div class="right">
									<div class="date">'.date('d.m.y H:i', time()).'</div>
								</div>
							</div>
						</div>

						<div class="chat__item-body">'.stripslashes($text).'</div>
					</div>
				';
				

				return $array;
			} else {
				return 2;
			}
		} else {
			return 3;
		}
	} else {
		return 4;
	}
}

//	$admin - указывает на то, что тикет закрыт админом
function tickets_close_ticket(int $id) {
	global $pdo;

	if ($_SESSION['admin_logged'] == true || $user->is_logged()) {
		$find_ticket = $pdo->prepare('SELECT * FROM tickets WHERE id = ?');
		$find_ticket->execute(array($id));

		if (
			!is_bool($ticket_info = $find_ticket->fetch()) &&
			($_SESSION['admin_logged'] == true || $ticket_info['user_id'] == $user->id)
		) {
			$delete_ticket = $pdo->prepare('UPDATE tickets SET status = 4 WHERE id = ?');
			if ($delete_ticket->execute(array($id))) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}