<?php
	require_once './functions/reviews.php';
	require_once './functions/users.php';
	require_once './pages/reviews/'.$user->language.'.php';
	$new_page = (int) $_POST['page'];

	if ($user->is_logged() === true) {
		$user_likes = $pdo->query('SELECT review_id FROM reviews_likes WHERE user_id = '.$user->id);
		$user_likes = $user_likes->fetchAll();
		foreach ($user_likes as $key => $value) {
			$user_likes[$key] = $value['review_id'];
		}
	}
	
	$reviews = reviews_get_list($new_page, 6);
	if ($reviews != 'empty') {
		$admin_info = users_search_id(1);
?>
	<div class="reviews">
<?php
		foreach ($reviews['items'] as $item) {
			$find_user = users_search_id($item['user_id']);
			$login = $find_user['login'];
?>
			<div class="reviews__item poll-item" data-poll-id="<?= $item['id']; ?>">
				<div class="reviews__item-top">
					<div class="reviews__item-top_avatar">
						<?php
							if ($find_user['avatar'] != '0') {
						?>
								<img src="/images/avatars/<?= $find_user['id']; ?>.<?= $find_user['avatar']; ?>">
						<?php
							} else {
						?>
								<img src="/app/images/avatar-default.png">
						<?php
							}
						?>
					</div>
					
					<div class="reviews__item-top_wrap">
						<div class="reviews__item-top_info">
							<div class="login"><?= $login; ?></div>
							<div class="level">Уровень <?= $level; ?></div>
						</div>

						<div class="reviews__item-top_date">
							<?= date('d.m.Y H:s', $item['date']); ?>
						</div>
					</div>
				</div>

				<div class="reviews__item-body">
					<div class="reviews__item-body_text">
						<?= nl2br(stripslashes(htmlspecialchars_decode($item['content']))); ?>
					</div>
				</div>

				<div class="reviews__item-rating">
				<?php
					if ($user->is_logged() === true) {
						if (array_search($item['id'], $user_likes) !== false) {
				?>
							<!-- <button class="plus active"></button> -->
				<?php
						} else {
				?>
							<button class="plus" data-poll="reviews/poll" data-opinion="plus" data-id="<?= $item['id']; ?>"></button>
							<button class="minus" data-poll="reviews/poll" data-opinion="minus" data-id="<?= $item['id']; ?>"></button>
				<?php
						}
					} else {
				?>
						<button data-navigation data-href="login" data-template="login" class="plus"></button>
				<?php
					}
				?>
					<span id="rating_count_<?= $item['id']; ?>"><?= $item['rating']; ?></span>
				</div>

			</div>
		<?php
			if ($item['answer'] !== '') {
		?>
			<div class="reviews__item answer">
				<div class="reviews__item-top">
					<div class="reviews__item-top_avatar">
						<?php
							if ($admin_info['avatar'] != '0') {
						?>
								<img src="/images/avatars/<?= $admin_info['id']; ?>.<?= $admin_info['avatar']; ?>">
						<?php
							} else {
						?>
								<img src="/app/images/avatar-default.png">
						<?php
							}
						?>
					</div>
					
					<div class="reviews__item-top_wrap">
						<div class="reviews__item-top_info">
							<div class="login"><?= $admin_info['login']; ?></div>
						</div>

						<div class="reviews__item-top_date">
							<?= date('d.m.Y H:s', $item['date']); ?>
						</div>
					</div>
				</div>

				<div class="reviews__item-body">
					<div class="reviews__item-body_text">
						<?= nl2br(stripslashes(htmlspecialchars_decode($item['answer']))); ?>
					</div>
				</div>
			</div>
		<?php
			}
		?>
<?php
		}
?>
	</div>
	
	<div class="pagination" data-controller="reviews/get_list" data-result="result_reviews" data-scroll-top="true">
		<?php
			$pagination = $reviews['pagination'];
			if ($pagination['prev']) {
				echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
			} else {
				echo '<span class="prev_off"></span>';
			}
			if ($pagination['minustwo']) echo '<a data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a>';
			if ($pagination['minusone']) echo '<a data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a>';
			echo '<span class="current">'.$pagination['current'].'</span>';
			if ($pagination['plusone']) echo '<a data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a>';
			if ($pagination['plustwo']) echo '<a data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a>';
			if ($pagination['next']) {
				echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
			} else {
				echo '<span class="next_off"></span>';
			}
		?>
	</div>
<?php
	}
?>