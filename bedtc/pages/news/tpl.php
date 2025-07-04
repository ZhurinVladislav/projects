<?php
global $pdo;
require_once './functions/news.php';

if (isset($_GET['id'])) {
	
	$item_id = (int) $_GET['id'];

	if ($item_id > 0) {
		$news_item = news_get_item($item_id);
		$item_content = json_decode(file_get_contents('./pages/news/items/news'.$news_item['id'].'.json'), true);
?>


		<div class="news">
			<div class="container">
				<h1 class="header_1"><?= $news_item['title_'.$user->language]; ?></h1>

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
						<div></div>
						<div class="panel-simple">
							<div class="bd"></div>
							<div class="caption"><?= date('d.m.y', $news_item['date']); ?></div>
							<div class="bd-top-left"></div>
							<div class="bd-top-right"></div>
							<div class="bd-bottom-left"></div>
							<div class="bd-bottom-right"></div>
							<div class="bd-bottom"></div>
						</div>
					</div>
					<div class="content">
						<div class="left">
							<div class="text"><?= $item_content[$user->language]; ?></div>
							<a class="button-big blue dark" href="/news">
								<span class="bg"></span>
								<span class="bd-bot"><span></span><span></span></span>
								<span class="caption"><?= $_txt['button-back']; ?></span>
								<span class="bd-hover"></span>
								<span class="bd-black"><span></span><span></span></span>
							</a>
						</div>
						<div class="right">
						<?php
							if ($news_item['image'] != '0') {
						?>
								<div class="image">
									<div class="bd"></div>
									<img src="images/news/<?= $news_item['image']; ?>">
									<div class="bd-top-left"></div>
									<div class="bd-top-right"></div>
									<div class="bd-bottom"></div>
									<div class="bd-bottom-add"></div>
								</div>
						<?php
							}
						?>
						</div>
					</div>
				</div>
			</div>
		</div>
		
<?php
	}

} else {
	$news = news_get_list(1, 2);
	if ($news != 'empty') {
?>
		<div class="news">
			<div class="container">
				<h1 class="header_1"><?= $_txt['header']; ?></h1>
				<div class="subheader"><?= $_txt['subheader']; ?></div>

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
									<div class="caption"><?= $item['title_'.$user->language]; ?></div>
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
									<div class="text"><?= $item['annotation_'.$user->language]; ?></div>
									<a class="button-big blue dark" href="news?id=<?= $item['id']; ?>">
										<span class="bg"></span>
										<span class="bd-bot"><span></span><span></span></span>
										<span class="caption"><?= $_txt['button-more']; ?></span>
										<span class="bd-hover"></span>
										<span class="bd-black"><span></span><span></span></span>
									</a>
								</div>
								<div class="right">
								<?php
									if ($item['image'] != '0') {
								?>
										<div class="image">
											<div class="bd"></div>
											<img src="images/news/<?= $item['image']; ?>">
											<div class="bd-top-left"></div>
											<div class="bd-top-right"></div>
											<div class="bd-bottom"></div>
											<div class="bd-bottom-add"></div>
										</div>
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

					<div class="pagination" data-controller="news/get_list" data-result="result_news" data-scroll-top="true">
					<?php
						$pagination = $news['pagination'];
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
<?php
	}
}
?>

<script>
	<?php
		$get_news_count = $pdo->query('SELECT count(id) as total FROM news WHERE admin_only = 0');
		$news_count = $get_news_count->fetch();
	?>
	localStorage['news_total_readed'] = <?= $news_count['total']; ?>;
</script>