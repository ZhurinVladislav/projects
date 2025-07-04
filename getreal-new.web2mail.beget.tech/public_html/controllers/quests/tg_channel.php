<?php

require_once './pages/bounty/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$nickname = addslashes(
		htmlspecialchars(
			html_remove_attributes(
				strip_tags(
					htmlspecialchars_decode(
						trim(
							$_POST['items']['nickname']
						)
					), '<img><br>'
				), ['src']
			)
		)
	);

	if ($nickname != '') {
		$can_send_report = true;
		$search_last_request = $pdo->query('SELECT * FROM quest_telegram_channel WHERE user_id = '.$user->id.' LIMIT 1');
		if (!is_bool($row = $search_last_request->fetch())) {
			$can_send_report = false;
		}
		if ($can_send_report == true) {

			$insert_link = $pdo->prepare('INSERT INTO quest_telegram_channel (user_id, nickname, date_created) VALUES (?, ?, ?)');
			$insert_link->execute(array($user->id, $nickname, time()));

			$response['status'] = 'ok';
			$response['print'] = '<div class="success-attr">
									<div class="success-attr__text">'.$_txt['send_success'].'</div>
								  </div>';

		} else {
			$response['status'] = 'fail';
			$response['error'] = 'quest_error';

			$response['print'] = '<div class="error-attr">
									<div class="error-attr__text">
										'.$_txt['telegram_channel']['error_1'].'		
									</div>
								  </div>';

		}
	}
}

echo json_encode($response);

