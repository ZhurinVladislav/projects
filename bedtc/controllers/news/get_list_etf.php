<?php
	require_once './functions/news.php';
	require_once './pages/news/'.$user->language.'.php';
	$new_page = (int) $_POST['page'];
	$news = news_etf_get_list($new_page, 5);
	if ($news != 'empty') {
?>
	<div class="list">
<?php
		foreach ($news['items'] as $item) {
?>
			<!--
			<div class="news__item">
				<div class="news__item-img">
				<?php
					if ($item['image'] != '0') {
				?>
					<img src="images/news/<?= $item['image']; ?>" style="max-width: 305px"><br>
				<?php
					}
				?>
				</div>
				<div class="news__item-body">
					<div class="title"><?= $item['title_'.$user->language]; ?></div>
					<div class="date"><?= date('d.m.y H:i', $item['date']); ?></div>
					<div class="text">
						<?= $item['content_'.$user->language]; ?>
					</div>
				</div>
			</div>
			-->



			<div class="item">
				<div class="item-title">
					<div class="item-title__left">
						<span class="title-name-wrap">
							<span class="title-name"><?= $item['title_'.$user->language]; ?></span>
						</span>
					</div>
					<div class="item-title__right">
						<span class="title-icon">
							<svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
						</span>
						<span class="title-date"><?= date('d.m.y H:i', $item['date']); ?></span>
					</div>
				</div>
				<div class="item-block">
					<div class="item-text">
					    <div class="item-text__text"><?= $item['annotation_'.$user->language]; ?></div>
						<div class="item-text__link">
							<a href="/news-etf?id=<?= $item['id']; ?>" class="button-more"><?= $_txt['button-more']; ?></a>
						</div>
					</div>
					<div class="item-image">
					
					<?php
						if ($item['image'] != '0') {
					?>
						<img src="images/news-etf/<?= $item['image']; ?>">
						<!-- <img src="/app/images/test2.jpg" alt=""> -->
					<?php
						}
					?>

					</div>
				</div>
			</div>


<?php
		}
?>
	</div>
	
	<div class="paginations" data-controller="news/get_list_etf" data-result="result_news" data-scroll-top="true">
	<?php
		$pagination = $news['pagination'];
		if ($pagination['prev'] !== false || $pagination['next'] !== false) {
			if ($pagination['prev']) {
				//echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
				echo '<a class="paginations-arrow left" data-page="'.$pagination['prev'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
			} else {
				echo '<span class="prev_off"></span>';
			}

			echo '<ul class="paginations-list">';

			if ($pagination['minustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a></li>';
			if ($pagination['minusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a></li>';
			echo '<li class="paginations-item active"><span class="btnsmall-invert">'.$pagination['current'].'</span>';
			if ($pagination['plusone']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a></li>';
			if ($pagination['plustwo']) echo '<li class="paginations-item"><a class="btnsmall-invert" data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a></li>';
			
			echo '</ul>';

			if ($pagination['next']) {
				//echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
				echo '<a class="paginations-arrow right" data-page="'.$pagination['next'].'"><svg><use xlink:href="/app/images/svg_sprite.svg#doublearrow"></use></svg></a>';
			} else {
				echo '<span class="next_off"></span>';
			}
		}
	?>
	</div>


<?php
	}
?>