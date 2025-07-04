<?php

require_once './pages/referrals/'.$user->language.'.php';

require_once './functions/referrals.php';
require_once './functions/users.php';

$new_page = (int) $_POST['page'];
$referrals = referrals_get_list_first($user->id, $new_page, 15);

if ($referrals != 'empty') {
?>
	<div class="table__heads">
		<div style="width: 50%"><?= $_txt['refs']['login']; ?></div>
		<div style="width: 50%"><?= $_txt['refs']['reg_date']; ?></div>
	</div>

	<div class="table__items">
	<?php
		foreach ($referrals['items'] as $item) {
			$ref_user = users_search_id($item['user_id'], 'login, reg_date');
			$login = $ref_user['login'];
			$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
		?>
			<div class="table__item">
				<div style="width: 50%"><?= $login; ?></div>
				<div style="width: 50%"><?= $reg_date; ?></div>
			</div>
		<?php
		}
	?>
	</div>
<?php
}
?>
<div class="pagination" data-controller="referrals/get_list" data-result="result_referrals">
<?php
	$pagination = $referrals['pagination'];
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
?>
</div>
