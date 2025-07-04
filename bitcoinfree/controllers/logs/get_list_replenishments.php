<?php

require_once './pages/replenish-history/'.$user->language.'.php';

require_once './functions/logs.php';

$new_page = (int) $_POST['page'];
$logs = logs_get_authorizations($user->id, 'replenishments', $new_page, 20);

if ($logs != 'empty') {
?>
<div class="stat__table-wrap">
	<div class="table__heads">
		<div style="width: 10%">ID</div>
		<div style="width: 20%"><?=$_txt['table_head_2']?></div>
		<div style="width: 20%"><?=$_txt['table_head_3']?></div>
		<div style="width: 25%"><?=$_txt['table_head_4']?></div>
		<div style="width: 25%"><?=$_txt['table_head_5']?></div>
	</div>
	<div class="table__items">
		<?php
			foreach ($logs['items'] as $item) {
		?>
			<div class="table__item">
				<div style="width: 10%"><?= $item['id']; ?></div>
				<div style="width: 20%"><?= date('d.m.Y H:i', $item['date_created']); ?></div>
				<div style="width: 20%">
				<?php
					if ($item['currency'] == 'RUB' || $item['currency'] == 'USD') {
						echo number_format($item['amount'], 2, '.', '');
					} else {
						echo $item['amount'];
					}
					echo ' '.$item['currency'];
				?>
				</div>
				<div style="width: 25%"><?= format_money($item['amount_get']).' '.$coin; ?></div>
				<div style="width: 25%">
				<?php
					if ($item['status'] == 0) {
						echo $_txt['status']['wait'];
					} elseif ($item['status'] == 1) {
						echo $_txt['status']['done'];
					} elseif ($item['status'] == 2) {
						echo $_txt['status']['delete'];
					}
				?>
				</div>
			</div>
		<?php
			}
		?>
	</div>
</div>
<?php
}
?>
<div class="pagination" data-controller="logs/get_list_replenishments" data-result="result_logs">
<?php
	$pagination = $logs['pagination'];
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
