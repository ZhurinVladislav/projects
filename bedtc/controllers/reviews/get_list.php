<?php
	require_once './functions/reviews.php';
	require_once './functions/users.php';
	require_once './pages/reviews/'.$user->language.'.php';
	$new_page = (int) $_POST['page'];

	// if ($user->is_logged() === true) {
	// 	$user_likes = $pdo->query('SELECT review_id FROM reviews_likes WHERE user_id = '.$user->id);
	// 	$user_likes = $user_likes->fetchAll();
	// 	foreach ($user_likes as $key => $value) {
	// 		$user_likes[$key] = $value['review_id'];
	// 	}
	// }
	
	$reviews = reviews_get_list($new_page, 2);
	if ($reviews != 'empty') {

		foreach ($reviews['items'] as $item) {
			$find_user = users_search_id($item['user_id']);
			$login = $find_user['login'];
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
<?php
	}
?>