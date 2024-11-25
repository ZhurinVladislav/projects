<?php
	load_view('templates/base/header', $template);
?>

<div id="main" class="main">
	<div class="main__content" id="main-placeholder">

		<?php
			if (isset($content_path)) {
				require $content_path;
			}
		?>
		
	</div>
</div>


<?php
	load_view('templates/base/footer', $template);
?>