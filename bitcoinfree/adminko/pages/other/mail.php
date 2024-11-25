<?php

if ($_POST['action'] == 'add') {
	ini_set('display_errors', 1);
	$work_status = 0;

	$subject_en = $_POST['data']['subject_en'];
	$text_en = $_POST['data']['text_en'];

	$get_users = $pdo->query('SELECT id, email FROM users WHERE status = 1');

	$add_email = $pdo->prepare('INSERT INTO email_queue (user_id, email, subject_en, text_en) VALUES (?, ?, ?, ?)');

	while ($row = $get_users->fetch()) {
		if (
			stristr($row['email'], '@mail.ru') === false &&
			stristr($row['email'], '@inbox.ru') === false &&
			stristr($row['email'], '@list.ru') === false &&
			stristr($row['email'], '@bk.ru') === false &&
			stristr($row['email'], '@asd.com') === false &&
			$row['fake'] == 0
		) {
			$add_email->execute(array($row['id'], $row['email'], $subject_en, $text_en));
		}
	}

	$work_status = 1;

	echo $work_status;
}

if ($_POST['action'] == 'get_page') {
?>

<form class="form-default form-add" data-page-handler="other/mail">
	<div class="form-item form-item-text">
		<label>
			<span class="form-item__header">Тема</span>
			<input class="form-item__input" type="text" name="subject_en">
			<span class="form-item__description"></span>
		</label>
	</div>
	<div class="form-item form-item-text">
		<label>
			<span class="form-item__header">Разметка</span>
			<textarea name="text_en" class="form-item__input"></textarea>
			<span class="form-item__description"></span>
		</label>
	</div>
	<br><br>
	<button type="submit" class="button-d">Сохранить</button>
	<br><br>
</form>

<?php
}
?>