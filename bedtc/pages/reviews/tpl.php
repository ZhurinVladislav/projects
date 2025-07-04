<?php

global $pdo;

require_once './functions/reviews.php';
require_once './functions/users.php';

$get_reviews_total = $pdo->query('SELECT COUNT(id) AS total FROM reviews WHERE status = 1');
$reviews_total = $get_reviews_total->fetch();

$reviews = reviews_get_list(1, 2);

?>

<div class="reviews">
	<div class="container">

		<h1 class="header_1"><?= $_txt['header']; ?></h1>

		<div class="header_2">
			<?= $_txt['add_header'][1]; ?><?= $reviews_total['total']; ?><?= $_txt['add_header'][2]; ?>
		</div>

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
				<div class="panel-fissure-vertical reviews-form" data-placeholder="send_review_success">
					<div class="shadow-left"></div>
					<div class="shadow-bottom"></div>
					<div class="bd-top"></div>
					<div class="bd-bottom"><div class="left"></div><div class="right"></div></div>
					<div class="fissure"></div>

					<div class="content">
						<div class="header_2"><?= $_txt['info']; ?></div>

						<form class="form-add" data-controller="reviews/add" data-callback="place_content" data-result="send_review_success">
							<div class="form-item">
								<div class="label-wrap">
									<label for="login_email"><?= $_txt['email_label']; ?></label>
								</div>
								<div class="input_errors">
									<div class="input-wrapper">
										<span class="bg"></span>
										<span class="bd-top"></span>
										<span class="bd-bottom"></span>
										<span class="bd-left"></span>
										<span class="bd-right"></span>
										<textarea name="text" placeholder="<?=$_txt['form_placeholder']?>" required></textarea>
										<span class="bd-corner"></span>
									</div>
								</div>
							</div>

							<button class="button-big blue dark">
								<span class="bg"></span>
								<span class="bd-bot"><span></span><span></span></span>
								<span class="caption"><?= $_txt['form_button']; ?></span>
								<span class="bd-hover"></span>
								<span class="bd-black"><span></span><span></span></span>
							</button>
						</form>
					</div>
				</div>
	<?php
			} else {
	?>
				<div class="authinfo">
					<div class="authinfo-icon">
						<svg><use xlink:href="/app/images/svg_sprite.svg#authinfo"></use></svg>
					</div>
					<div class="authinfo-text"><?=$_txt['error_limit']?></div>
				</div>
	<?php		
			}
		} elseif ($user->is_logged() == true && $user->can_communicate == 0) {
	?>
			<div class="authinfo">
				<div class="authinfo-icon">
					<svg><use xlink:href="/app/images/svg_sprite.svg#authinfo"></use></svg>
				</div>
				<div class="authinfo-text"><?=$_txt['err_communicate']?></div>
			</div>
	<?php
		} elseif ($user->is_logged() == false) {
	?>

			<div class="authinfo">
				<div class="authinfo-icon">
					<svg><use xlink:href="/app/images/svg_sprite.svg#authinfo"></use></svg>
				</div>
				<div class="authinfo-text"><?=$_txt['err_login']?></div>
			</div>
	<?php
		}
	?>

		<div data-placeholder="result_reviews">
		<?php
			if ($reviews != 'empty') {
				foreach ($reviews['items'] as $item) {
					$find_user = users_search_id($item['user_id']);
					$login = $find_user['login'];
					$level = $find_user['level'];
		?>
					<div class="panel-fissure news-item">
						<div class="shadow-left"></div>
						<div class="shadow-bottom"></div>
						<div class="bd-top"></div>
						<div class="bd-bottom">
							<div class="left"></div>
							<div class="right"></div>
						</div>
						<div class="fissure"></div>
						<div class="panel-fixed-top">
							<div class="panel-simple">
								<div class="bd"></div>
								<div class="caption"><?= $login; ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
							<div class="panel-simple">
								<div class="bd"></div>
								<div class="caption"><?= date('d.m.y', $item['date']); ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
						</div>
						<div class="content">
							<div class="left">
								<div class="text"><?= $item['content']; ?></div>
							</div>
						</div>
					</div>
		<?php
				}
			}
		?>

			<div class="pagination" data-controller="reviews/get_list" data-result="result_reviews" data-scroll-top="true">
			<?php
				$pagination = $reviews['pagination'];
				if ($pagination['prev'] !== false || $pagination['next'] !== false) {
					if ($pagination['prev']) {
						//echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
						echo '
						<a class="pagination-arrow left" data-page="'.$pagination['pref'].'">
							<img src="/app/images/icons/arrow-left.svg">
						</a>';
					} else {
						echo '<span class="prev_off"></span>';
					}

					echo '<ul class="pagination-list">';

					if ($pagination['minustwo']) echo '
					<li class="pagination-item">
						<a class="button-small blue" data-page="'.$pagination['minustwo'].'">
							<span class="bg"></span>
							<span class="bd-top"></span>
							<span class="bd-bottom"></span>
							<span class="bd-left"></span>
							<span class="bd-right"></span>
							<span class="caption">'.$pagination['minustwo'].'</span>
						</a>
					</li>';
					
					if ($pagination['minusone']) echo '
					<li class="pagination-item">
						<a class="button-small blue" data-page="'.$pagination['minusone'].'">
							<span class="bg"></span>
							<span class="bd-top"></span>
							<span class="bd-bottom"></span>
							<span class="bd-left"></span>
							<span class="bd-right"></span>
							<span class="caption">'.$pagination['minusone'].'</span>
						</a>
					</li>';
					
					echo '
					<li class="pagination-item">
						<a class="button-small blue active">
							<span class="bg"></span>
							<span class="bd-top"></span>
							<span class="bd-bottom"></span>
							<span class="bd-left"></span>
							<span class="bd-right"></span>
							<span class="caption">'.$pagination['current'].'</span>
						</a>
					</li>';
					
					if ($pagination['plusone']) echo '
					<li class="pagination-item">
						<a class="button-small blue" data-page="'.$pagination['plusone'].'">
							<span class="bg"></span>
							<span class="bd-top"></span>
							<span class="bd-bottom"></span>
							<span class="bd-left"></span>
							<span class="bd-right"></span>
							<span class="caption">'.$pagination['plusone'].'</span>
						</a>
					</li>';
					
					if ($pagination['plustwo']) echo '
					<li class="pagination-item">
						<a class="button-small blue" data-page="'.$pagination['plustwo'].'">
							<span class="bg"></span>
							<span class="bd-top"></span>
							<span class="bd-bottom"></span>
							<span class="bd-left"></span>
							<span class="bd-right"></span>
							<span class="caption">'.$pagination['plustwo'].'</span>
						</a>
					</li>';
					
					echo '</ul>';

					if ($pagination['next']) {
						//echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
						echo '
						<a class="pagination-arrow right" data-page="'.$pagination['next'].'">
							<img src="/app/images/icons/arrow-left.svg">
						</a>';
					} else {
						echo '<span class="next_off"></span>';
					}
				}
			?>
			</div>

		</div>

	</div>
</div>