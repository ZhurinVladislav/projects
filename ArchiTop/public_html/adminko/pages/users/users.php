<?php

require_once '../functions/users.php';

if ($_POST['action'] != 'get_page') {
	if ($_POST['action'] == 'search') {
?>
		<div class="table-row table-header">
			<div class="table-column" style="width: 70%">Логин</div>
			<div class="table-column" style="width: 30%">Язык</div>
		</div>
		<?php
			$get_id = (int) $_POST['string'];
			if ($get_id > 0) {
				$user_list_id = users_search_id($_POST['string']);
			} else {
				$user_list_id = array();
			}
			$user_list_login = users_search_login($_POST['string']);
			$user_list_email = users_search_email($_POST['string']);
			
			if (count($user_list_id) > 0 || count($user_list_login) > 0 || count($user_list_email) > 0) {
				if (count($user_list_id) > 0) {
		?>
					<p>Совпадения по ID:</p>
					<div class="table-row">
						<div class="table-column" style="width: 70%">
							<span data-edit="users/edit_user" data-id="<?= $user_list_id['id']; ?>"><?= $user_list_id['login']; ?></span>
						</div>
						<div class="table-column" style="width: 30%"><?= $user_list_id['language']; ?></div>
					</div>
		<?php
				}
				if (count($user_list_login) > 0) {
		?>
					<p>Совпадения по логину:</p>
		<?php
					foreach ($user_list_login as $key => $value) {
		?>
					<div class="table-row">
						<div class="table-column" style="width: 70%">
							<span data-edit="users/edit_user" data-id="<?= $value['id']; ?>"><?= $value['login']; ?></span>
						</div>
						<div class="table-column" style="width: 30%"><?= $value['language']; ?></div>
					</div>
		<?php
					}
				}
				if (count($user_list_email) > 0) {
		?>
					<p>Совпадения по email:</p>
		<?php
					foreach ($user_list_email as $key => $value) {
		?>
					<div class="table-row">
						<div class="table-column" style="width: 70%">
							<span data-edit="users/edit_user" data-id="<?= $value['id']; ?>"><?= $value['login']; ?></span>
						</div>
						<div class="table-column" style="width: 30%"><?= $value['language']; ?></div>
					</div>
		<?php
					}
				}
			} else {
		?>
				<div class="table-row table-row-error">
					<div class="table-column" style="width: 100%">Пользователей не найдено</div>
				</div>
		<?php
			}
		?>
<?php
	}
} else {
?>

<form class="form-default form-search" data-result="results_1">
	<div class="form-item form-item-search">
		<label>
			<span class="form-item__header">Поиск</span>
			<input class="form-item__input" type="text" name="search">
			<button type="submit" class="form-item__button button-d">Поиск</button>
			<span class="form-item__description">Поиск по логину или e-mail</span>
		</label>
	</div>
</form>

<div class="table-default" data-placeholder="results_1">
	<div class="table-row table-header">
		<div class="table-column" style="width: 70%">Логин</div>
		<div class="table-column" style="width: 30%">Язык</div>
	</div>
	<?php
		$user_list = users_get_last(20);
		
		foreach ($user_list as $key => $value) {
	?>
		<div class="table-row">
			<div class="table-column" style="width: 70%">
				<span data-edit="users/edit_user" data-id="<?= $value['id']; ?>"><?= $value['login']; ?></span>
			</div>
			<div class="table-column" style="width: 30%"><?= $value['language']; ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>