<?php

require_once './functions/news.php';
$new_page = (int) $_POST['page'];
$news = news_get_list($new_page, 5);
if ($news != 'empty') {
?>
	<div class="news">
		<?php
		foreach ($news['items'] as $item) {
		?>
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
					<div class="title"><?= $item['title_' . $user->language]; ?></div>
					<div class="date"><?= date('d.m.y H:i', $item['date']); ?></div>
					<div class="text">
						<?= $item['content_' . $user->language]; ?>
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
		if ($pagination['prev']) {
			echo '<a class="prev" data-page="' . $pagination['prev'] . '"></a>';
		} else {
			echo '<span class="prev_off"></span>';
		}
		if ($pagination['minustwo']) echo '<a data-page="' . $pagination['minustwo'] . '">' . $pagination['minustwo'] . '</a>';
		if ($pagination['minusone']) echo '<a data-page="' . $pagination['minusone'] . '">' . $pagination['minusone'] . '</a>';
		echo '<span class="current">' . $pagination['current'] . '</span>';
		if ($pagination['plusone']) echo '<a data-page="' . $pagination['plusone'] . '">' . $pagination['plusone'] . '</a>';
		if ($pagination['plustwo']) echo '<a data-page="' . $pagination['plustwo'] . '">' . $pagination['plustwo'] . '</a>';
		if ($pagination['next']) {
			echo '<a class="next" data-page="' . $pagination['next'] . '"></a>';
		} else {
			echo '<span class="next_off"></span>';
		}
		?>
	</div>
<?php
}
?>