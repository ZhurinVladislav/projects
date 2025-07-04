<?php

require_once './pages/bounty/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$link = clean_string($_POST['items']['link']);

	//	проверяем дату последнего выполнения квеста
	$search_last_request = $pdo->prepare('SELECT date_created, status FROM quest_article WHERE user_id = ? ORDER BY date_created DESC LIMIT 1');
	$search_last_request->execute(array($user->id));

	$last_requets = $search_last_request->fetch();

	if ($last_requets === false || $last_requets['date_created'] < (time() - 2592000)) {
		$insert_link = $pdo->prepare('INSERT INTO quest_article (user_id, link, date_created) VALUES (?, ?, ?)');
		$insert_link->execute(array($user->id, $link, time()));

		$response['status'] = 'ok';
		$response['print'] = '<div class="success-attr">
					<div class="success-attr__text">'.$_txt['send_success'].'</div>
				</div>';
	}

}

echo json_encode($response);