<?php
	global $pdo, $settings, $coin;

	$settings = new Settings();
	$new_section = $settings->get('new_section');
?>

	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
	<script>
		current_template = '<?= $template; ?>';
		<?php
			if ($user->is_logged() == true) {
				echo 'user_logged = true;';
			} else {
				echo 'user_logged = false;';
			}
		?>
		<?php
			$get_news_count = $pdo->query('SELECT count(id) as total FROM news WHERE admin_only = 0');
			$news_count = $get_news_count->fetch();
		?>
		total_news = <?= $news_count['total']; ?>;
		coin = '<?= $coin; ?>'
	</script>
	
	<script src="/app/js/jquery.min.js"></script>

	<script src="/app/js/main.js?_=<?= time(); ?>"></script>

</body>
</html>