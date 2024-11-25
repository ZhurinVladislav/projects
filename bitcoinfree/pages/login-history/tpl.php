<?php

require_once './functions/logs.php';
global $pdo, $coin;

$logs = logs_get_authorizations($user->id, 'authorization_logs', 1, 10);

?>

<h1 class="header-inner"><?= $_txt['header']; ?></h1>

<div data-placeholder="result_logs">
	<div class="stat__table-wrap">
	<?php
		if ($logs != 'empty') {
	?>
		<div class="table__heads">
			<div style="width: 50%"><?=$_txt['table_head_1']?></div>
			<div style="width: 50%">IP</div>
		</div>

		<div class="table__items">
			<?php
				foreach ($logs['items'] as $item) {
			?>
				<div class="table__item">
					<div style="width: 50%"><?= date('d.m.Y H:i', $item['date']); ?></div>
					<div style="width: 50%"><?= $item['ip']; ?></div>
				</div>
			<?php
				}
			?>
		</div>
	</div>

	<div class="pagination" data-controller="logs/get_list_auth" data-result="result_logs">
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