<?php

require_once './functions/logs.php';
global $pdo, $coin;

$logs = logs_get_authorizations($user->id, 'replenishments', 1, 20);

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div data-placeholder="result_logs">
	<div class="stat__table-wrap">
	<?php
		if ($logs != 'empty') {
	?>
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

	<div class="pagination" data-controller="logs/get_list_replenishments" data-result="result_logs">
	<?php
		$pagination = $logs['pagination'];
		if ($pagination['prev'] || $pagination['next']) {
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
<?php
	} else {
?>
		<div class="table__body">
			<div class="table__table">
				<div class="table__table-heads">
					<p class="header_3 center"><?= $_txt['empty']; ?></p>
				</div>
			</div>
		</div>
<?php
	}
?>
</div>