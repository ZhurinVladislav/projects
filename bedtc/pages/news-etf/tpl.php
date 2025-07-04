<?php
global $pdo;
require_once './functions/news.php';

if (isset($_GET['id'])) {
	
	$item_id = (int) $_GET['id'];

	if ($item_id > 0) {
		$news_item = news_etf_get_item($item_id);
		$item_content = json_decode(file_get_contents('./pages/news-etf/items/news'.$news_item['id'].'.json'), true);
?>

        <section class="typical" >
        	<div class="container">
        		<div class="content">
        			<h1 class="header_0"><?= $news_item['title_'.$user->language]; ?></h1>
        			
        			<?php
						if ($news_item['image'] != '0') {
					?>
					    <img src="images/news-etf/<?= $news_item['image']; ?>" class="image">
					<?php
						}
					?>
        
                    <div class="date">
        				<span class="date-icon">
        					<svg><use xlink:href="/app/images/svg_sprite.svg#time"></use></svg>
        				</span>
        				<span class="date-text"><?= date('d.m.y H:i', $news_item['date']); ?></span>
        			</div>
        
        			<div class="text-default">
        				<?= $item_content[$user->language]; ?>
        			</div>
        			
        			<a href="/news-etf" class="link-back">
        				<div class="link-back__arrow">
        					<svg><use xlink:href="/app/images/svg_sprite.svg#arrow"></use></svg>
        				</div>
        				<div class="link-back__text"><?= $_txt['button-back']; ?></div>
        			</a>
        		</div>
        	</div>
        </section>

<?php
	}

} else {
	$news = news_etf_get_list(1, 5);
	if ($news != 'empty') {
?>
		<div class="news">
			<div class="container">
				<div class="content">
					<h1 class="header_0"><?= $_txt['header']; ?> ETF</h1>
					<div class="text"><?= $_txt['subheader']; ?></div>

					<div data-placeholder="result_news">
						<div class="list">
				<?php
						foreach ($news['items'] as $item) {
							// $item_content = json_decode(file_get_contents('./pages/news/items/news'.$item['id'].'.json'), true);
				?>
							<!--
							<div class="news__item">
								<div class="news__item-img">
								<?php
									if ($item['image'] != '0') {
								?>
									<img src="images/news/<?= $item['image']; ?>">
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
					</div>
				</div>
			</div>
		</div>
<?php
	}
}
?>

<script>
	<?php
		$get_news_count = $pdo->query('SELECT count(id) as total FROM news_etf WHERE admin_only = 0');
		$news_count = $get_news_count->fetch();
	?>
	localStorage['news_etf_total_readed'] = <?= $news_count['total']; ?>;
</script>