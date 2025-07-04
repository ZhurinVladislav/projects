<?php

require_once './functions/users.php';

global $pdo, $coin;

$get_info = $pdo->prepare('SELECT * FROM users_wallets WHERE user_id = ?');
$get_info->execute(array($user->id));
$info = $get_info->fetch();

$user_reg_date = users_search_id($user->id, 'reg_date');
$user_day_in_game = abs(floor(($user_reg_date['reg_date'] - time()) / 86400));

//	ниже код для того чтобы вывести слово 'день', 'дня', 'дней', в зависимости от количества дней, прошедших с момента регистрации
//	но так как он больше не нужен, решил его просто закомментировать
// $days = $user_day_in_game % 100;

// if ($days >= 5 && $days <= 20) {
// 	$day_word = 'дней';

// } else {
// 	$days = $days % 10;
// 	if ($days == 1) {
// 		$day_word = 'день';

// 	} elseif ($days >= 2 && $days <= 4) {
// 		$day_word = 'дня';

// 	} else {
// 		$day_word = 'дней';
// 	}
// }

?>
<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div class="username">
	<?= $_txt['player']; ?>: <span><?= $user->login; ?></span>
</div>

<div class="days">
	<?= $_txt['days_in_game']; ?>: <?= $user_day_in_game; ?>
	<br>
	<?= $_txt['reg_date']; ?>: <?= date('d.m.Y', $user_reg_date['reg_date']); ?>
</div>