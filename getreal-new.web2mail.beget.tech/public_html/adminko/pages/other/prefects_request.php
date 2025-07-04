<?php

require_once '../functions/users.php';

if ($_POST['action'] == 'edit') {

}

if ($_POST['action'] == 'get_page') {
	$get_requests = $pdo->query('SELECT * FROM prefects_request ORDER BY id DESC');
	$requests = $get_requests->fetchAll();
?>
	<div class="table-default" data-placeholder="result_tickets">
		<!-- <div class="table-row table-header">
			<div class="table-column" style="width: 15%">Логин</div>
			<div class="table-column" style="width: 15%">Имя</div>
			<div class="table-column" style="width: 15%">Телефон</div>
			<div class="table-column" style="width: 10%">E-mail</div>
			<div class="table-column" style="width: 5%">Youtube</div>
			<div class="table-column" style="width: 5%">Instagram</div>
			<div class="table-column" style="width: 5%">Facebook</div>
			<div class="table-column" style="width: 5%">Vk</div>
			<div class="table-column" style="width: 10%">Skype</div>
			<div class="table-column" style="width: 10%">Telegram</div>
			<div class="table-column" style="width: 5%">Скан</div>
		</div> -->
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
				Телефон: <?= $item['phone']; ?><br><br>
				E-mail: <?= $item['email']; ?><br><br>
				Youtube: <a href="<?= $item['youtube']; ?>"><?= $item['youtube']; ?></a><br><br>
				Instagram: <a href="<?= $item['instagram']; ?>"><?= $item['instagram']; ?></a><br><br>
				Facebook: <a href="<?= $item['facebook']; ?>"><?= $item['facebook']; ?></a><br><br>
				Vk: <a href="<?= $item['vk']; ?>"><?= $item['vk']; ?></a><br><br>
				Skype: <?= $item['skype']; ?><br><br>
				Telegram: <?= $item['telegram']; ?><br><br>
				Скан: <a class="button-d square" target="_blank" href="<?= $root_url.'images/passports/'.$item['passport']; ?>">&#10142;</a><br><br>
			</p>
			<br>
			<hr>

			<!-- <div class="table-row">
				<div class="table-column" style="width: 15%">
					<span data-edit="users/edit_user" data-id="<?= $item['user_id']; ?>">
						<?= $login; ?>
					</span>
				</div>
				<div class="table-column" style="width: 15%"><?= $item['fullname']; ?></div>
				<div class="table-column" style="width: 15%"><?= $item['phone']; ?></div>
				<div class="table-column" style="width: 10%"><?= $item['email']; ?></div>
				<div class="table-column" style="width: 5%">
					<a class="button-d square" target="_blank" href="<?= $item['youtube']; ?>">&#10142;</a>
				</div>
				<div class="table-column" style="width: 5%">
					<a class="button-d square" target="_blank" href="<?= $item['instagram']; ?>">&#10142;</a>
				</div>
				<div class="table-column" style="width: 5%">
					<a class="button-d square" target="_blank" href="<?= $item['facebook']; ?>">&#10142;</a>
				</div>
				<div class="table-column" style="width: 5%">
					<a class="button-d square" target="_blank" href="<?= $item['vk']; ?>">&#10142;</a>
				</div>
				<div class="table-column" style="width: 10%"><?= $item['skype']; ?></div>
				<div class="table-column" style="width: 10%"><?= $item['telegram']; ?></div>
				<div class="table-column" style="width: 5%">
					<a class="button-d square" target="_blank" href="<?= $root_url.'images/passports/'.$item['passport']; ?>">&#10142;</a>
				</div>
			</div> -->
<?php
		}
?>
	</div>
<?php
}
?>