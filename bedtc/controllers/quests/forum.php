<?php

require_once './pages/bounty/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$link = clean_string($_POST['items']['link']);

	//	проверяем ссылку
	if (strpos($link, 'mmgp.com') !== false) {

		//	проверяем дату последнего выполнения квеста
		$search_last_request = $pdo->prepare('SELECT date_created, status FROM quest_forum WHERE user_id = ? ORDER BY date_created DESC LIMIT 1');
		$search_last_request->execute(array($user->id));

		$last_requets = $search_last_request->fetch();

		if ($last_requets === false || $last_requets['date_created'] < (time() - 604800)) {
			$insert_link = $pdo->prepare('INSERT INTO quest_forum (user_id, link, date_created) VALUES (?, ?, ?)');
			$insert_link->execute(array($user->id, $link, time()));

			$response['status'] = 'ok';
			$response['print'] = '<div class="success-attr">
						<div class="success-attr__text">'.$_txt['send_success'].'</div>
					  </div>';
					  
		} else {
			$response['status'] = 'fail';
			$response['error'] = 'quest_error';
			$response['print'] = '<div class="error-attr">
									<div class="error-attr__text">
										'.$_txt['forum']['error_1'].'		
									</div>
								  </div>';
		}

	} else {
		$response['status'] = 'fail';
		$response['error'] = 'quest_error';
		$response['print'] = '<div class="error-attr">
								<div class="error-attr__text">
									'.$_txt['forum']['error_2'].'		
								</div>
							  </div>';
	}

}

echo json_encode($response);