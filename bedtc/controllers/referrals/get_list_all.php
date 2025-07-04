<?php

require_once './pages/referrals-user/'.$user->language.'.php';

require_once './functions/referrals.php';
require_once './functions/users.php';

$new_page = (int) $_POST['page'];
$referrals = referrals_get_list($user->id, 'all', $new_page, 15);

if ($referrals != 'empty') {
?>
	<table class="table-default">
		<thead>
			<tr>
				<td><?= $_txt['table']['header'][1]; ?></td>
				<td><?= $_txt['table']['header'][2]; ?></td>
				<td><?= $_txt['table']['header'][3]; ?></td>
				<td><?= $_txt['table']['header'][4]; ?></td>
			</tr>
		</thead>

		<tbody>
		<?php
			foreach ($referrals['items'] as $item) {
				if ($user->id == $item['ref_id_first']) {
					$earned = $item['money_to_first'];
				} elseif ($user->id == $item['ref_id_second']) {
					$earned = $item['money_to_second'];
				} elseif ($user->id == $item['ref_id_third']) {
					$earned = $item['money_to_third'];
				}
				$earned = format_money($earned);
				$ref_user = users_search_id($item['user_id'], 'login, reg_date, total_replenishments');
				$login = $ref_user['login'];
				$reg_date = date('d.m.y H:i', $ref_user['reg_date']);
				$replenish = $ref_user['total_replenishments'];
		?>
				<tr>
					<td><?= $login; ?></td>
					<td><?= $reg_date; ?></td>
					<td><?= $earned; ?></td>
					<td><?= $replenish; ?></td>
				</tr>
		<?php
			}
		?>
		</tbody>
	</table>
	<?php
		$pagination = $referrals['pagination'];
		if ($pagination['prev'] || $pagination['next']) {
	?>
			<div class="pagination" data-controller="referrals/get_list_all" data-result="result_referrals">
			<?php
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
	<?php
		}
	?>
<?php
}
?>