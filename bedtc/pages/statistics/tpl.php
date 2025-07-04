<?php

require_once './functions/users.php';
global $pdo, $coin;

$statistics = $pdo->query('SELECT * FROM project_statistics');
$array = $statistics->fetchAll();

foreach ($array as $item) {
	$stat[$item['name']] = $item['value'];
}

$last_withdrawals = $pdo->query('SELECT * FROM withdrawal WHERE status = 1 AND user_id != 1 ORDER BY date_created DESC LIMIT 10');

// $last_replenishments = $pdo->query('SELECT * FROM replenishments WHERE status = 1 AND user_id != 1 ORDER BY date_created DESC LIMIT 10');

$top_withdrawals = $pdo->query('SELECT login, reg_date, total_withdrawal FROM users WHERE status = 1 AND id != 1 ORDER BY total_withdrawal DESC LIMIT 10');

$top_replenishments = $pdo->query('SELECT login, reg_date, total_replenishments FROM users WHERE status = 1 AND id != 1 ORDER BY total_replenishments DESC LIMIT 10');

$top_ref = $pdo->query('SELECT user_id, (money_earned_first + money_earned_second + money_earned_third) AS earned_total, (referrals_first + referrals_second + referrals_third) AS referrals_total FROM referrals_info WHERE user_id != 1 ORDER BY earned_total DESC LIMIT 10');

$statistics_start = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "start_date"');
$statistics_start = $statistics_start->fetch();
$statistics_start = (int) $statistics_start['value'];
$statistics_days_work = floor((time() - $statistics_start) / 60 / 60 / 24);

$statistics_online = file_get_contents('./users_online.txt');
$statistics_online = intval($statistics_online / 12);

$statistics_users = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "users_total" OR name LIKE "fake_users_total"');
$statistics_users = $statistics_users->fetch();
$statistics_users = $statistics_users['total'];

$statistics_withdrawal = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "withdrawal_total" OR name LIKE "fake_withdrawal_total"');
$statistics_withdrawal = $statistics_withdrawal->fetch();
$statistics_withdrawal = format_money($statistics_withdrawal['total']);

$top_withdrawals_arr = $top_withdrawals->fetchAll();
$top_replenishments_arr = $top_replenishments->fetchAll();
$top_ref_arr = $top_ref->fetchAll();
?>



