<?php

$insert_statistics = $pdo->prepare('INSERT INTO game_tiles_sessions (user_id, date, result) VALUES (?, ?, ?)');
$insert_statistics->execute(array($user->id, time(), 0));

$tiles_per_row = 4;
$tiles_per_column = 4;
$tiles_array = array();

//	наполняем массив в соответствии с размером сетки
for ($i = 1; $i <= $tiles_per_row; $i++) {
	for ($j = 1; $j <= $tiles_per_column; $j++) {
		$tiles_array[] = $j;
	}
}

//	перемешиваем массив
shuffle($tiles_array);

$arr_inc = 0;
for ($i = 0; $i < $tiles_per_row; $i++) {
?>
	<div class="game-row">
	<?php
		for ($j = 0; $j < $tiles_per_column; $j++) {
	?>
			<div class="game-col" style="width: <?= (int) 100 / $tiles_per_row; ?>%;">
				<div class="tile" data-item-id="<?= $arr_inc + 1; ?>" data-item-type="<?= $tiles_array[$arr_inc]; ?>" data-completed="false">
					<div>
						<img src="/app/images/games/tiles/<?= $tiles_array[$arr_inc]; ?>.svg">
					</div>
				</div>
			</div>
	<?php
			$arr_inc++;
		}
	?>
	</div>
<?php
}
?>