<?php

require_once '../functions/users.php';
require_once '../functions/default.php';

if ($_POST['action'] == 'search') {
?>
	<div class="table-row table-header">
		<div class="table-column" style="width: 25%">Логин</div>
		<div class="table-column" style="width: 15%">Всего рефералов (1 лвл)</div>
		<div class="table-column" style="width: 15%">Заработано с 1 уровня</div>
		<div class="table-column" style="width: 15%">Заработано с 2 уровня</div>
		<div class="table-column" style="width: 15%">Заработано с 3 уровня</div>
		<div class="table-column" style="width: 15%">Всего</div>
	</div>
<?php
	$user_array = users_search_login($_POST['string'], 'id, login');
	foreach ($user_array as $value) {
		$get_user = $pdo->prepare('SELECT * FROM referrals_info WHERE user_id = ? LIMIT 1');
		$get_user->execute(array($value['id']));
		$user_stat = $get_user->fetch();
		// $total_refs = $user_stat['referrals_first'] + $user_stat['referrals_second'] + $user_stat['referrals_third'];
		$total_refs = $user_stat['referrals_first'];
?>
		<div class="table-row">
			<div class="table-column" style="width: 25%">
				<span data-edit="users/edit_user" data-id="<?= $user_stat['user_id']; ?>"><?= $value['login']; ?></span>
			</div>
			<div class="table-column" style="width: 15%; text-align: right;"><?= $total_refs; ?></div>
			<div class="table-column" style="width: 15%"><?= $user_stat['money_earned_first']; ?></div>
			<div class="table-column" style="width: 15%"><?= $user_stat['money_earned_second']; ?></div>
			<div class="table-column" style="width: 15%"><?= $user_stat['money_earned_third']; ?></div>
			<div class="table-column" style="width: 15%"><?= format_money($user_stat['money_earned_first'] + $user_stat['money_earned_second'] + $user_stat['money_earned_third']); ?></div>
		</div>
<?php
	}
}

if ($_POST['action'] == 'get_page') {
	$get_users = $pdo->query('SELECT * FROM referrals_info ORDER BY money_earned_first DESC LIMIT 100');
	$users = $get_users->fetchAll();
?>

<form class="form-default form-search" data-result="results_1">
	<div class="form-item form-item-search">
		<label>
			<span class="form-item__header">Поиск</span>
			<input class="form-item__input" type="text" name="search">
			<button type="submit" class="form-item__button button-d">Поиск</button>
			<span class="form-item__description">Поиск по логину, можно искать только одного пользователя</span>
		</label>
	</div>
</form>

<div class="table-default" data-placeholder="results_1">
	<div class="table-row table-header">
		<div class="table-column" style="width: 25%">Логин</div>
		<div class="table-column" style="width: 15%">Всего рефералов (1 лвл)</div>
		<div class="table-column" style="width: 15%">Заработано с 1 уровня</div>
		<div class="table-column" style="width: 15%">Заработано с 2 уровня</div>
		<div class="table-column" style="width: 15%">Заработано с 3 уровня</div>
		<div class="table-column" style="width: 15%">Всего</div>
	</div>
	<?php
		foreach ($users as $key => $value) {
			$user_array = users_search_id($value['user_id'], 'login');
			$value['login'] = $user_array['login'];
			// $total_refs = $value['referrals_first'] + $value['referrals_second'] + $value['referrals_third'];
			$total_refs = $value['referrals_first'];
	?>
		<div class="table-row">
			<div class="table-column" style="width: 25%">
				<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>"><?= $value['login']; ?></span>
			</div>
			<div class="table-column" style="width: 15%; text-align: right;"><?= $total_refs; ?></div>
			<div class="table-column" style="width: 15%"><?= $value['money_earned_first']; ?></div>
			<div class="table-column" style="width: 15%"><?= $value['money_earned_second']; ?></div>
			<div class="table-column" style="width: 15%"><?= $value['money_earned_third']; ?></div>
			<div class="table-column" style="width: 15%"><?= format_money($value['money_earned_first'] + $value['money_earned_second'] + $value['money_earned_third']); ?></div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>