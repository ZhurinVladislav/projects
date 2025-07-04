<?php

$response['status'] = 0;

if ($user->is_logged() == true) {

	list($time_y, $time_m, $time_d) = explode('-', date('Y-m-d', time()));
	$current_day = mktime(0, 0, 0, $time_m, $time_d, $time_y);

	$get_user_game_stat = $pdo->query('SELECT * FROM game_tiles_sessions WHERE user_id = '.$user->id.' AND date = '.$current_day.' AND result = 1 LIMIT 1');
	
	if (is_bool($user_game_stat = $get_user_game_stat->fetch())) {
		
		$reward = format_money(0.00000040);

		$update_stat = $pdo->query('UPDATE project_statistics SET value = value + 1 WHERE name LIKE "total_games_played" LIMIT 1');

		$write_user_game_stat = $pdo->prepare('INSERT INTO game_tiles_sessions (user_id, date, result) VALUES (?, ?, ?)');
		$write_user_game_stat->execute(array($user->id, $current_day, 1));

		$session_id = $pdo->lastInsertId();

		update_balance($user->id, 'buy', '+', format_money($reward));

		write_log($user->id, '07031', format_money($reward), $session_id);

		$response['status'] = 'ok';

	} else {
		$response['status'] = 'fail';
	}

} else {
	$response['status'] = 'need_login';
}

$response['status'] = 'ok';

echo json_encode($response);