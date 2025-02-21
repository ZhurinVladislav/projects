<?php

require_once './pages/bounty/'.$user->language.'.php';

require_once './functions/bounty.php';
require_once './functions/users.php';

$new_page = (int) $_POST['page'];
$tasks_youtube = tasks_get_list($user->id, 'quest_youtube', $new_page, 15);

if ($tasks_youtube != 'empty') {
?>
<div class="table__body">
	<div class="table__table">
		<div class="table__table-heads">
			<div style="width: 10%">ID</div>
			<div style="width: 70%"><?= $_txt['task']['title']; ?></div>
			<div style="width: 20%"><?= $_txt['task']['status']; ?></div>
		</div>
		<div class="table__table-items">
		<?php
			foreach ($tasks_youtube['items'] as $item) {

				switch ($item['status']) {
					case '1':
						$status = $_txt['status']['paid'];
						break;

					case '2':
						$status = $_txt['status']['rejected'];
						break;
					
					default:
						$status = $_txt['status']['moderation'];
						break;
				}

		?>
				<div class="table__table-item">
					<div style="width: 10%"><?= $item['id']; ?></div>
					<div style="width: 70%">
						<a href="<?= $item['link'] ?>" target="_blank"><?= $item['link'] ?></a>
					</div>
					<div style="width: 20%"><?= $status; ?></div>
				</div>
		<?php
			}
		?>
		</div>
	</div>
</div>
<div class="pagination" data-controller="quests/get_list_youtube" data-result="tasks_result">
<?php
	$pagination = $tasks_youtube['pagination'];
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
<?php } ?>
