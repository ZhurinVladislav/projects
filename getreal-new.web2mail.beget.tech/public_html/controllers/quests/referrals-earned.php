<?php

$response['status'] = 0;

if ($user->is_logged() == true) {

	//	проверяем дату последнего выполнения квеста
	$search_last_request = $pdo->prepare('SELECT date, status FROM quest_ref_earned WHERE user_id = ? ORDER BY date DESC LIMIT 1');
	$search_last_request->execute(array($user->id));

	$last_requets = $search_last_request->fetch();

	if ($last_requets === false || $last_requets['date'] < (time() - 3600)) {

		//	собираем инфу по заработанному с рефералов
		$get_ref_info = $pdo->prepare('SELECT money_earned_first, money_earned_second, money_earned_third AS total FROM referrals_info WHERE user_id = ? LIMIT 1');
		$get_ref_info->execute(array($user->id));

		$ref_info = $get_ref_info->fetch();
		$total_earned = format_money($ref_info['money_earned_first'] + $ref_info['money_earned_second'] + $ref_info['money_earned_third']);

		//	проверяем, заработал ли нужную сумму
		if ($total_earned > (format_money(0.02))) {
			$insert_link = $pdo->prepare('INSERT INTO quest_ref_earned (user_id, date) VALUES (?, ?)');
			$insert_link->execute(array($user->id, time()));

			$response['status'] = 'ok';
		} else {
			$response['status'] = 2;
			$response['text'] = 'not enough money earned';
		}

	} else {
		$response['status'] = 2;
		$response['text'] = 'not enough time since the last execution';
	}

}

echo json_encode($response);