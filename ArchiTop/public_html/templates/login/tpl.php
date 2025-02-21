<?php
	load_view('templates/base/header', $template);
?>

<div class="tamplate-login">
	<div id="main-placeholder">
		
		<?php
			if (isset($content_path)) {
				require $content_path;
			}
		?>
		
	</div>
	<div class="city">
		<div class="coin_small_1"></div>
		<div class="coin_small_2"></div>
		<div class="coin_small_3"></div>

		<div class="coin_medium_1"></div>
		<div class="coin_medium_2"></div>
		<div class="coin_medium_3"></div>
		<div class="coin_medium_4"></div>

		<div class="coin_big"></div>
	</div>
</div>


<?php
	load_view('templates/base/footer', $template);
?>