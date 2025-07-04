<?php

function payments_get_list($table, int $status = 0, int $page = 1, int $limit = 0)
{
	global $pdo;

	$total_rows = $pdo->prepare('SELECT COUNT(id) as count FROM ' . $table . ' WHERE status = ?');
	$total_rows->execute(array($status));
	$count = $total_rows->fetch();
	$count = $count['count'];

	if ($count != 0) {
		$total = intval(($count - 1) / $limit) + 1;
		if ($page > $total) {
			$page = $total;
		}
		$start = $page * $limit - $limit;

		$items_list = $pdo->prepare('SELECT * FROM ' . $table . ' WHERE status = ? ORDER BY date_created DESC LIMIT ?, ?');
		$items_list->execute(array($status, $start, $limit));

		$items = array();
		while ($row = $items_list->fetch()) {
			$items[] = $row;
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

function payments_set_status(int $id, int $status, $type)
{
	global $pdo;

	if ($type == 'replenishment') {
		$query = $pdo->prepare('UPDATE replenishments SET status = ?, date_confirmed = ? WHERE id = ? LIMIT 1');

		// $get_payment = $pdo->query('SELECT amount_get, user_id FROM replenishments WHERE id = '.$id.' LIMIT 1');
		// $payment = $get_payment->fetch();

		// //	обновляем данные по общей сумме пополнений пользователя
		// if ($status == 1) {
		// 	$update_stat = $pdo->query('UPDATE users SET total_replenishments = total_replenishments + '.$payment['amount_get'].' WHERE id = '.$payment['user_id'].' LIMIT 1');
		// } else {
		// 	$update_stat = $pdo->query('UPDATE users SET total_replenishments = total_replenishments - '.$payment['amount_get'].' WHERE id = '.$payment['user_id'].' LIMIT 1');
		// }

	} elseif ($type == 'withdrawal') {
		$query = $pdo->prepare('UPDATE withdrawal SET status = ?, date_confirmed = ? WHERE id = ? LIMIT 1');

		// $get_payment = $pdo->query('SELECT amount, user_id FROM withdrawal WHERE id = '.$id.' LIMIT 1');
		// $payment = $get_payment->fetch();

		// //	обновляем данные по общей сумме выводов пользователя
		// if ($status == 1) {
		// 	$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$payment['amount'].' WHERE id = '.$payment['user_id'].' LIMIT 1');
		// } else {
		// 	$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal - '.$payment['amount'].' WHERE id = '.$payment['user_id'].' LIMIT 1');
		// }

	}

	return $query->execute(array($status, time(), $id));
}

function payments_mark_payed(int $id)
{
	global $pdo, $settings;

	payments_set_status($id, 1, 'replenishment');
	//	тут должно быть начисление реферальных
	$get_payment = $pdo->prepare('SELECT user_id, amount_get, action_percent FROM replenishments WHERE id = ? LIMIT 1');
	$get_payment->execute(array($id));
	$payment = $get_payment->fetch();

	//	проверяем акцию, плюсуем бонус к сумме к получению
	// if ($payment['user_id'] == 876) {
	if ($payment['action_percent'] > 0) {
		$payment['amount_get'] = format_money(round_money($payment['amount_get'] + ($payment['amount_get'] * $payment['action_percent'] / 100)));
	}
	// }

	//	начисляем деньги на счёт, обновляем статистику
	$charge_payment = $pdo->prepare('UPDATE users SET balance_buy = balance_buy + ?, total_replenishments = total_replenishments + ? WHERE id = ? LIMIT 1');
	$charge_payment->execute(array($payment['amount_get'], $payment['amount_get'], $payment['user_id']));

	$get_ref = $pdo->prepare('SELECT * FROM users_referrals WHERE user_id = ? LIMIT 1');
	$get_ref->execute(array($payment['user_id']));
	$referrals = $get_ref->fetch();

	if ($referrals['ref_id_first'] > 0) {
		$get_ref_first = $pdo->prepare('SELECT type, auto_ref_back FROM referrals_info WHERE user_id = ? LIMIT 1');
		$get_ref_first->execute(array($referrals['ref_id_first']));
		$ref_first = $get_ref_first->fetch();
		$type_first = (int) $ref_first['type'];
		$auto_ref_back_first = (int) $ref_first['auto_ref_back'];

		//	тип рефки у рефовода
		//	1 - обычный, 7%
		//	2 - повышенный, 15%
		//	3 - vip, 12% - раньше был, сейчас отключен
		if ($type_first == 1) {
			$koef_first = 0.07;
		} elseif ($type_first == 2) {
			$koef_first = 0.15;
			// } elseif ($type_first == 3) {
			// 	$koef_first = 0.12;
		}

		$money_to_first = format_money(round_money($payment['amount_get'] * $koef_first));

		//	проверяем авто-рефбек
		if ($auto_ref_back_first > 0) {
			$ref_back_money = format_money(round_money($money_to_first * $auto_ref_back_first / 100));
			$money_to_first = format_money(round_money($money_to_first - $ref_back_money));
		}

		//	начисляем реферальные
		$charge_first = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
		$charge_first->execute(array($money_to_first, $referrals['ref_id_first']));
		$update_ref_info_first = $pdo->prepare('UPDATE referrals_info SET money_earned_first = money_earned_first + ? WHERE user_id = ? LIMIT 1');
		$update_ref_info_first->execute(array($money_to_first, $referrals['ref_id_first']));
		$update_user_ref_info_first = $pdo->prepare('UPDATE users_referrals SET money_to_first = money_to_first + ? WHERE user_id = ? LIMIT 1');
		$update_user_ref_info_first->execute(array($money_to_first, $payment['user_id']));

		write_log($referrals['ref_id_first'], '03001', $money_to_first, $payment['user_id']);


		//	обновляем реферальный тариф, если возможно

		// if ($type_first == 1 || $type_first == 2) {
		// 	$get_ref_first_earned = $pdo->prepare('SELECT money_earned_first FROM referrals_info WHERE user_id = ? LIMIT 1');
		// 	$get_ref_first_earned->execute(array($referrals['ref_id_first']));
		// 	$ref_first_earned = $get_ref_first_earned->fetch();
		// 	if ($type_first == 1) {
		// 		if ($ref_first_earned >= format_money(10)) {
		// 			$pdo->query('UPDATE referrals_info SET type = 2 WHERE user_id = '.$referrals['ref_id_first']);
		// 		}
		// 	} elseif ($type_first == 2) {
		// 		if ($ref_first_earned >= format_money(50)) {
		// 			$pdo->query('UPDATE referrals_info SET type = 3 WHERE user_id = '.$referrals['ref_id_first']);
		// 		}
		// 	}
		// }

		//	начисляем рефбек если он есть
		if ($auto_ref_back_first > 0) {
			$charge_ref_back = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
			$charge_ref_back->execute(array($ref_back_money, $payment['user_id']));
			write_log($payment['user_id'], '03004', $ref_back_money);
		}
	}

	// if ($referrals['ref_id_second'] > 0) {
	// 	$get_ref_second = $pdo->prepare('SELECT type FROM referrals_info WHERE user_id = ? LIMIT 1');
	// 	$get_ref_second->execute(array($referrals['ref_id_second']));
	// 	$ref_second = $get_ref_second->fetch();
	// 	$type_second = (int) $ref_second['type'];

	// 	//	тип рефки у рефовода
	// 	//	1 - обычный, 3%
	// 	//	2 - повышенный, 3%
	// 	//	3 - vip, 3%
	// 	if ($type_second == 1) {
	// 		$koef_second = 0.03;
	// 	} elseif ($type_second == 2 || $type_second == 3) {
	// 		$koef_second = 0.03;
	// 	}

	// 	$money_to_second = format_money(round_money($payment['amount_get'] * $koef_second));

	// 	//	начисляем реферальные
	// 	$charge_second = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
	// 	$charge_second->execute(array($money_to_second, $referrals['ref_id_second']));
	// 	$update_ref_info_second = $pdo->prepare('UPDATE referrals_info SET money_earned_second = money_earned_second + ? WHERE user_id = ? LIMIT 1');
	// 	$update_ref_info_second->execute(array($money_to_second, $referrals['ref_id_second']));
	// 	$update_user_ref_info_second = $pdo->prepare('UPDATE users_referrals SET money_to_second = money_to_second + ? WHERE user_id = ? LIMIT 1');
	// 	$update_user_ref_info_second->execute(array($money_to_second, $payment['user_id']));

	// 	write_log($referrals['ref_id_second'], '03002', $money_to_second, $payment['user_id']);
	// }

	// if ($referrals['ref_id_third'] > 0) {
	// 	//	на 3 лвл всем начисляется по 1%
	// 	$koef_third = 0.01;

	// 	$money_to_third = format_money(round_money($payment['amount_get'] * $koef_third));

	// 	//	начисляем реферальные
	// 	$charge_third = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
	// 	$charge_third->execute(array($money_to_third, $referrals['ref_id_third']));
	// 	$update_ref_info_third = $pdo->prepare('UPDATE referrals_info SET money_earned_third = money_earned_third + ? WHERE user_id = ? LIMIT 1');
	// 	$update_ref_info_third->execute(array($money_to_third, $referrals['ref_id_third']));
	// 	$update_user_ref_info_third = $pdo->prepare('UPDATE users_referrals SET money_to_third = money_to_third + ? WHERE user_id = ? LIMIT 1');
	// 	$update_user_ref_info_third->execute(array($money_to_third, $payment['user_id']));

	// 	write_log($referrals['ref_id_third'], '03003', $money_to_third, $payment['user_id']);
	// }
}

//	$table может быть 'replenishments' или 'withdrawal'
function payments_get_sum($table, int $user_id, int $time_from = 0, $time_to = 0)
{
	global $pdo;

	$time_limit = '';
	if ($time_from > 0 && $time_to > 0) {
		$time_limit = ' AND date_created > ' . $time_from . ' AND date_created < ' . $time_to;
	} elseif ($time_from > 0) {
		$time_limit = ' AND date_created > ' . $time_from;
	} elseif ($time_to > 0) {
		$time_limit = ' AND date_created < ' . $time_to;
	}
	$get_payments = $pdo->query('SELECT SUM(amount_get) AS total FROM ' . $table . ' WHERE user_id = ' . $user_id . ' AND status = 1' . $time_limit);
	$payments = $get_payments->fetch();

	if ($payments['total'] != NULL) {
		$sum = format_money($payments['total']);
	} else {
		$sum = 0;
	}
	return $sum;
}

function verify_payeer($wallet)
{
	if (substr($wallet, 0, 1) != 'P') {
		return false;
	}

	if (!preg_match("/^[0-9]*$/", substr($wallet, 1))) {
		return false;
	}

	return $wallet;
}
