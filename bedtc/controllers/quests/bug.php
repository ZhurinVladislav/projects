<?php

require_once './pages/bounty/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$message = addslashes(
		htmlspecialchars(
			html_remove_attributes(
				strip_tags(
					htmlspecialchars_decode(
						trim(
							$_POST['items']['message']
						)
					), '<img><br>'
				), ['src']
			)
		)
	);

	if ($message != '') {
		$can_send_report = true;
		$search_last_request = $pdo->query('SELECT COUNT(id) AS total FROM quest_bug WHERE user_id = '.$user->id.' AND date_created > '.(time() - 86400));
		if (!is_bool($row = $search_last_request->fetch())) {
			if ($row['total'] >= 2) {
				$can_send_report = false;
			}
		}
		if ($can_send_report == true) {

			$insert_link = $pdo->prepare('INSERT INTO quest_bug (user_id, message, date_created) VALUES (?, ?, ?)');
			$insert_link->execute(array($user->id, $message, time()));

			$response['status'] = 'ok';
			$response['print'] = '<div class="success-attr">
									<div class="success-attr__text">'.$_txt['send_success'].'</div>
								  </div>';

		} else {
			$response['status'] = 'fail';
			$response['error'] = 'quest_error';

			$response['print'] = '<div class="error-attr">
									<div class="error-attr__text">
										'.$_txt['bug']['error_1'].'		
									</div>
								  </div>';

		}
	}
}

echo json_encode($response);

