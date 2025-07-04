<?php

require_once './functions/users.php';
global $pdo, $coin;

$statistics = $pdo->query('SELECT * FROM project_statistics');
$array = $statistics->fetchAll();

foreach ($array as $item) {
	$stat[$item['name']] = $item['value'];
}

$last_withdrawals = $pdo->query('SELECT * FROM withdrawal WHERE status = 1 AND user_id != 1 ORDER BY date_created DESC LIMIT 10');

$last_replenishments = $pdo->query('SELECT * FROM replenishments WHERE status = 1 AND user_id != 1 ORDER BY date_created DESC LIMIT 10');

$top_withdrawals = $pdo->query('SELECT id, login, reg_date, level, avatar, total_withdrawal FROM users WHERE status = 1 AND id != 1 ORDER BY total_withdrawal DESC LIMIT 10');

$top_ref = $pdo->query('SELECT user_id, (money_earned_first + money_earned_second + money_earned_third) AS earned_total FROM referrals_info WHERE user_id != 1 ORDER BY earned_total DESC LIMIT 10');

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

?>

<h1 class="header-external"><?= $_txt['header']; ?></h1>

<?php
$top_withdrawals_arr = $top_withdrawals->fetchAll();
$top_ref_arr = $top_ref->fetchAll();
?>				

<div data-tab="1" class="active">
	<div class="top-places">
		
		<div class="place first">
			<div class="title">
				<img src="/app/images/other/1st_place.png">
				<span><?= $_txt['place']; ?></span>
			</div>
			<div class="dash">
				<div class="wrapper">
					<img class="medal" src="/app/images/other/1st_place_medal.png">
					
					<?= draw_user($top_withdrawals_arr[0]['id'], $top_withdrawals_arr[0]['login'], $top_withdrawals_arr[0]['level'], $top_withdrawals_arr[0]['avatar']); ?>

					<div class="list">
						<div class="item">
							<span><?= $_txt['reg_date']; ?></span>
							<span><?= date('d.m.y', $top_withdrawals_arr[0]['reg_date']); ?></span>
						</div>
						<!-- <div class="item">
							<span><?= $_txt['last_activity']; ?></span>
							<span><?= date('d.m.y', $top_withdrawals_arr[0]['reg_date']); ?></span>
						</div> -->
						<div class="item">
							<span><?= $_txt['withdrawal']; ?></span>
							<span><?= format_money($top_withdrawals_arr[0]['total_withdrawal']); ?>&nbsp;<?= $coin; ?></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			
			<div class="place second">
				<div class="title">
					<img src="/app/images/other/2nd_place.png">
					<span><?= $_txt['place']; ?></span>
				</div>
				<div class="dash">
					<div class="wrapper">
						<img class="medal" src="/app/images/other/2nd_place_medal.png">
						
						<?= draw_user($top_withdrawals_arr[1]['id'], $top_withdrawals_arr[1]['login'], $top_withdrawals_arr[1]['level'], $top_withdrawals_arr[1]['avatar']); ?>
						
						<div class="list">
							<div class="item">
								<span><?= $_txt['reg_date']; ?></span>
								<span><?= date('d.m.y', $top_withdrawals_arr[1]['reg_date']); ?></span>
							</div>
							<!-- <div class="item">
								<span><?= $_txt['last_activity']; ?></span>
								<span><?= date('d.m.y', $top_withdrawals_arr[1]['reg_date']); ?></span>
							</div> -->
							<div class="item">
								<span><?= $_txt['withdrawal']; ?></span>
								<span><?= format_money($top_withdrawals_arr[1]['total_withdrawal']); ?>&nbsp;<?= $coin; ?></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="place third">
				<div class="title">
					<img src="/app/images/other/3rd_place.png">
					<span><?= $_txt['place']; ?></span>
				</div>
				<div class="dash">
					<div class="wrapper">
						<img class="medal" src="/app/images/other/3rd_place_medal.png">
						
						<?= draw_user($top_withdrawals_arr[2]['id'], $top_withdrawals_arr[2]['login'], $top_withdrawals_arr[2]['level'], $top_withdrawals_arr[2]['avatar']); ?>
						
						<div class="list">
							<div class="item">
								<span><?= $_txt['reg_date']; ?></span>
								<span><?= date('d.m.y', $top_withdrawals_arr[2]['reg_date']); ?></span>
							</div>
							<!-- <div class="item">
								<span><?= $_txt['last_activity']; ?></span>
								<span><?= date('d.m.y', $top_withdrawals_arr[2]['reg_date']); ?></span>
							</div> -->
							<div class="item">
								<span><?= $_txt['withdrawal']; ?></span>
								<span><?= format_money($top_withdrawals_arr[2]['total_withdrawal']); ?>&nbsp;<?= $coin; ?></span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>

	<div class="stat__table_1">
		<div class="stat__table_1-wrap">
			<div class="table-1__heads">
				<div style="width: 10%"><?= $_txt['table']['head_1']; ?></div>
				<div style="width: 40%"><?= $_txt['table']['head_2']; ?></div>
				<div style="width: 20%"><?= $_txt['table']['head_3']; ?></div>
				<!-- <div style="width: 25%"><?= $_txt['table']['head_4']; ?></div> -->
				<div style="width: 30%"><?= $_txt['table']['head_5']; ?></div>
			</div>
			
			<div class="table-1__items">
			<?php
				for ($i = 3; $i < 10; $i++) {
					if (isset($top_replenishments_arr[$i])) {
			?>
						<div class="table-1__item">
							<div style="width: 10%"><?= $i + 1; ?></div>
							<div style="width: 40%"><?= draw_user($top_withdrawals_arr[$i]['id'], $top_withdrawals_arr[$i]['login'], $top_withdrawals_arr[$i]['level'], $top_withdrawals_arr[$i]['avatar']); ?></div>
							<div style="width: 20%"><?= date('d.m.y', $top_withdrawals_arr[$i]['reg_date']); ?></div>
							<!-- <div style="width: 25%"><?= date('d.m.y', $top_withdrawals_arr[$i]['reg_date']); ?></div> -->
							<div style="width: 30%"><?= format_money($top_withdrawals_arr[$i]['total_withdrawal']); ?>&nbsp;<?= $coin; ?></div>
						</div>
			<?php
					}
				}
			?>
			</div>
		</div>
	</div>
