<?php
global $pdo;

if ($_POST['action'] == 'edit') {

	$users_total = (int) $_POST['data']['users_total'];
	$replenishments_total = format_money($_POST['data']['replenishments_total']);
	$withdrawal_total = format_money($_POST['data']['withdrawal_total']);
	$users_online = (int) $_POST['data']['users_online'];

	$pdo->query('UPDATE project_statistics SET value = '.$users_total.' WHERE name LIKE "fake_users_total" LIMIT 1');
	$pdo->query('UPDATE project_statistics SET value = '.$replenishments_total.' WHERE name LIKE "fake_replenishments_total" LIMIT 1');
	$pdo->query('UPDATE project_statistics SET value = '.$withdrawal_total.' WHERE name LIKE "fake_withdrawal_total" LIMIT 1');
	$pdo->query('UPDATE project_statistics SET value = '.$users_online.' WHERE name LIKE "fake_users_online" LIMIT 1');

	echo 1;

}

if ($_POST['action'] == 'get_page') {

	$users_total = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "fake_users_total"');
	$users_total = $users_total->fetch();
	$users_total = $users_total['value'];
	$replenishments_total = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "fake_replenishments_total"');
	$replenishments_total = $replenishments_total->fetch();
	$replenishments_total = $replenishments_total['value'];
	$withdrawal_total = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "fake_withdrawal_total"');
	$withdrawal_total = $withdrawal_total->fetch();
	$withdrawal_total = $withdrawal_total['value'];
	$users_online = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "fake_users_online"');
	$users_online = $users_online->fetch();
	$users_online = $users_online['value'];
	
?>

<form class="form-default form-edit" data-page-handler="settings/fake_statistics" data-callback="paint-button">
	<!-- <button type="button" class="button-d" data-open-form>Добавить</button> -->
	<div class="form-section">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Всего регистраций</span>
				<input class="form-item__input" name="users_total" value="<?= $users_total; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Всего пополнений</span>
				<input class="form-item__input" name="replenishments_total" value="<?= $replenishments_total; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Всего выводов</span>
				<input class="form-item__input" name="withdrawal_total" value="<?= $withdrawal_total; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Онлайн</span>
				<input class="form-item__input" name="users_online" value="<?= $users_online; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
		<hr>
	</div>
	<br><br>
</form>
<?php
}
?>