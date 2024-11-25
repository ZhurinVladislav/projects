<?php

$code = 0;

if ($user->is_logged() == true) {
	$review_id = (int) $_POST['id'];

	if ($review_id > 0) {

		$check_poll = $pdo->prepare('SELECT id FROM reviews_likes WHERE user_id = ? AND review_id = ? LIMIT 1');
		$check_poll->execute(array($user->id, $review_id));

		if ($check_poll->fetch() === false) {
			if ($_POST['opinion'] == 'plus') {
				$add_poll = $pdo->prepare('UPDATE reviews SET rating = rating + 1 WHERE id = ?');
				$opinion = 1;
			} else {
				$add_poll = $pdo->prepare('UPDATE reviews SET rating = rating - 1 WHERE id = ?');
				$opinion = 0;
			}
			
			if ($add_poll->execute(array($review_id))) {
				$add_user_like = $pdo->query('INSERT INTO reviews_likes (user_id, review_id, opinion) VALUES ('.$user->id.', '.$review_id.', '.$opinion.')');
				$get_rating = $pdo->prepare('SELECT rating FROM reviews WHERE id = ?');
				$get_rating->execute(array($review_id));
				$rating = $get_rating->fetch();
				$code = $rating['rating'];
			}
		}
	}
}

echo $code;