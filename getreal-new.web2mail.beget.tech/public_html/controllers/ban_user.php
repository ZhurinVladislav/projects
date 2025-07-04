<?php

$response['status'] = 0;

if ($user->is_logged() == true && $user->chat_moder == 1) {
	$ban_id = (int) $_POST['id'];

	//	чтобы админа не забанили
	if ($ban_id !== 1) {
		$ban = $pdo->query('UPDATE users SET can_communicate = 0 WHERE id = '.$ban_id);
		$response['status'] = 1;
	}
	
}

echo json_encode($response);