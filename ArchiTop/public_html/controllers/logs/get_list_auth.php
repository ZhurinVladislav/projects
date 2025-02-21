<?php

require_once './pages/login-history/'.$user->language.'.php';

require_once './functions/logs.php';

$new_page = (int) $_POST['page'];
$logs = logs_get_authorizations($user->id, 'authorization_logs', $new_page, 20);

if ($logs != 'empty') {
?>
<div class="stat__table-wrap">
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
<?php
}
?>
<div class="pagination" data-controller="logs/get_list_auth" data-result="result_logs">
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