<div class="statistics">
	<div class="container">
		<div class="content">

			<h1 class="header_1"><?= $_txt['header']; ?></h1>
			<div class="subheader"><?= $_txt['description']; ?></div>

			<div class="panel-purple">
				<div class="wrapper">
					<div class="decor-left">
						<span></span>
					</div>
					<div class="decor-right">
						<span></span>
					</div>

					<div class="content">

						<div class="item">
							<div class="title">Всего игроков</div>
							<div class="panel-simple">
								<div class="bd"></div>
								<div class="caption"><?= $statistics_users; ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
						</div>

						<div class="item">
							<div class="title">Пользователей онлайн</div>
							<div class="panel-simple">
								<div class="bd"></div>
								<div class="caption"><?= $statistics_online; ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
						</div>

						<div class="item">
							<div class="title">Заработано на проекте</div>
							<div class="panel-simple">
								<div class="bd"></div>
								<div class="caption"><?= $statistics_withdrawal . '&nbsp;' . $coin ?></div>
								<div class="bd-top-left"></div>
								<div class="bd-top-right"></div>
								<div class="bd-bottom-left"></div>
								<div class="bd-bottom-right"></div>
								<div class="bd-bottom"></div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<div class="header_2">Подробная статистика</div>

			<div class="panel-fissure">
				<div class="shadow-left"></div>
				<div class="shadow-bottom"></div>
				<div class="bd-top"></div>
				<div class="bd-bottom">
					<div class="left"></div>
					<div class="right"></div>
				</div>
				<div class="fissure"></div>
				
				<div class="panel-fixed-top">

					<div class="buttons-row tabs">
						<span class="bg"></span>
						<span class="bd-bot"><span></span><span></span></span>

						<button class="button-big pink tab-item active" data-tab="statistics-1">
							<span class="caption">Последние выводы</span>
							<span class="bd-hover"></span>
							<span class="bd-black"><span></span><span></span></span>
						</button>

						<button class="button-big pink tab-item" data-tab="statistics-2">
							<span class="caption">Топ выплат</span>
							<span class="bd-hover"></span>
							<span class="bd-black"><span></span><span></span></span>
						</button>

						<button class="button-big pink tab-item" data-tab="statistics-3">
							<span class="caption">Топ пополнений</span>
							<span class="bd-hover"></span>
							<span class="bd-black"><span></span><span></span></span>
						</button>

						<button class="button-big pink tab-item" data-tab="statistics-4">
							<span class="caption">Топ дохода</span>
							<span class="bd-hover"></span>
							<span class="bd-black"><span></span><span></span></span>
						</button>

						<button class="button-big pink tab-item" data-tab="statistics-5">
							<span class="caption">Топ рефоводов</span>
							<span class="bd-hover"></span>
							<span class="bd-black"><span></span><span></span></span>
						</button>
					</div>

				</div>

				<div class="content">

					<div class="tab-content active" data-tab="statistics-1">
						<div class="table">
							<div class="head">
								<div style="width: 25%;"><?= $_txt['user']; ?></div>
								<div style="width: 25%;"><?= $_txt['date']; ?></div>
								<div style="width: 25%;"><?= $_txt['wallet']; ?></div>
								<div style="width: 25%;"><?= $_txt['sum']; ?></div>
							</div>
							<div class="items">
							<?php
								foreach ($last_withdrawals as $item) {
									$get_user = users_search_id($item['user_id'], 'login');
							?>
									<div class="panel-simple table-item">
										<div class="bd"></div>
										<div class="caption">
											<div style="width: 25%;"><?= $get_user['login']; ?></div>
											<div style="width: 25%;"><?= date('d.m.y H:i', $item['date_confirmed']); ?></div>
											<div style="width: 25%;"><?= $item['paysystem']; ?></div>
											<div style="width: 25%;"><?= $item['amount']; ?>&nbsp;<?= $coin; ?></div>
										</div>
										<div class="bd-top-left"></div>
										<div class="bd-top-right"></div>
										<div class="bd-bottom-left"></div>
										<div class="bd-bottom-right"></div>
										<div class="bd-bottom"></div>
									</div>
							<?php
								}
							?>
							</div>
						</div>
					</div>

					<div class="tab-content" data-tab="statistics-2">
						<div class="table">
							<div class="head">
								<div style="width: 33.333%;"><?= $_txt['user']; ?></div>
								<div style="width: 33.333%;"><?= $_txt['reg_date']; ?></div>
								<div style="width: 33.333%;"><?= $_txt['sum']; ?></div>
							</div>
							<div class="items coins">
							<?php
								foreach ($top_withdrawals_arr as $item) {
									if ($item['total_withdrawal'] > 0) {
							?>
										<div class="panel-simple table-item">
											<div class="bd"></div>
											<div class="caption">
												<div style="width: 33.333%;"><?= $item['login']; ?></div>
												<div style="width: 33.333%;"><?= date('d.m.y H:i', $item['reg_date']); ?></div>
												<div style="width: 33.333%;"><?= format_money($item['total_withdrawal']); ?>&nbsp;<?= $coin; ?></div>
											</div>
											<div class="bd-top-left"></div>
											<div class="bd-top-right"></div>
											<div class="bd-bottom-left"></div>
											<div class="bd-bottom-right"></div>
											<div class="bd-bottom"></div>
										</div>
							<?php
									}
								}
							?>
							</div>
						</div>
					</div>

					<div class="tab-content" data-tab="statistics-3">
						<div class="table">
							<div class="head">
								<div style="width: 33.333%;"><?= $_txt['user']; ?></div>
								<div style="width: 33.333%;"><?= $_txt['reg_date']; ?></div>
								<div style="width: 33.333%;"><?= $_txt['sum']; ?></div>
							</div>
							<div class="items coins">
							<?php
								foreach ($top_replenishments_arr as $item) {
									if ($item['total_replenishments'] > 0) {
							?>
										<div class="panel-simple table-item">
											<div class="bd"></div>
											<div class="caption">
												<div style="width: 33.333%;"><?= $item['login']; ?></div>
												<div style="width: 33.333%;"><?= date('d.m.y H:i', $item['reg_date']); ?></div>
												<div style="width: 33.333%;"><?= format_money($item['total_replenishments']); ?>&nbsp;<?= $coin; ?></div>
											</div>
											<div class="bd-top-left"></div>
											<div class="bd-top-right"></div>
											<div class="bd-bottom-left"></div>
											<div class="bd-bottom-right"></div>
											<div class="bd-bottom"></div>
										</div>
							<?php
									}
								}
							?>
							</div>
						</div>
					</div>
					
					<div class="tab-content" data-tab="statistics-4"></div>
					
					<div class="tab-content" data-tab="statistics-5">
						<div class="table">
							<div class="head">
								<div style="width: 25%;"><?= $_txt['user']; ?></div>
								<div style="width: 25%;"><?= $_txt['reg_date']; ?></div>
								<div style="width: 25%;"><?= $_txt['ref_total']; ?></div>
								<div style="width: 25%;"><?= $_txt['earned']; ?></div>
							</div>
							<div class="items coins">
							<?php
								foreach ($top_ref_arr as $item) {
									$get_user = users_search_id($item['user_id'], 'login, reg_date');
							?>
									<div class="panel-simple table-item">
										<div class="bd"></div>
										<div class="caption">
											<div style="width: 25%;"><?= $get_user['login']; ?></div>
											<div style="width: 25%;"><?= date('d.m.y H:i', $get_user['reg_date']); ?></div>
											<div style="width: 25%;"><?= $item['referrals_total']; ?></div>
											<div style="width: 25%;"><?= format_money($item['earned_total']); ?>&nbsp;<?= $coin; ?></div>
										</div>
										<div class="bd-top-left"></div>
										<div class="bd-top-right"></div>
										<div class="bd-bottom-left"></div>
										<div class="bd-bottom-right"></div>
										<div class="bd-bottom"></div>
									</div>
							<?php
								}
							?>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
	</div>
</div>