<?php

require_once '../functions/users.php';

if ($_POST['action'] == 'edit') {

}

if ($_POST['action'] == 'get_page') {
	$get_requests = $pdo->query('SELECT * FROM jobs_request ORDER BY id DESC');
	$requests = $get_requests->fetchAll();
?>
	<div class="table-default" data-placeholder="result_tickets">
<?php
		foreach ($requests as $item) {
			$find_user = users_search_id($item['user_id']);
			$login = $find_user['login'];
?>
			<p style="max-width: 1060px; word-wrap: break-word;">
				Логин: <span data-edit="users/edit_user" data-id="<?= $item['user_id']; ?>">
							<?= $login; ?>
						</span>
						<br><br>
				Имя: <?= $item['fullname']; ?><br><br>
				Вакансия: 
				<?php
					if ($item['specialty'] == 1) {
						echo 'Тех. поддержка';
					} elseif ($item['specialty'] == 2) {
						echo 'Продвижение соц. сетей';
					} elseif ($item['specialty'] == 3) {
						echo 'Продвижение ютуб';
					}
				?>
				<br><br>
				Телефон: <?= $item['phone']; ?><br><br>
				E-mail: <?= $item['email']; ?><br><br>
				Youtube: <a href="<?= $item['youtube']; ?>"><?= $item['youtube']; ?></a><br><br>
				Instagram: <a href="<?= $item['instagram']; ?>"><?= $item['instagram']; ?></a><br><br>
				Facebook: <a href="<?= $item['facebook']; ?>"><?= $item['facebook']; ?></a><br><br>
				Vk: <a href="<?= $item['vk']; ?>"><?= $item['vk']; ?></a><br><br>
				Skype: <?= $item['skype']; ?><br><br>
				Telegram: <?= $item['telegram']; ?><br><br>
			</p>
			<br>
			<hr>
<?php
		}
?>
	</div>
<?php
}
?>