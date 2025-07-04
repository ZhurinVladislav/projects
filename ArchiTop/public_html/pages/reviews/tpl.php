<?php

global $pdo;

$get_reviews_total = $pdo->query('SELECT COUNT(id) AS total FROM reviews WHERE status = 1');
$reviews_total = $get_reviews_total->fetch();

?>

<h1 class="header-external min"><?= $_txt['header']; ?></h1>

<div class="add-header">
	<?= $_txt['add_header'][1]; ?><?= $reviews_total['total']; ?><?= $_txt['add_header'][2]; ?>
</div>


<div class="container">
<?php
	if ($user->is_logged() == true && $user->can_communicate == 1) {
		global $pdo;
		$can_leave_review = true;
		//	ищем отзывы пользователя за последние 24 часа
		$get_user_reviews = $pdo->query('SELECT COUNT(id) AS total FROM reviews WHERE user_id = '.$user->id.' AND date > '.(time() - 86400));
		if (!is_bool($user_reviews = $get_user_reviews->fetch())) {
			if ($user_reviews['total'] >= 2) {
				$can_leave_review = false;
			}
		}
		if ($can_leave_review == true) {
?>
			<div class="add-header_1"><?= $_txt['form_header']; ?></div>
			<div data-placeholder="send_review_success">
				<form class="reviews__form form-add" data-controller="reviews/add" data-callback="place_content" data-result="send_review_success">
					<textarea name="text" placeholder="<?=$_txt['form_placeholder']?>" required></textarea>
					<button type="submit" class="btn-default"><?= $_txt['form_button']; ?></button>
				</form>
			</div>
<?php
		} else {
?>
			<div class="error-attr">
				<div class="error-attr__text"><?=$_txt['error_limit']?></div>
			</div>
<?php		
		}
	} elseif ($user->is_logged() == true && $user->can_communicate == 0) {
?>
		<div class="error-attr">
			<div class="error-attr__text"><?=$_txt['err_communicate']?></div>
		</div>
<?php
	} elseif ($user->is_logged() == false) {
?>
		<div class="error-attr">
			<div class="error-attr__text"><?=$_txt['err_login']?></div>
		</div>
<?php
	}
?>
</div>

<?php
	require_once './functions/reviews.php';
	require_once './functions/users.php';

	if ($user->is_logged() === true) {
		$get_user_likes = $pdo->query('SELECT review_id, opinion FROM reviews_likes WHERE user_id = '.$user->id);
		$get_user_likes = $get_user_likes->fetchAll();

		foreach ($get_user_likes as $key => $value) {
			$user_likes[$value['review_id']] = $value['opinion'];
		}
	}
	
	$reviews = reviews_get_list(1, 6);
	if ($reviews != 'empty') {
		$admin_info = users_search_id(1);
?>

<div class="container">
	<div data-placeholder="result_reviews">
		<div class="reviews">
<?php
		foreach ($reviews['items'] as $item) {
			$find_user = users_search_id($item['user_id']);
			$login = $find_user['login'];
			$level = $find_user['level'];
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
						if (array_key_exists($item['id'], $user_likes) !== false) {
				?>
							<button class="plus <?php if ($user_likes[$item['id']] == '1') { echo 'polled'; } ?>" disabled></button>
							<button class="minus <?php if ($user_likes[$item['id']] == '0') { echo 'polled'; } ?>" disabled></button>
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
						<button data-navigation data-href="login" data-template="login" class="minus"></button>
				<?php
					}
				?>
					<span id="rating_count_<?= $item['id']; ?>"><?php if ($item['rating'] > 0) { echo '+'; } ?><?= $item['rating']; ?></span>
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
		}
?>
		</div>

		<div class="pagination" data-controller="reviews/get_list" data-result="result_reviews" data-scroll-top="true">
		<?php
			$pagination = $reviews['pagination'];
			if ($pagination['prev'] !== false || $pagination['next'] !== false) {
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
			}
		?>
		</div>
	</div>
</div>
<?php
	}
?>