</div>


<div data-tab="2">
	<div class="top-places">
	<?php
		$get_user_top_ref_0 = users_search_id($top_ref_arr[0]['user_id'], 'login, level, avatar, reg_date');
		$get_user_top_ref_1 = users_search_id($top_ref_arr[1]['user_id'], 'login, level, avatar, reg_date');
		$get_user_top_ref_2 = users_search_id($top_ref_arr[2]['user_id'], 'login, level, avatar, reg_date');
	?>
		<div class="place first">
			<div class="title">
				<img src="/app/images/other/1st_place.png">
				<span><?= $_txt['place']; ?></span>
			</div>
			<div class="dash">
				<div class="wrapper">
					<img class="medal" src="/app/images/other/1st_place_medal.png">
					
					<?= draw_user($top_ref_arr[0]['user_id'], $get_user_top_ref_0['login'], $get_user_top_ref_0['level'], $get_user_top_ref_0['avatar']); ?>

					<div class="list">
						<div class="item">
							<span><?= $_txt['reg_date']; ?></span>
							<span><?= date('d.m.y', $get_user_top_ref_0['reg_date']); ?></span>
						</div>
						<!-- <div class="item">
							<span><?= $_txt['last_activity']; ?></span>
							<span><?= date('d.m.y', $get_user_top_ref_0['reg_date']); ?></span>
						</div> -->
						<div class="item">
							<span><?= $_txt['withdrawal']; ?></span>
							<span><?= format_money($top_ref_arr[0]['earned_total']); ?>&nbsp;<?= $coin; ?></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			
			<div class="place second">
				<div class="title">
					<img src="/app/images/other/2nd_place.png">
					<span><?= $_txt['place']; ?></span>
				</div>
				<div class="dash">
					<div class="wrapper">
						<img class="medal" src="/app/images/other/2nd_place_medal.png">
						
						<?= draw_user($top_ref_arr[1]['user_id'], $get_user_top_ref_1['login'], $get_user_top_ref_1['level'], $get_user_top_ref_1['avatar']); ?>
						
						<div class="list">
							<div class="item">
								<span><?= $_txt['reg_date']; ?></span>
								<span><?= date('d.m.y', $get_user_top_ref_1['reg_date']); ?></span>
							</div>
							<!-- <div class="item">
								<span><?= $_txt['last_activity']; ?></span>
								<span><?= date('d.m.y', $get_user_top_ref_1['reg_date']); ?></span>
							</div> -->
							<div class="item">
								<span><?= $_txt['withdrawal']; ?></span>
								<span><?= format_money($top_ref_arr[1]['earned_total']); ?>&nbsp;<?= $coin; ?></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="place third">
				<div class="title">
					<img src="/app/images/other/3rd_place.png">
					<span><?= $_txt['place']; ?></span>
				</div>
				<div class="dash">
					<div class="wrapper">
						<img class="medal" src="/app/images/other/3rd_place_medal.png">
						
						<?= draw_user($top_ref_arr[2]['user_id'], $get_user_top_ref_2['login'], $get_user_top_ref_2['level'], $get_user_top_ref_2['avatar']); ?>
						
						<div class="list">
							<div class="item">
								<span><?= $_txt['reg_date']; ?></span>
								<span><?= date('d.m.y', $get_user_top_ref_2['reg_date']); ?></span>
							</div>
							<!-- <div class="item">
								<span><?= $_txt['last_activity']; ?></span>
								<span><?= date('d.m.y', $get_user_top_ref_2['reg_date']); ?></span>
							</div> -->
							<div class="item">
								<span><?= $_txt['withdrawal']; ?></span>
								<span><?= format_money($top_ref_arr[2]['earned_total']); ?>&nbsp;<?= $coin; ?></span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>

	<div class="stat__table_1">
		<div class="stat__table_1-wrap">
			<div class="table-1__heads">
				<div style="width: 10%"><?= $_txt['table']['head_1']; ?></div>
				<div style="width: 40%"><?= $_txt['table']['head_2']; ?></div>
				<div style="width: 20%"><?= $_txt['table']['head_3']; ?></div>
				<!-- <div style="width: 20%"><?= $_txt['table']['head_4']; ?></div> -->
				<div style="width: 30%"><?= $_txt['table']['head_9']; ?></div>
			</div>
			
			<div class="table-1__items">
			<?php
				for ($i = 3; $i < 10; $i++) {
					if (isset($top_ref_arr[$i])) {
						$get_user_top_ref = users_search_id($top_ref_arr[$i]['user_id'], 'login, level, avatar, reg_date');
			?>
						<div class="table-1__item">
							<div style="width: 10%"><?= $i + 1; ?></div>
							<div style="width: 40%"><?= draw_user($top_ref_arr[$i]['user_id'], $get_user_top_ref['login'], $get_user_top_ref['level'], $get_user_top_ref['avatar']); ?></div>
							<div style="width: 20%"><?= date('d.m.y', $get_user_top_ref['reg_date']); ?></div>
							<!-- <div style="width: 20%"><?= date('d.m.y', $get_user_top_ref['reg_date']); ?></div> -->
							<div style="width: 30%"><?= format_money($top_ref_arr[$i]['earned_total']); ?>&nbsp;<?= $coin; ?></div>
						</div>
			<?php
					}
				}
			?>
			</div>
		</div>
	</div>
