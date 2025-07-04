<?php

require_once './pages/reviews/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true && $user->can_communicate == 1) {
	$review_text = addslashes(
		htmlspecialchars(
			html_remove_attributes(
				strip_tags(
					htmlspecialchars_decode(
						trim(
							$_POST['items']['text']
						)
					), '<br>'
				), ['src']
			)
		)
	);
	if ($review_text != '') {
		$add_review = $pdo->prepare('INSERT INTO reviews (user_id, content, date) VALUES (?, ?, ?)');
		if ($add_review->execute(array($user->id, $review_text, time()))) {
			$response['status'] = 'ok';
			$response['print'] = '
				<div class="success-attr">
					<div class="success-attr__text">'.$_txt['send_review_success'].'</div>
				</div>
			';
		}
	} else {
		$response['status'] = 'fail';
	}
}

echo json_encode($response);