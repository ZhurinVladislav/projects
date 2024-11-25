<h1 class="header-external min"><?= $_txt['header']; ?></h1>

<?php
	global $pdo;
	require_once './functions/news.php';
	$news = news_get_list(1, 5);
	if ($news != 'empty') {
?>
<div class="container">
	<div class="add-header"><?= $_txt['subheader']; ?></div>
	<div data-placeholder="result_news">
		<div class="news">
<?php
		foreach ($news['items'] as $item) {
?>
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
<?php
		}
?>
		</div>

		<div class="pagination" data-controller="news/get_list" data-result="result_news" data-scroll-top="true">
		<?php
			$pagination = $news['pagination'];
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

<script>
	<?php
		$get_news_count = $pdo->query('SELECT count(id) as total FROM news WHERE admin_only = 0');
		$news_count = $get_news_count->fetch();
	?>
	localStorage['news_total_readed'] = <?= $news_count['total']; ?>;
</script>