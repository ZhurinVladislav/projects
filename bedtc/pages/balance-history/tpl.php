<?php

require_once './functions/logs.php';
global $pdo, $coin, $log_codes;

$logs = logs_get_authorizations($user->id, 'users_logs', 1, 20);

?>

<section class="balance-history">
	<div class="container">
		<div class="content">

			<h1 class="header_1"><?= $_txt['header']; ?></h1>
						
			<div data-placeholder="result_logs">
				<div class="table">
				<?php
					if ($logs != 'empty') {
				?>
					<div class="table-header">
						<div class="table-header__td"><?=$_txt['table_head_1']?></div>
						<div class="table-header__td"><?=$_txt['table_head_2']?></div>
						<div class="table-header__td"><?=$_txt['table_head_3']?></div>
						<div class="table-header__td"><?=$_txt['table_head_4']?></div>
						<div class="table-header__td"><?=$_txt['table_head_5']?></div>
					</div>

					<div class="table-body">
						<?php
							foreach ($logs['items'] as $item) {
						?>
							<div class="tr">
								<div class="td">
									<div class="td-title"><?=$_txt['table_head_1']?></div>
									<div class="td-value"><?= $_txt['operation'][$item['code']]; ?></div>
								</div>
								<div class="td">
									<div class="td-title"><?=$_txt['table_head_2']?></div>
									<div class="td-value">
										<?= date('d.m.Y H:i', $item['date']); ?>
									</div>
								</div>
								<div class="td">
									<div class="td-title"><?=$_txt['table_head_3']?></div>
									<div class="td-value"><?= format_money($item['money']); ?></div>
								</div>
								<div class="td">
									<div class="td-title"><?=$_txt['table_head_4']?></div>
									<div class="td-value">
										<?= format_money($item['balance_buy']); ?>
									</div>
								</div>
								<div class="td">
									<div class="td-title"><?=$_txt['table_head_5']?></div>
									<div class="td-value">
										<?= format_money($item['balance_withdrawal']); ?>
									</div>
								</div>
							</div>
						<?php
							}
						?>
					</div>
				</div>

				<div class="pagination" data-controller="logs/get_list_balance" data-result="result_logs">
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

		</div>
	</div>
</section>