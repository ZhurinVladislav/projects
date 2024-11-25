<?php
	require_once './functions/faq.php';
	require_once './functions/users.php';
	global $coin, $site_name, $root_url;
?>

<h1 class="header-external"><?= $_txt['header']; ?></h1>

<?php
	$faq = faq_get_list(1, 2);
	if ($faq != 'empty') {
?>

<div class="container">
	<div class="faq">
		<div class="faq__items">

	<?php

		foreach ($faq as $item) {
			$title = $item['title_'.$user->language];
			$title = str_ireplace('__coin', $coin, $title);
			$title = str_ireplace('__site', $site_name, $title);
			$title = str_ireplace('__url', '<a href="'.$root_url.'">'.$root_url.'</a>', $title);
			$title = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $title);
			$text = $item['content_'.$user->language];
			$text = str_ireplace('__coin', $coin, $text);
			$text = str_ireplace('__site', $site_name, $text);
			$text = str_ireplace('__url', '<a href="'.$root_url.'">'.$root_url.'</a>', $text);
			$text = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $text);
	?>

			<div class="faq__item">
				<div class="faq__item-question">
					<div class="text"><?= $title; ?></div>
					<div class="arrow"></div>
				</div>
				<div class="faq__item-answer"><?= $text; ?></div>
			</div>

	<?php
		}
	}
	?>

		</div>
	</div>
</div>