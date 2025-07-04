<?php
	require_once './functions/faq.php';
	require_once './functions/users.php';
	global $coin, $site_name, $root_url;
?>

<?php
	$faq = $_txt['faq_items'];
?>

<div class="faq">
	<div class="container">
		<div class="content">
			<h1 class="header_1"><?= $_txt['header']; ?></h1>
			
			<div class="list">
			<?php

				foreach ($faq as $item) {
					$title = $item['title'];
					$title = str_ireplace('__coin', $coin, $title);
					$title = str_ireplace('__site', $site_name, $title);
					$title = str_ireplace('__url', '<a href="'.$root_url.'">'.$root_url.'</a>', $title);
					$title = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $title);
					$text = $item['text'];
					$text = str_ireplace('__coin', $coin, $text);
					$text = str_ireplace('__site', $site_name, $text);
					$text = str_ireplace('__url', '<a href="'.$root_url.'">'.$root_url.'</a>', $text);
					$text = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $text);
			?>
					<div class="panel-fissure faq-item">
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
								<div class="caption"><?= $title; ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
							<button class="button-small pink faq-button">
								<span class="bg"></span>
								<span class="bd-top"></span>
								<span class="bd-bottom"></span>
								<span class="bd-left"></span>
								<span class="bd-right"></span>
								<span class="caption">+</span>
							</button>
						</div>

						<div class="content">
							<div class="text"><?= $text; ?></div>
						</div>
					</div>
			<?php
				}
			?>
				
			</div>
		</div>
	</div>
</div>
