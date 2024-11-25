<?php
	load_view('templates/base/header', $template);
?>

<div id="main-external" class="main-external">
	<div id="main-placeholder">
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
