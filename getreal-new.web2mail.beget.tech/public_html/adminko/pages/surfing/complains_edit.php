<?php

require_once '../functions/surf.php';
require_once '../functions/users.php';

if ($_POST['action'] == 'get_page') {
	$site_id = $_POST['id'];

	$site_list = $pdo->prepare('SELECT * FROM surfing_complain WHERE site_id = ? ORDER BY id DESC');
	$site_list->execute(array($site_id));
	
	$site_list_row = $site_list->fetchAll();

?>

<div class="table-default" data-placeholder="results_1">
	<div class="table-row table-header">
		<div class="table-column" style="width: 20%">Пользователь</div>
		<div class="table-column" style="width: 60%">Жалоба</div>
		<div class="table-column" style="width: 20%">Дата</div>
	</div>
	<?php
		foreach ($site_list_row as $item) {

			$user = users_search_id($item['user_id']);
	?>
		<div class="table-row">
			<div class="table-column" style="width: 20%">
				<span data-edit="users/edit_user" data-id="<?= $user['id']; ?>"><?= $user['login']; ?></span>
			</div>
			<div class="table-column" style="width: 60%"><?= $item['text']; ?></div>
			<div class="table-column" style="width: 20%"><?= date('d.m.Y H:i', $item['date_created']); ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>