<?php

function user_set(int $user_id, $setting, $value) {
	global $pdo;

	$edit = $pdo->prepare('UPDATE users SET '.$setting.' = ? WHERE id = ?');
	if ($edit->execute(array($value, $user_id))) {
		return true;
	} else {
		return false;
	}
}

//	добавление к сумме потраченного и обновление уровня
function user_update_level($amount) {
	global $pdo, $user, $levels;
	
	$amount = format_money($amount);

	$user->total_spent = format_money(round_money($user->total_spent + $amount));
	$experience = intval($user->total_spent * 1000000);

	$new_level = 1;
	foreach ($levels as $key => $value) {
		if ($user->total_spent > format_money($value)) {
			$new_level = (int) $key + 1;
		}
	}

	//	если уровень обновился - записываем
	if ($new_level > $user->level) {
		$user->level = $new_level;
		$pdo->query('UPDATE users SET level = '.$user->level.', experience = '.$experience.', total_spent = total_spent + '.$amount.' WHERE id = '.$user->id);
	//	иначе просто обновляем кол-во потраченных денег
	} else {
		$pdo->query('UPDATE users SET experience = '.$experience.', total_spent = total_spent + '.$amount.' WHERE id = '.$user->id);
	}
}

//	отключение вывода средств пользователю
function user_disable_withdrawal($user_id) {
	if ($pdo->query('UPDATE users SET can_withdrawal = 0 WHERE id = '.$user_id.' LIMIT 1')) {
		return true;
	} else {
		return false;
	}
}
