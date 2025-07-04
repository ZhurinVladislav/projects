<?php
	load_view('templates/base/header_inner', $template);

	$_txt_t = array();
	require_once $user->language.'.php';
?>

<div id="main-placeholder">
	<?php
		if (isset($content_path)) {
			require $content_path;
		}
	?>
</div>

<?php
	load_view('templates/base/footer', $template);
?>