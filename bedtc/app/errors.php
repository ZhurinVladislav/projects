<?php
	$errors = file_get_contents('errors.txt');
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>
	<?php
		if (empty($errors)) {
			echo 'Sass';
		} else {
			echo 'Ошибка блять!';
		}
	?>
	</title>
	<style>
		body {
			margin: 0;
			padding: 20px;
			background-color: #222;
			color: #eee;
		}
	</style>
</head>
<body>

<?php
	if (empty($errors)) {
?>
	<h2>Всё заебись</h2>
<?php
	} else {
?>
	<pre>
		<?php print_r($errors); ?>
	</pre>
<?php
	}
?>

<script>
	setTimeout(function() {
		location.reload();
	}, 5000);
</script>

</body>
</html>