</div>


<div data-tab="3">
	<div class="stat__table_1">
		<div class="stat__table_1-wrap">
			<div class="table-1__heads">
				<div style="width: 30%"><?= $_txt['table']['head_2']; ?></div>
				<div style="width: 20%"><?= $_txt['table']['head_8']; ?></div>
				<div style="width: 25%"><?= $_txt['table']['head_6']; ?></div>
				<div style="width: 25%"><?= $_txt['table']['head_7']; ?></div>
			</div>
			
			<div class="table-1__items">
			<?php
				$i = 0;
				while ($row = $last_replenishments->fetch()) {
					$i++;

					$get_user = users_search_id($row['user_id'], 'login, level, avatar, reg_date');
			?>
						<div class="table-1__item">
							<div style="width: 30%"><?= draw_user($row['user_id'], $get_user['login'], $get_user['level'], $get_user['avatar']); ?></div>
							<div style="width: 20%"><?= date('d.m.y H:i', $row['date_confirmed']); ?></div>
							<div style="width: 25%"><?= $row['paysystem']; ?></div>
							<div style="width: 25%"><?= format_money($row['amount_get']); ?>&nbsp;<?= $coin; ?></div>
						</div>
			<?php
				}
			?>
			</div>
		</div>
	</div>
</div>


<div data-tab="4">
	<div class="stat__table_1">
		<div class="stat__table_1-wrap">
			<div class="table-1__heads">
				<div style="width: 30%"><?= $_txt['table']['head_2']; ?></div>
				<div style="width: 20%"><?= $_txt['table']['head_8']; ?></div>
				<div style="width: 25%"><?= $_txt['table']['head_6']; ?></div>
				<div style="width: 25%"><?= $_txt['table']['head_7']; ?></div>
			</div>
			
			<div class="table-1__items">
			<?php
				$i = 0;
				while ($row = $last_withdrawals->fetch()) {
					$i++;

					$get_user = users_search_id($row['user_id'], 'login, level, avatar, reg_date');

					if ($row['currency'] == 'RUB' || $row['currency'] == 'USD') {
						$row['amount_get'] = number_format($row['amount_get'], 2, '.', '');
					} else {
						$row['amount_get'] = number_format($row['amount_get'], 8, '.', '');
					}
			?>
						<div class="table-1__item">
							<div style="width: 30%"><?= draw_user($row['user_id'], $get_user['login'], $get_user['level'], $get_user['avatar']); ?></div>
							<div style="width: 20%"><?= date('d.m.y H:i', $row['date_confirmed']); ?></div>
							<div style="width: 25%"><?= $row['paysystem']; ?></div>
							<div style="width: 25%"><?= $row['amount_get']; ?>&nbsp;<?= $row['currency']; ?></div>
						</div>
			<?php
				}
			?>
			</div>
		</div>
	</div>
</div>