<?php
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

?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="pages/tiles/style.css">
	<title>Tiles!</title>

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet">

</head>
<body>
	<div class="container">
		<div class="game" data-total-tiles="<?= $tiles_per_row * $tiles_per_column; ?>">
			<div class="game-header">
				<div class="timer">
					<img src="pages/tiles/images/timer.png">
					<div class="counter">
						<div id="timer-minutes" class="minutes">00</div>
						<div class="separator">:</div>
						<div id="timer-seconds" class="seconds" data-start-timer="5" data-game-timer="60">05</div>
					</div>
				</div>
			</div>
			<div class="game-table">
			<?php
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
										<img src="/pages/tiles/images/<?= $tiles_array[$arr_inc]; ?>.png">
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
			</div>

			<div class="game-overlay top active"></div>

			<div class="game-overlay bottom active">
				<div class="game-overlay-content">
					<button class="button game-start">Старт</button>
					<div class="success-text hidden">
						Поздравляем! <br>
						Бонус зачислен <br>
						на ваш счёт.
					</div>
					<div class="fail-text hidden">
						Поражение!
						<button class="button game-again red">Ещё раз</button>
					</div>
				</div>
			</div>

		</div>
	</div>
	<pre>
	<?php
		//var_dump($tiles_array);
	?>
	</pre>

	<script src="pages/tiles/jquery.min.js"></script>
	<script src="pages/tiles/app.js"></script>
</body>
</html>