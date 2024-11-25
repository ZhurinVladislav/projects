<?php

global $settings, $pdo, $coin;

// $action_percent = $settings->get('action_percent');

$statistics_users_new = $pdo->query('SELECT COUNT(id) AS total FROM users WHERE reg_date > '.(time() - 86400));
$statistics_users_new = $statistics_users_new->fetch();
$statistics_users_new = $statistics_users_new['total'];

$statistics_users = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "users_total" OR name LIKE "fake_users_total"');
$statistics_users = $statistics_users->fetch();
$statistics_users = $statistics_users['total'];

$statistics_withdrawal = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "withdrawal_total" OR name LIKE "fake_withdrawal_total"');
$statistics_withdrawal = $statistics_withdrawal->fetch();
$statistics_withdrawal = format_money($statistics_withdrawal['total']);

$statistics_replenishments = $pdo->query('SELECT SUM(value) AS total FROM project_statistics WHERE name LIKE "replenishments_total" OR name LIKE "fake_replenishments_total"');
$statistics_replenishments = $statistics_replenishments->fetch();
$statistics_replenishments = format_money($statistics_replenishments['total']);

$statistics_start = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "start_date"');
$statistics_start = $statistics_start->fetch();
$statistics_start = (int) $statistics_start['value'];
$statistics_days_work = floor((time() - $statistics_start) / 60 / 60 / 24);

$statistics_online = file_get_contents('./users_online.txt');
$statistics_online = intval($statistics_online / 4);

?>
<h1><?= $_txt['header']; ?></h1>