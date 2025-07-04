<?php

global $pdo;

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


list($time_y, $time_m, $time_d) = explode('-', date('Y-m-d', time()));
$current_day = mktime(0, 0, 0, $time_m, $time_d, $time_y);

$get_user_game_stat = $pdo->query('SELECT * FROM game_tiles_sessions WHERE user_id = '.$user->id.' AND date = '.$current_day.' AND result = 1 LIMIT 1');

?>

<link href="/app/css/games/tiles.css" rel="stylesheet">

<?php

switch ($user->language) {
	case 'de':
	case 'es':
	case 'fr':
?>
		<style>
			.game-overlay .button {
				font-size: 14px;
			}
		</style>
<?php
		break;
	case 'th':
	case 'hi':
	case 'zh':
?>
		<style>
			.game-header .description {
				font-size: 20px;
			}
			.game-header .button.go-home {
				font-size: 20px;
			}
			.game-overlay .button {
				font-size: 28px;
			}
			.game-overlay .wait-text, .game-overlay .success-text, .game-overlay .fail-text, .game-overlay .already-text {
				font-size: 24px;
			}
		</style>
<?php
		break;
}

?>

<!-- <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" rel="stylesheet"> -->
<!-- <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"> -->
<!-- <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet"> -->

<!-- <link rel="preload" as="image" href="/app/images/games/tiles/timer.png"> -->
<link rel="preload" as="image" href="/app/images/games/tiles/hidden.png">

<div class="account-balance">
	<div class="container">
		<h1 class="header_1"><?= $_txt['header']; ?></h1>

		<div class="game" data-total-tiles="<?= $tiles_per_row * $tiles_per_column; ?>">
			<div class="method">
				<div class="method-title game-header">
					<div class="timer">
						<img src="/app/images/games/tiles/timer.svg">
						<div class="counter">
							<div id="timer-minutes" class="minutes">00</div>
							<div class="separator">:</div>
							<div id="timer-seconds" class="seconds" data-start-timer="5" data-game-timer="26">05</div>
						</div>
					</div>
				<?php
					if (!is_bool($user_game_stat = $get_user_game_stat->fetch())) {
				?>
						<div class="description" data-was-received="true">
							<?= $_txt['already_text']; ?>
						</div>
				<?php
					} else {
				?>
						<div class="description" data-was-received="false"></div>
				<?php
					}
				?>
				</div>

				<div class="method-content">
					<div class="game-table">
					<?php
						$arr_inc = 0;
						$mode = rand(1,2);
						for ($i = 0; $i < $tiles_per_row; $i++) {
					?>
							<div class="game-row">
							<?php
								for ($j = 0; $j < $tiles_per_column; $j++) {
							?>
									<div class="game-col" style="width: <?= (int) 100 / $tiles_per_row; ?>%;" data-asd="<?= rand(1, 2); ?>">
										<div class="tile" data-item-id="<?= $arr_inc + 1; ?>" data-item-type="<?= $tiles_array[$arr_inc]; ?>" data-completed="false">
											<div>
											<?php
												if ($mode == 1) {
											?>
													<img src="/app/images/games/tiles/<?= $tiles_array[$arr_inc]; ?>.svg">
											<?php
												} else {
											?>
													<img src="/app/images/games/tiles/<?= $tiles_array[$arr_inc] + 4; ?>.svg">
											<?php
												}
											?>
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
							<button class="button game-start"><?= $_txt['button_start']; ?></button>
							<div class="wait-text hidden">
								<?= $_txt['wait_text']; ?>
							</div>
							<div class="success-text hidden">
								<?= $_txt['success_text']; ?>
								<br><br>
								<a class="button go-home" data-href="games" data-template="main_inner"><?= $_txt['go_home']; ?></a>
							</div>
							<div class="fail-text hidden">
								<?= $_txt['fail_text']; ?>
								<br><br>
								<button class="button game-again red"><?= $_txt['button_again']; ?></button>
							</div>
							<div class="already-text hidden">
								<?= $_txt['already_text']; ?>
								<a class="button go-home" data-href="games" data-template="main_inner"><?= $_txt['go_home']; ?></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	window.onload = function() {
		$('body > *:last-child').after('<script src="app/js/games/tiles.js"><\/script>');
	}
</script>