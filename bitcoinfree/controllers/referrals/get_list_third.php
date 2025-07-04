<?php

require_once './pages/referrals/'.$user->language.'.php';

require_once './functions/referrals.php';
require_once './functions/users.php';

$new_page = (int) $_POST['page'];
$referrals = referrals_get_list($user->id, 'third', $new_page, 15);

if ($referrals != 'empty') {
?>
	<div class="table__heads">
		<div style="width: 33.33%"><?= $_txt['refs']['login']; ?></div>
		<div style="width: 33.33%"><?= $_txt['refs']['reg_date']; ?></div>
		<div style="width: 33.33%"><?= $_txt['refs']['earned']; ?></div>
	</div>

	<div class="table__items">
	<?php
		foreach ($referrals['items'] as $item) {
			$earned = $item['money_to_third'];
			$earned = format_money($earned);
			$ref_user = users_search_id($item['user_id'], 'login, reg_date');
			$login = $ref_user['login'];
			$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
	?>
			<div class="table__item">
				<div style="width: 33.33%"><a class="start-message" data-id="<?= $item['user_id']; ?>" data-login="<?= $login; ?>"><?= $login; ?></a></div>
				<div style="width: 33.33%"><?= $reg_date; ?></div>
				<div style="width: 33.33%"><?= $earned; ?></div>
			</div>
	<?php
		}
	?>
		</div>
<?php
}
?>
<div class="pagination" data-controller="referrals/get_list_third" data-result="result_referrals">
<?php
	$pagination = $referrals['pagination'];
	if ($pagination['prev'] !== false || $pagination['next'] !== false) {
		if ($pagination['prev']) {
			echo '<a class="prev" data-page="'.$pagination['prev'].'"></a>';
		} else {
			echo '<span class="prev_off"></span>';
		}
		if ($pagination['minustwo']) echo '<a data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a>';
		if ($pagination['minusone']) echo '<a data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a>';
		echo '<span class="current">'.$pagination['current'].'</span>';
		if ($pagination['plusone']) echo '<a data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a>';
		if ($pagination['plustwo']) echo '<a data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a>';
		if ($pagination['next']) {
			echo '<a class="next" data-page="'.$pagination['next'].'"></a>';
		} else {
			echo '<span class="next_off"></span>';
		}
	}
?>
</div>
